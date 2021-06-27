import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import parse from 'react-html-parser';
import { Container, onepxToVh, onepxToVw, onepxToVwMobile } from '../../../styles/globals';

interface MainProps {
  main_img?: string;
  main1?: string;
  main2?: string;
}

// const data = {
//   main_img: '/sponge.png',
//   main1: '스펀지 같은<br/>개발자',
//   main2:
//     '빠르게 흡수하여 융화되려고 노력한다는 점을 어필,<br/>새로운 것을 알게되면 빠르게 적용하고, 익숙해지고 싶어한다.<br/>그래서 나는 이러이러한 개발자가 되고싶다.',
// };

const Main: NextPage<MainProps> = ({ main_img, main1, main2 }) => {
  return (
    <MainContainer backgroundColor="#004054" fontColor="white">
      <Content>
        <Sticker src={main_img} alt="sticker" />

        <Title>{parse(main1!)}</Title>

        <div style={{ margin: `${60 * onepxToVh}vh 0 ${20 * onepxToVh}vh 0` }}>
          <DotDotDot />
        </div>

        <Description>{parse(main2!)}</Description>
      </Content>
    </MainContainer>
  );
};

export default Main;

export const DotDotDot: NextPage = () => {
  return (
    <Contour>
      <span>
        <Box key={1} />
        <Box key={2} />
        <Box key={3} />
        <Box key={4} />
        <Box key={5} />
      </span>
    </Contour>
  );
};

export const Dot: NextPage<{ bg?: string }> = ({ bg }) => {
  return bg ? <Box bg={bg} /> : <Box />;
};

const MainContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 500px) {
    padding: 0 ${20 * onepxToVwMobile}vw;
  }
`;

const Sticker = styled.img`
  display: block;
  height: ${27 * onepxToVh}vh;

  @media (max-width: 500px) {
    height: ${13.5 * onepxToVwMobile}vw;
  }
`;

const Content = styled.div`
  margin-top: -${27 * onepxToVh}vh;
  width: ${540 * onepxToVh}vh;

  @media (max-width: 500px) {
    width: ${280 * onepxToVwMobile}vw;
  }
`;

const Title = styled.div`
  font-size: ${64 * onepxToVh}vh;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: ${30 * onepxToVwMobile}vw;
  }
`;

const Contour = styled.div`
  text-align: right;
`;

const Box = styled.div<{ bg?: string }>`
  display: inline-block;
  background-color: ${({ bg }) => (bg ? bg : 'white')};

  border-radius: ${4 * onepxToVh}vh;
  margin-right: ${4 * onepxToVh}vh;
  width: ${8 * onepxToVh}vh;
  height: ${16 * onepxToVh}vh;
`;

const Description = styled.div`
  font-size: ${18 * onepxToVh}vh;
  text-align: right;

  @media (max-width: 500px) {
    font-size: ${10.2 * onepxToVwMobile}vw;
  }
`;
