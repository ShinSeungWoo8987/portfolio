import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Main from '../src/components/index/Main';
import Summary from '../src/components/index/Summary';
import Work from '../src/components/index/Work';
import QNA from '../src/components/index/QNA';
import Thank from '../src/components/index/Thank';
import styled from 'styled-components';
import { Container } from '../styles/globals';
import { useIntroduceLazyQuery, useProjectsLazyQuery } from '../src/generated/graphql';

const index: NextPage = () => {
  const [size, setSize] = useState([0, 0]);
  const width = size[0];
  const height = size[1];
  const [getIntroduce, introduceResult] = useIntroduceLazyQuery();
  const [getProject, projectResult] = useProjectsLazyQuery();

  const getIntroduceByField = (field: string) =>
    introduceResult.data?.introduce.introduces?.filter((i) => i.field === field)[0].content;

  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    // data 불러오기
    getIntroduce();
    getProject();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  let front_end: string[] = [];
  let back_end: string[] = [];
  let database: string[] = [];
  let cloud: string[] = [];

  projectResult.data?.projects.projects?.forEach((project) => {
    back_end = [...back_end, ...project.back_end];
    front_end = [...front_end, ...project.front_end];
    database = [...database, ...project.database];
    cloud = [...cloud, ...project.cloud];
  });

  const skills = {
    back_end: Array.from(new Set(back_end)),
    front_end: Array.from(new Set(front_end)),
    database: Array.from(new Set(database)),
    cloud: Array.from(new Set(cloud)),
  };

  return (
    <>
      <Main
        main_img={getIntroduceByField('main_img')}
        main1={getIntroduceByField('main1')}
        main2={getIntroduceByField('main2')}
      />
      <Summary
        summary_img={getIntroduceByField('summary_img')}
        name_ko={getIntroduceByField('name_ko')}
        name_en={getIntroduceByField('name_en')}
        birth={getIntroduceByField('birth')}
        address={getIntroduceByField('address')}
        phone={getIntroduceByField('phone')}
        email={getIntroduceByField('email')}
        {...skills}
      />
      {(width > 500 && height <= 600) || (width <= 968 && height <= 520) ? (
        <Nopage>
          페이지 높이가 너무 작습니다. 크기를 키워주세요.
          <br />
          The page height is too small.
        </Nopage>
      ) : (
        <>
          {projectResult.data?.projects.projects?.map((project) => (
            <Work key={project.id} {...project} />
          ))}
        </>
      )}
      <QNA
        question1={getIntroduceByField('question1')}
        answer1={getIntroduceByField('answer1')}
        question2={getIntroduceByField('question2')}
        answer2={getIntroduceByField('answer2')}
        question3={getIntroduceByField('question3')}
        answer3={getIntroduceByField('answer3')}
      />
      <Thank />
    </>
  );
};

export default index;

const Nopage = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  min-height: 50vh;
  background-color: lightgrey;
  font-size: 1.4rem;
`;

[
  {
    field: 'main_img',
    content: 'main_img',
  },
  {
    field: 'main1',
    content: '스펀지 같은 개발자',
  },
  {
    field: 'main2',
    content:
      '빠르게 흡수하여 융화되려고 노력한다는 점을 어필,<br/>새로운 것을 알게되면 빠르게 적용하고, 익숙해지고 싶어한다.<br/>그래서 나는 이러이러한 개발자가 되고싶다.',
  },
  {
    field: 'name_ko',
    content: '신승우',
  },
  {
    field: 'name_en',
    content: 'SEUNG WOO. SHIN',
  },
  {
    field: 'birth',
    content: '1996.11.20',
  },
  {
    field: 'phone',
    content: '010.7308.8987',
  },
  {
    field: 'address',
    content: 'GUNPO',
  },
  {
    field: 'email',
    content: 'sean8987@gmail.com',
  },
  {
    field: 'question1',
    content: '개발자에 대한 평소 나의 생각?',
  },
  {
    field: 'answer1',
    content: 'answer1',
  },
  {
    field: 'question2',
    content: '개발자가 되고싶은 이유?',
  },
  {
    field: 'answer2',
    content: 'answer2',
  },
  {
    field: 'question3',
    content: '질문?',
  },
  {
    field: 'answer3',
    content: 'answer3',
  },
];
