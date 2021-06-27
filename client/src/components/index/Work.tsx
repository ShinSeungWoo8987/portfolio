import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Container, onepxToRem, onepxToVh, onepxToVw, onepxToVwMobile } from '../../../styles/globals';
import styled from 'styled-components';
import { Dot } from './Main';
import parse from 'react-html-parser';
import { Project } from '../../generated/graphql';

interface WorkProps extends Project {}

const Work: NextPage<WorkProps> = ({
  background_up_color,
  background_down_color,
  line_color,
  platform,

  title,
  subtitle,
  domain,
  github,
  func,
  front_end,
  back_end,
  database,
  cloud,
  font_color,
  project_img,
}) => {
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  //////////////////////////

  const [imageIdx, setImageIdx] = useState(0);

  const skills = [...back_end, ...front_end, ...database, ...cloud];

  const nextImage = () => {
    if (project_img![imageIdx + 1]) setImageIdx(imageIdx + 1);
    else setImageIdx(0);
  };
  const previousImage = () => {
    if (project_img![imageIdx - 1]) setImageIdx(imageIdx - 1);
    else setImageIdx(project_img!.length - 1);
  };

  // platform

  const description = (
    <div>
      <InfoUp>도메인</InfoUp>
      <InfoDown>
        <InfoSpan>D</InfoSpan>
        {domain}
      </InfoDown>

      <InfoUp>GitHub</InfoUp>
      <InfoDown>
        <InfoSpan>G</InfoSpan>
        {github}
      </InfoDown>

      <InfoUp>주요기능</InfoUp>
      {/* <InfoDown>
        <InfoSpan>F</InfoSpan>
        {parse(func)}
      </InfoDown> */}
      <InfoDownContainer>
        <InfoSpan>F</InfoSpan>
        <InfoDown>{parse(func)}</InfoDown>
      </InfoDownContainer>
    </div>
  );

  return (
    <Container fontColor={font_color}>
      <Bg>
        <BgUp bg={background_up_color} line={line_color} />
        <BgDown bg={background_down_color} />
      </Bg>

      {platform === 'web' ? (
        <MonitorContainer>
          <Bottom>
            <ScreenContainer>
              <Screen src={project_img![imageIdx].url} />

              <ArrowContainerLeft onClick={() => previousImage()}>
                <ArrowLeft />
              </ArrowContainerLeft>

              <ArrowContainerRight onClick={() => nextImage()}>
                <ArrowRight />
              </ArrowContainerRight>
            </ScreenContainer>

            <Monitor src="/monitor.png" />
          </Bottom>
        </MonitorContainer>
      ) : (
        <PhoneContainer>
          <PhoneBottom>
            <PhoneWrapper>
              <PhoneScreen>
                <ContentScreen src={project_img![imageIdx].url} />

                <PhoneArrowContainerLeft onClick={() => previousImage()}>
                  <PhoneArrowLeft />
                </PhoneArrowContainerLeft>

                <PhoneArrowContainerRight onClick={() => nextImage()}>
                  <PhoneArrowRight />
                </PhoneArrowContainerRight>
              </PhoneScreen>
              <Phone src="/iphone.png" />
            </PhoneWrapper>
          </PhoneBottom>
        </PhoneContainer>
      )}

      <Content>
        <Up>
          <Dot bg="#B5B5B5" />
          <SubTitle>{subtitle}</SubTitle>
          <Title>{title}</Title>

          {isMobile() ? (
            <DescriptionMoblie style={{ marginTop: platform === 'web' ? '16vh' : '4vh' }}>
              {description}
            </DescriptionMoblie>
          ) : (
            <DescriptionUp>{description}</DescriptionUp>
          )}
        </Up>

        <Down>
          <DescriptionDown>{description}</DescriptionDown>

          <Skill>
            {skills.map((n, idx) => (
              <SkillItem key={idx} skill={n} fontColor={font_color} />
            ))}
          </Skill>
        </Down>
      </Content>
    </Container>
  );
};

export default Work;

/////
const SkillItem: React.FC<{ skill: string; fontColor: string }> = ({ skill, fontColor }) => {
  return <SkillItemContainer borderColor={fontColor}>{skill}</SkillItemContainer>;
};

