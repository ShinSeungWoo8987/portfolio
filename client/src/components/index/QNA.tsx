import React from 'react';
import { NextPage } from 'next';
import { Container, onepxToRem, onepxToVwMobile } from '../../../styles/globals';
import parse from 'react-html-parser';
import styled from 'styled-components';

// const data = {
//   question1: '개발자에 대한 평소 나의 생각?',
//   answer1: `대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답대답`,
//   question2: '개발자가 되고싶은 이유?',
//   answer2: '대답2',
//   question3: '질문?',
//   answer3: `대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답
//   대답대답대답대답대답대답대답대답대답대답대답대답대답`,
// };

interface QNAProps {
  question1?: string;
  answer1?: string;
  question2?: string;
  answer2?: string;
  question3?: string;
  answer3?: string;
}

const QNA: NextPage<QNAProps> = ({ question1, answer1, question2, answer2, question3, answer3 }) => {
  return (
    <Wrapper>
      <Header>Introduction</Header>

      <Content>
        <div>
          <b>{question1}</b>
          <Answer>{parse(answer1!)}</Answer>
        </div>
        <div>
          <b>{question2}</b>
          <Answer>{parse(answer1!)}</Answer>
        </div>
        <div>
          <b>{question3}</b>
          <Answer>{parse(answer3!)}</Answer>
        </div>
      </Content>
    </Wrapper>
  );
};

export default QNA;

const Wrapper = styled(Container)`
  padding: ${80 * onepxToRem}rem ${100 * onepxToRem}rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 500px) {
    padding: ${40 * onepxToVwMobile}vw ${20 * onepxToVwMobile}vw;
    font-size: ${12 * onepxToVwMobile}vw;
  }
`;

const Header = styled.div`
  font-size: ${28 * onepxToRem}rem;
  font-weight: bold;
  margin-bottom: ${26 * onepxToRem}rem;
`;
const Content = styled.div``;

const Answer = styled.div`
  margin: ${2 * onepxToRem}rem 0 ${26 * onepxToRem}rem 0;
`;
