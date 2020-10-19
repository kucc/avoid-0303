import styled from "styled-components/macro";
import { Hide_Scrollbar } from "../../constant";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  overflow: scroll;

  ${Hide_Scrollbar}
`;