const SkillItemContainer = styled.div<{ borderColor: string }>`
  display: inline-block;
  border-radius: ${24 * onepxToRem}rem;
  padding: ${9 * onepxToRem}rem ${17 * onepxToRem}rem;
  margin-right: ${12 * onepxToRem}rem;
  border: ${({ borderColor }) => `1px solid ${borderColor === 'white' ? '#b5b5b5' : '#707070'}`};

  @media (max-width: 968px) {
    font-size: ${16 * onepxToRem}rem;

    display: inline-block;
    padding: ${6 * onepxToVh}vh ${10 * onepxToVh}vh;
    margin-left: ${6 * onepxToVh}vh;
    margin-right: ${6 * onepxToVh}vh;
    margin-top: ${6 * onepxToVh}vh;
    border: ${({ borderColor }) => `1px solid ${borderColor === 'white' ? '#b5b5b5' : '#707070'}`};
  }

  @media (max-width: 700px) {
    font-size: ${16 * onepxToRem}rem;

    display: inline-block;
    padding: ${4 * onepxToVwMobile}vw ${8 * onepxToVwMobile}vw;
    margin-left: ${4 * onepxToVwMobile}vw;
    margin-right: ${4 * onepxToVwMobile}vw;
    margin-top: ${4 * onepxToVwMobile}vw;
    border: ${({ borderColor }) => `1px solid ${borderColor === 'white' ? '#b5b5b5' : '#707070'}`};
  }
`;

/////////////////////////////////////////////

const Content = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  padding: ${80 * onepxToVh}vh ${100 * onepxToVh}vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1120px) {
    padding: ${80 * onepxToVw}vw ${80 * onepxToVw}vw;
  }

  @media (max-width: 700px) {
    padding: ${40 * onepxToVh}vh ${40 * onepxToVh}vh;
  }
`;

const Down = styled.div``;

const Up = styled.div``;

const SubTitle = styled.div`
  font-size: ${24 * onepxToVh}vh;
  font-weight: bold;

  @media (max-width: 700px) {
    font-size: ${24 * onepxToRem}rem;
  }
`;
const Title = styled.div`
  font-size: ${28 * onepxToVh}vh;
  font-weight: bold;

  @media (max-width: 700px) {
    font-size: ${28 * onepxToRem}rem;
  }
`;

const InfoUp = styled.div`
  font-weight: bold;
  margin-bottom: ${2 * onepxToVh}vh;

  @media (max-width: 968px) {
    display: none;
  }

  @media (max-width: 700px) {
    margin-bottom: ${0 * onepxToVh}vh;
    font-size: ${16 * onepxToRem}rem;
  }
`;

const InfoDownContainer = styled.div`
  display: flex;
  @media (max-height: 650px) {
    display: flex;
    // alignitems: flex-start;
    // font-size: ${16 * onepxToRem}rem;
  }
`;

const InfoDown = styled.div`
  margin-bottom: ${12 * onepxToVh}vh;

  @media (max-width: 700px) {
    margin-bottom: ${10 * onepxToVh}vh;
    font-size: ${16 * onepxToRem}rem;
  }

  // @media (max-height: 650px) {
  //   display: inline-block;
  //   margin-right: 2rem;
  // }
`;

const DescriptionMoblie = styled.div`
  @media (min-width: 700px) {
    display: none;
  }
`;

const DescriptionUp = styled.div`
  margin-top: 15vh;

  @media (max-height: 900px) {
    margin-top: 5rem;
  }

  @media (max-height: 800px) {
    margin-top: 3rem;
  }

  @media (max-height: 710px) {
    margin-top: 0.5rem;
  }

  @media (min-width: 700px) {
    display: none;
  }
`;
const DescriptionDown = styled.div`
  @media (max-width: 700px) {
    display: none;
  }
`;

const InfoSpan = styled.div`
  display: none;
  @media (max-width: 968px) {
    display: inline-block;
    font-weight: bold;
    margin-right: 10px;
    font-size: ${20 * onepxToRem}rem;
  }

  @media (max-width: 650px) {
    font-size: ${16 * onepxToRem}rem;
  }
