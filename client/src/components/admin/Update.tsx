import { LazyQueryResult, QueryTuple } from '@apollo/client';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {
  Exact,
  Introduce,
  IntroduceQuery,
  Project,
  ProjectImg,
  ProjectsQuery,
  useUpdateIntroduceMutation,
  useUpdateProjectMutation,
} from '../../generated/graphql';
import { uploadFiles, uploadFile } from '../../uploadImages';
import { Div, Textarea, Input, PlusBtn, Item, X, Select, initProject, InputProjectImg, ImgItem, Img } from './Create';

interface UpdateProps {
  projects: LazyQueryResult<
    ProjectsQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
  introduces: LazyQueryResult<
    IntroduceQuery,
    Exact<{
      [key: string]: never;
    }>
  >;
}
const initIntroduce: Introduce = { field: '', content: '' };

const Update: React.FC<UpdateProps> = ({ projects: { data, loading, error }, introduces }) => {
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const introduceImgRef = useRef<HTMLInputElement>(null);

  const backRef = useRef<HTMLInputElement>(null);
  const frontRef = useRef<HTMLInputElement>(null);
  const databaseRef = useRef<HTMLInputElement>(null);
  const cloudRef = useRef<HTMLInputElement>(null);
  const projectImgRef = useRef<HTMLInputElement>(null);

  const [select, setSelect] = useState('introduce');
  const [introduce, setIntroduce] = useState('main_img');
  const [projectIdx, setProjectIdx] = useState(0);
  const [introduceIdx, setIntroduceIdx] = useState(0);

  const [newProject, setNewProject] = useState<Project>(initProject);
  console.log(newProject.func);
  console.log(data?.projects.projects![projectIdx].func);
  console.log(data?.projects.projects![projectIdx].func!.replaceAll('<br />', '\n'));
  const [projectImg, setProjectImg] = useState<InputProjectImg[]>([]);

  const [updateProject, updateProjectResult] = useUpdateProjectMutation();
  const [updateIntroduce, updateIntroduceResult] = useUpdateIntroduceMutation();

  useEffect(() => {}, [introduces.data, introduceIdx]);

  useEffect(() => {
    if (data && data?.projects.projects?.length !== 0) {
      setNewProject({
        platform: data?.projects.projects![projectIdx].platform!,

        subtitle: data?.projects.projects![projectIdx].subtitle!.replaceAll('<br />', '\n'),
        title: data?.projects.projects![projectIdx].title!.replaceAll('<br />', '\n'),
        domain: data?.projects.projects![projectIdx].domain!.replaceAll('<br />', '\n'),
        github: data?.projects.projects![projectIdx].github!.replaceAll('<br />', '\n'),
        func: data?.projects.projects![projectIdx].func!.replaceAll('<br />', '\n'),

        back_end: data?.projects.projects![projectIdx].back_end!,
        front_end: data?.projects.projects![projectIdx].front_end!,
        database: data?.projects.projects![projectIdx].database!,
        cloud: data?.projects.projects![projectIdx].cloud!,

        background_up_color: data?.projects.projects![projectIdx].background_up_color!,
        background_down_color: data?.projects.projects![projectIdx].background_down_color!,
        line_color: data?.projects.projects![projectIdx].line_color!,
        font_color: data?.projects.projects![projectIdx].font_color!,
      });
      setProjectImg(data?.projects.projects![projectIdx].project_img!);
    }
  }, [data, projectIdx]);

  const _project = Boolean(data?.projects.projects) ? data?.projects.projects! : [];
  const _introduce = Boolean(introduces.data?.introduce.introduces) ? introduces.data?.introduce.introduces! : [];

  const onSubmit = async () => {
    // 1. projectImg배열에서 file이 있는 요소만 업로드하여 url을 받아온다.
    let finalProjectImg = [...projectImg];

    let upload = projectImg.filter((img) => img.file);

    if (upload.length !== 0) {
      const files = upload.map((i) => i.file!);

      await uploadFiles(files)
        .then(async (res) => {
          // 2. 받아온 url로 file이 있는 객체의 url을 갱신해준다.
          let newProjectImgUrl = [...res.data];

          finalProjectImg = projectImg.map((img) => {
            if (img.file) {
              // 순서대로 새로운 url을 넣기 위함
              const _img = { order: img.order, url: newProjectImgUrl[0] };
              newProjectImgUrl.splice(0, 1);

              return _img;
            } else {
              return img;
            }
          });
        })
        .catch((err) => window.alert(err));
    }

    finalProjectImg = finalProjectImg.map(({ order, url }) => ({ order, url }));

    const _newProject: Project = {
      ...newProject,
      subtitle: newProject.subtitle.replaceAll('\n', '<br />'),
      title: newProject.title.replaceAll('\n', '<br />'),
      domain: newProject.domain.replaceAll('\n', '<br />'),
      github: newProject.github.replaceAll('\n', '<br />'),
      func: newProject.func.replaceAll('\n', '<br />'),
    };

    // db업로드
    updateProject({
      variables: {
        ..._newProject,
        id: data?.projects.projects![projectIdx].id!,
        project_img: finalProjectImg,
      },
    })
      .then((res) => {
        // 전에는 있었지만 현재는 없는 url은 aws s3에서 제거
        const beforeImg = data!.projects.projects![projectIdx].project_img!.map((img) => img.url);
        const afterImg = finalProjectImg.map((img) => img.url);

        // 전 이미지배열 요소 중, 현재 이미지 배열요소에 포함되지 않는 경우
        const deleteImgList = beforeImg.filter((img) => {
          const isExist = afterImg.filter((i) => img === i);
          return isExist.length === 0;
        });

        // aws에서 삭제
        axios
          .delete(`http://127.0.0.1:5000/image`, {
            data: { url: deleteImgList },
          })
          .then((res) => window.alert('Successfully Uploaded.'))
          .catch((err) => window.alert(`File Delete Error.`));
      })
      .catch((err) => window.alert(err));
  };

  const onIntroduceSubmit = async (id: string, field: string) => {
    let content;
    if (field === 'summary_img' || field === 'main_img') {
      // 파일 업로드
      if (introduceImgRef.current && introduceImgRef.current.files) {
        // url
        content = await uploadFile(introduceImgRef.current.files[0]).then((res) => res.data);
        console.log(content);
      }
    } else {
      if (introduceRef.current && introduceRef.current.value) {
        content = introduceRef.current.value.replaceAll('\n', '<br />');
      }
    }

    if (content)
      updateIntroduce({
        variables: { introduce: { id, field, content } },
      })
        .then((res) => {
          if (!res.data?.updateIntroduce.error) window.alert('successfully updated.');
          else window.alert('잠시후에 다시 시도해주세요.');
        })
        .catch((err) => window.alert('잠시후에 다시 시도해주세요.'));
  };

  return (
    <>
      <select onChange={(e) => setSelect(e.target.value)}>
        <option value="introduce">Introduce</option>
        <option value="project">Project</option>
      </select>

      {select === 'introduce' ? (
        <>
          <select onChange={(e) => setIntroduce(e.target.value)}>
            {_introduce.map((i, idx) => (
              <option key={idx} value={i.field}>
                {i.field}
              </option>
            ))}
          </select>
          {_introduce.map((i, idx) => {
            if (i.field === introduce)
              return (
                <div key={idx}>
                  {i.field === 'summary_img' || i.field === 'main_img' ? (
                    <Input type="file" ref={introduceImgRef} />
                  ) : (
                    <Textarea defaultValue={i.content.replaceAll('<br />', '\n')} ref={introduceRef} />
                  )}
                  <button onClick={() => onIntroduceSubmit(i.id!, i.field!)}>Submit</button>
                </div>
              );
            else return null;
          })}
        </>
      ) : (
        <>
          <select onChange={(e) => setProjectIdx(Number(e.target.value))}>
            {_project.map((i, idx) => (
              <option key={idx} value={idx}>
                {i.title}
              </option>
            ))}
          </select>

          {_project.length === 0 ? (
            '등록된 프로젝트가 없습니다.'
          ) : (
            <>
              <Div>
                platform
                <Select onChange={(e) => setNewProject({ ...newProject, platform: e.target.value })}>
                  <option value="web">web</option>
                  <option value="mobile">mobile</option>
                </Select>
              </Div>
              <Div>
                subtitle
                <Textarea
                  value={newProject.subtitle}
                  onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                />
              </Div>
              <Div>
                title
                <Textarea
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
              </Div>
              <Div>
                domain
                <Textarea
                  value={newProject.domain}
                  onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })}
                />
              </Div>
              <Div>
                github
                <Textarea
                  value={newProject.github}
                  onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                />
              </Div>
              <Div>
                func
                <Textarea
                  value={newProject.func}
                  onChange={(e) => setNewProject({ ...newProject, func: e.target.value })}
                />
              </Div>
              <Div>
                back_end
                <PlusBtn
                  onClick={() => {
                    if (backRef.current!.value)
                      setNewProject({ ...newProject, back_end: [...newProject.back_end, backRef.current!.value] });
                    backRef.current!.value = '';
                  }}
                >
                  +
                </PlusBtn>
                <Input ref={backRef} />
                {newProject.back_end.map((j, idx) => (
                  <Item key={idx} id={String(idx)}>
                    {j}
                    <X
                      onClick={(e: any) => {
                        let back_end = [...newProject.back_end];
                        back_end.splice(Number(e.target.parentNode.id), 1);
                        setNewProject({ ...newProject, back_end });
                      }}
                    >
                      X
                    </X>
                  </Item>
                ))}
              </Div>
              <Div>
                front_end
                <PlusBtn
                  onClick={() => {
                    if (frontRef.current!.value)
                      setNewProject({ ...newProject, front_end: [...newProject.front_end, frontRef.current!.value] });
                    frontRef.current!.value = '';
                  }}
                >
                  +
                </PlusBtn>
                <Input ref={frontRef} />
                {newProject.front_end.map((j, idx) => (
                  <Item key={idx} id={String(idx)}>
                    {j}
                    <X
                      onClick={(e: any) => {
                        let front_end = [...newProject.front_end];
                        front_end.splice(Number(e.target.parentNode.id), 1);
                        setNewProject({ ...newProject, front_end });
                      }}
                    >
                      X
                    </X>
                  </Item>
                ))}
              </Div>
              <Div>
                database
                <PlusBtn
                  onClick={() => {
                    if (databaseRef.current!.value)
                      setNewProject({ ...newProject, database: [...newProject.database, databaseRef.current!.value] });
                    databaseRef.current!.value = '';
                  }}
                >
                  +
                </PlusBtn>
                <Input ref={databaseRef} />
                {newProject.database.map((j, idx) => (
                  <Item key={idx} id={String(idx)}>
                    {j}
                    <X
                      onClick={(e: any) => {
                        let database = [...newProject.database];
                        database.splice(Number(e.target.parentNode.id), 1);
                        setNewProject({ ...newProject, database });
                      }}
                    >
                      X
                    </X>
                  </Item>
                ))}
              </Div>
              <Div>
                cloud
                <PlusBtn
                  onClick={() => {
                    if (cloudRef.current!.value)
                      setNewProject({ ...newProject, cloud: [...newProject.cloud, cloudRef.current!.value] });
                    cloudRef.current!.value = '';
                  }}
                >
                  +
                </PlusBtn>
                <Input ref={cloudRef} />
                {newProject.cloud.map((j, idx) => (
                  <Item key={idx} id={String(idx)}>
                    {j}
                    <X
                      onClick={(e: any) => {
                        let cloud = [...newProject.cloud];
                        cloud.splice(Number(e.target.parentNode.id), 1);
                        setNewProject({ ...newProject, cloud });
                      }}
                    >
                      X
                    </X>
                  </Item>
                ))}
              </Div>
              <Div>
                project_img
                <PlusBtn
                  onClick={() => {
                    if (projectImgRef.current!.files && projectImgRef.current!.files.length !== 0) {
                      let reader = new FileReader();
                      let file = projectImgRef.current!.files[0];
                      reader.onloadend = async () => {
                        const newProjectImg: InputProjectImg = {
                          order: projectImg.length === 0 ? 0 : projectImg[projectImg.length - 1].order + 1,
                          file: file,
                          url: String(reader.result),
                        };
                        await setProjectImg([...projectImg, newProjectImg]);
                      };
                      reader.readAsDataURL(file);
                    }

                    projectImgRef.current!.value = '';
                    projectImgRef.current!.files = null;
                  }}
                >
                  +
                </PlusBtn>
                <Input type="file" ref={projectImgRef} />
                {projectImg.map((j, idx) => (
                  <ImgItem key={idx} id={String(idx)}>
                    <Img src={j.url} />
                    <X
                      onClick={(e: any) => {
                        let project_img = [...projectImg];
                        project_img.splice(Number(e.target.parentNode.id), 1);
                        setProjectImg(project_img);
                      }}
                    >
                      X
                    </X>
                  </ImgItem>
                ))}
                <br />
                ----------------------------------------------
                <Div>
                  background_up_color
                  <Input
                    value={newProject.background_up_color}
                    onChange={(e) => setNewProject({ ...newProject, background_up_color: e.target.value })}
                  />
                </Div>
                <Div>
                  background_down_color
                  <Input
                    value={newProject.background_down_color}
                    onChange={(e) => setNewProject({ ...newProject, background_down_color: e.target.value })}
                  />
                </Div>
                <Div>
                  line_color
                  <Input
                    value={newProject.line_color}
                    onChange={(e) => setNewProject({ ...newProject, line_color: e.target.value })}
                  />
                </Div>
                <Div>
                  font_color
                  <Input
                    value={newProject.font_color}
                    onChange={(e) => setNewProject({ ...newProject, font_color: e.target.value })}
                  />
                </Div>
                <br />
                ----------------------------------------------
              </Div>
              <button onClick={() => onSubmit()}>Submit</button>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Update;
