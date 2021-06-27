import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { Container, onepxToRem, onepxToVh, onepxToVw } from '../../../styles/globals';

import { FiServer, FiMonitor, FiDatabase, FiCloud } from 'react-icons/fi';

interface SummaryProps {
  summary_img?: string;
  name_ko?: string;
  name_en?: string;
  birth?: string;
  address?: string;
  phone?: string;
  email?: string;
  front_end?: string[];
  back_end?: string[];
  database?: string[];
  cloud?: string[];
}

const Summary: NextPage<SummaryProps> = ({
  summary_img,
  name_ko,
  name_en,
  birth,
  address,
  phone,
  email,
  front_end,
  back_end,
  database,
  cloud,
}) => {
  return (
    <Container>
      <BgImg src={summary_img} />

      <Wrapper>
        <Content>
          <Name_ko>{name_ko}</Name_ko>

          <Name_en>{name_en}</Name_en>

          <Birth>
            {birth} {address}
          </Birth>

          <Phone>{phone}</Phone>

          <Eamil>{email}</Eamil>
        </Content>

        <Skill>
          <Section>
            <FiServer style={{ marginRight: `${4 * onepxToVh}vh` }} />
            {front_end && front_end.map((i) => `${i}. `)}
          </Section>

          <Section>
            <FiMonitor style={{ marginRight: `${4 * onepxToVh}vh` }} />
            {back_end && back_end.map((i) => `${i}. `)}
          </Section>

          <Section>
            <FiDatabase style={{ marginRight: `${4 * onepxToVh}vh` }} />
            {database && database.map((i) => `${i}. `)}
          </Section>

          <Section>
            <FiCloud style={{ marginRight: `${4 * onepxToVh}vh` }} />
            {cloud && cloud.map((i) => `${i}. `)}
          </Section>
        </Skill>
      </Wrapper>
    </Container>
  );
};

export default Summary;

const Wrapper = styled.div`
  position: absolute;
  z-index: 2;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${80 * onepxToVw}vw 0;
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  padding: 0 ${100 * onepxToVh}vh;

  @media (max-width: 1120px) {
    padding: 0 ${50 * onepxToVw}vw;
  }

  @media (max-width: 700px) {
    text-align: right;
    padding-top: ${460 * onepxToVh}vh;
  }

  @media (max-width: 550px) {
    padding: ${40 * onepxToVh}vh ${40 * onepxToVh}vh;

    margin-top: ${480 * onepxToVh}vh;
    text-align: right;
    width: 100%;
  }
`;

const Skill = styled.div`
  display: flex;

  padding: 0 ${100 * onepxToVh}vh;
  font-size: ${20 * onepxToVh}vh;

  @media (max-width: 1120px) {
    padding: 0 ${80 * onepxToVw}vw;
  }

  @media (max-width: 1480px) {
    display: block;
  }

  @media (max-width: 550px) {
    height: ${(122 / 640) * 100}vh;
    border-top: 3px solid white;

    padding: ${40 * onepxToVh}vh ${40 * onepxToVh}vh;
    position: absolute;
    bottom: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${14 * onepxToVh}vh;

  @media (max-width: 550px) {
    font-size: ${17 * onepxToRem}rem;
  }
`;

const BgImg = styled.img`
  z-index: 1;
  position: absolute;
  right: 0;
  height: 100vh;
`;

const Name_ko = styled.div`
  font-size: ${28 * onepxToVh}vh;

  @media (max-width: 550px) {
    font-size: ${24 * onepxToRem}rem;
  }
`;
const Name_en = styled.div`
  font-size: ${32 * onepxToVh}vh;
  font-weight: bold;

  @media (max-width: 550px) {
    font-size: ${28 * onepxToRem}rem;
  }
`;

const Birth = styled.div`
  font-size: ${20 * onepxToVh}vh;
  @media (max-width: 550px) {
    font-size: ${20 * onepxToRem}rem;
  }
`;

const Phone = styled.div`
  font-size: ${20 * onepxToVh}vh;
  margin-top: ${50 * onepxToVh}vh;

  @media (max-width: 550px) {
    margin-top: ${20 * onepxToVh}vh;
    font-size: ${20 * onepxToRem}rem;
  }
`;
const Eamil = styled.div`
  font-size: ${20 * onepxToVh}vh;

  @media (max-width: 550px) {
    font-size: ${20 * onepxToRem}rem;
  }
`;