`;

const Skill = styled.div`
  margin-top: ${40 * onepxToVh}vh;

  @media (max-height: 500px) and (max-width: 968px) {
    // margin-top: 56vh;
    background-color: grey;
  }

  @media (max-width: 968px) {
  }

  @media (max-width: 700px) {
    margin-top: 39.4vh;
    text-align: center;
  }
`;

const MonitorContainer = styled.div`
  position: absolute;
  width: ${1111.75 * onepxToVw}vw;

  height: 100vh;
  right: ${100 * onepxToVh}vh;
  text-align: center;

  @media (max-height: 500px) and (max-width: 968px) {
    display: none;
  }

  @media (max-width: 1120px) {
    display: normal;
    right: ${80 * onepxToVw}vw;
  }

  @media (max-width: 968px) {
    width: calc(100% - ${80 * 2 * onepxToVw}vw);
  }

  @media (max-width: 700px) {
    width: calc(100% - ${40 * onepxToVwMobile}vw);
    right: ${20 * onepxToVwMobile}vw;
  }
`;

const Bottom = styled.div`
  position: absolute;
  bottom: ${83 * onepxToVh}vh;

  @media (max-width: 1120px) {
    bottom: ${80 * onepxToVw}vw;
  }

  @media (max-width: 968px) {
    right: 0;
    bottom: 15.6%;
  }
`;

const PhoneBottom = styled.div`
  position: absolute;
  bottom: ${83 * onepxToVh}vh;
  right: 0;

  @media (max-width: 1120px) {
    bottom: ${80 * onepxToVw}vw;
  }

  @media (max-width: 968px) {
    bottom: 15.6%;
  }
`;

const ScreenContainer = styled.div`
  width: ${1111.75 * onepxToVw}vw;
  height: ${593 * onepxToVw}vw;

  border-radius: ${20 * onepxToVh}vh;
  border: ${24 * onepxToVw}vw solid black;
  z-index: 99;

  @media (max-width: 968px) {
    width: ${1400 * onepxToVw}vw;
    height: ${(593 / 1111.75) * 1400 * onepxToVw}vw;

    margin: 0 auto;

    border: ${6 * onepxToVwMobile}vw solid black;
  }

  @media (max-width: 700px) {
    width: 100%;
    height: ${((100 - 40 * onepxToVwMobile) * 164) / 320}vw;

    border-radius: 2%;
    border: ${6 * onepxToVwMobile}vw solid black;
  }
`;

const Screen = styled.img`
  width: 100%;
  height: 100%;
`;

const Monitor = styled.img`
  width: ${332 * onepxToVw}vw;

  @media (max-width: 968px) {
    width: ${(332 / 1111.75) * 1400 * onepxToVw}vw;
  }

  @media (max-width: 700px) {
    width: ${95.5 * 1.6 * onepxToVh}vh;
  }
`;

const PhoneContainer = styled.div`
  position: absolute;
  //
  width: 40.6vh;
  height: 100vh;
  right: ${100 * onepxToVh}vh;
  text-align: center;

  @media (max-width: 700px) {
    width: 100vw;
    right: 0;
  }
`;

const PhoneWrapper = styled.div`
  height: 78.2vh;

  @media (max-width: 700px) {
    height: 48vh;
  }
`;

const PhoneScreen = styled.div`
  position: absolute;

  // width: ${393 * onepxToVh}vh;
  height: 78.2vh;
  width: ${(394 / 757) * 78.2}vh;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 700px) {
    right: ${40 * onepxToVh}vh;
    height: 48vh;
    width: ${(393 / 757) * 48}vh;
  }
`;

const ContentScreen = styled.img`
  background-color: white;
  width: 83.6%;
  height: 94.2%;
`;

const Phone = styled.img`
  position: absolute;
  // width: ${393 * onepxToVh}vh;
  height: 78.2vh;
  right: 0;

  @media (max-width: 700px) {
    right: ${40 * onepxToVh}vh;
    height: 100%;
  }
`;

const Bg = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

const BgUp = styled.div<{ bg: string; line: string }>`
  height: 85.53719008264463vh;
  background-color: ${({ bg }) => bg};
  border-bottom: ${({ line }) => `3px solid ${line}`};

  @media (max-width: 968px) {
    height: ${(518 / 640) * 100}vh;
  }
