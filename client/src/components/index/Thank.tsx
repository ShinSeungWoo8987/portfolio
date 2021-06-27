import React from 'react';
import { NextPage } from 'next';
import {
  Container,
  onepxToVh,
  onepxToVwMobile
} from '../../../styles/globals';
import styled from 'styled-components';
import { DotDotDot } from './Main';

interface ThankProps {}

const Thank: NextPage<ThankProps> = () => {
  return (
    <ThankContainer backgroundColor="#004054" fontColor="white">
      감사합니다
      {/* <DotContainer>
        <DotDotDot />
      </DotContainer> */}
    </ThankContainer>
  );
};

export default Thank;

const ThankContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: ${64 * onepxToVh}vh;
  font-weight: bold;

  @media (max-width: 500px) {
    font-size: ${30 * onepxToVwMobile}vw;
  }
`;

const DotContainer = styled.div`
  width: 100%;
  text-align: left;
  @media (max-width: 500px) {
    display: none;
  }
`;
