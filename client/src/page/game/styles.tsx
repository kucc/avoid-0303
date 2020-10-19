import styled from "styled-components";

import {
  Flex_Center_Center,
  Flex_Column_Start_Center,
  Flex_Row_Start_Center,
  Hide_Scrollbar,
} from "../../constant";

export const GamePage = styled.div`
  width: 100%;
  height: 100%;

  ${Flex_Center_Center}

  ${Hide_Scrollbar}
`;

export const GameArea = styled.div`
  width: 70rem;
  height: 40rem;
  margin-bottom: 10rem;
`;

export const ChattingArea = styled.div`
  width: 25rem;
  height: 40rem;
  margin: 0rem 0rem 10rem 5rem;

  background-color: gray;
`;
