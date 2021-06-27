import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Project, ProjectImg, useCreateProjectMutation } from '../../generated/graphql';
import { uploadFiles } from '../../uploadImages';

export interface InputProjectImg extends ProjectImg {
  file?: File;
}

export const initProject: Project = {
  platform: 'web',
  subtitle: '',
  title: '',
  domain: '',
  github: '',
  func: '',
  back_end: [],
  front_end: [],
  database: [],
  cloud: [],

  background_up_color: '',
  background_down_color: '',
  line_color: '',
  font_color: '',
};

interface CreateProps {}

const Create: React.FC<CreateProps> = () => {
  const router = useRouter();
  const backRef = useRef<HTMLInputElement>(null);
  const frontRef = useRef<HTMLInputElement>(null);
  const databaseRef = useRef<HTMLInputElement>(null);
  const cloudRef = useRef<HTMLInputElement>(null);
  const projectImgRef = useRef<HTMLInputElement>(null);

  const [newProject, setNewProject] = useState<Project>(initProject);
  const [projectImg, setProjectImg] = useState<InputProjectImg[]>([]);

  const [createProject, { loading, data, error }] = useCreateProjectMutation();

  ///////////////////

  const onSubmit = () => {
    if (projectImg.length !== 0) {
      const files = projectImg.map((i) => i.file!);

      uploadFiles(files)
        .then(async (res) => {
          const newProjectImg: ProjectImg[] = res.data.map((url: string, idx: number) => ({ url, order: idx }));

          createProject({
            variables: {
              ...newProject,
              project_img: newProjectImg,
            },
          }).then(() => {
            window.alert(`Successfully Create Project.`);
            router.push('/admin');
            setNewProject(initProject);
            setProjectImg([]);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
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
        <Textarea value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
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
        <Textarea value={newProject.func} onChange={(e) => setNewProject({ ...newProject, func: e.target.value })} />
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
  );
};

export default Create;

export const PlusBtn = styled.button`
  display: inline-block;
  margin-left: 0.6rem;
`;

export const Div = styled.div`
  margin-bottom: 1rem;
`;

export const Select = styled.select`
  display: block;
  width: 10rem;
`;

export const Textarea = styled.textarea`
  display: block;
  width: 23rem;
`;

export const Input = styled.input`
  display: block;
  width: 23rem;
`;

export const Item = styled.div`
  display: inline-block;

  font-size: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.1rem 0.6rem;
  margin: 0.4rem 0.3rem 0 0;
`;

export const ImgItem = styled(Item)`
  display: block;
  width: 23rem;
  text-align: center;
  padding: 0.4rem 0;
`;

export const X = styled.span`
  margin-left: 0.4rem;
  color: grey;
  cursor: pointer;
`;

export const Img = styled.img`
  display: block;
  height: 10rem;
  margin: 0 auto;
`;
