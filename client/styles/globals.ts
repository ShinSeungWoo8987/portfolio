import styled from 'styled-components';

// 46px = 2.56875rem
export const onepxToRem: number = 2.56875 / 46;
export const onepxToVw: number = 100 / 1920;
export const onepxToVwMobile: number = 100 / 360;
export const onepxToVh: number = 100 / 968;

export const Container = styled.div<{
  backgroundColor?: string;
  fontColor?: string;
}>`
  min-height: 100vh;

  font-size: ${20 * onepxToVh}vh;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ fontColor }) => fontColor};
`;