`;

const BgDown = styled.div<{ bg: string }>`
  height: 14.46280991735537vh;
  background-color: ${({ bg }) => bg};

  @media (max-width: 968px) {
    height: ${(122 / 640) * 100}vh;
  }
`;

const ArrowContainerLeft = styled.div`
  padding-right: ${200 * onepxToVw}vw;
  position: absolute;
  bottom: ${420 * onepxToVw}vw;
  cursor: pointer;
  z-index: 99;
  left: ${60 * onepxToVw}vw;

  @media (max-width: 968px) {
    top: 34%;
    left: 5%;
  }

  @media (max-width: 700px) {
    top: 30%;
  }
`;

const ArrowContainerRight = styled.div`
  padding-left: ${200 * onepxToVw}vw;
  position: absolute;
  bottom: ${420 * onepxToVw}vw;
  cursor: pointer;
  z-index: 99;
  right: ${60 * onepxToVw}vw;

  @media (max-width: 968px) {
    top: 34%;
    right: 5%;
  }

  @media (max-width: 700px) {
    top: 30%;
  }
`;

//////////

const Arrow = styled.div`
  display: inline-block;
  margin: ${20 * onepxToVw}vw auto;
  width: ${30 * onepxToVw}vw;
  height: ${30 * onepxToVw}vw;
  border-top: ${4 * onepxToVw}vw solid #000;
  border-left: ${4 * onepxToVw}vw solid #000;

  @media (max-width: 968px) {
    width: ${60 * onepxToVw}vw;
    height: ${60 * onepxToVw}vw;
    border-top: ${8 * onepxToVw}vw solid #000;
    border-left: ${8 * onepxToVw}vw solid #000;
  }

  @media (max-width: 700px) {
    width: ${20 * onepxToVwMobile}vw;
    height: ${20 * onepxToVwMobile}vw;
    border-top: ${3 * onepxToVwMobile}vw solid #000;
    border-left: ${3 * onepxToVwMobile}vw solid #000;
  }
`;

const ArrowLeft = styled(Arrow)`
  transform: rotate(-45deg);
  margin-right: ${10 * onepxToVw}vw;
`;

const ArrowRight = styled(Arrow)`
  transform: rotate(135deg);
  margin-left: ${10 * onepxToVw}vw;
`;

////////////////////////////////////////////////

const PhoneArrowContainerLeft = styled.div`
  padding-right: ${200 * onepxToVw}vw;
  position: absolute;
  // bottom: 45%;
  cursor: pointer;
  z-index: 99;

  left: 12%;
`;

const PhoneArrowContainerRight = styled.div`
  padding-left: ${200 * onepxToVw}vw;
  position: absolute;
  // bottom: 45%;
  cursor: pointer;
  z-index: 99;

  right: 12%;
`;

//////////

const PhoneArrow = styled.div`
  display: inline-block;
  margin: ${20 * onepxToVw}vw auto;
  width: ${30 * onepxToVw}vw;
  height: ${30 * onepxToVw}vw;
  border-top: ${4 * onepxToVw}vw solid #000;
  border-left: ${4 * onepxToVw}vw solid #000;

  @media (max-width: 968px) {
    width: ${40 * onepxToVw}vw;
    height: ${40 * onepxToVw}vw;
    border-top: ${6 * onepxToVw}vw solid #000;
    border-left: ${6 * onepxToVw}vw solid #000;
  }

  @media (max-width: 700px) {
    width: ${10 * onepxToVwMobile}vw;
    height: ${10 * onepxToVwMobile}vw;
    border-top: ${2 * onepxToVwMobile}vw solid #000;
    border-left: ${2 * onepxToVwMobile}vw solid #000;
  }
`;

const PhoneArrowLeft = styled(PhoneArrow)`
  transform: rotate(-45deg);
  margin-right: ${10 * onepxToVw}vw;
`;

const PhoneArrowRight = styled(PhoneArrow)`
  transform: rotate(135deg);
  margin-left: ${10 * onepxToVw}vw;
`;
