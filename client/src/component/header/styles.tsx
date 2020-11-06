import styled from "styled-components/macro";

interface ActiveProps {
  active?: boolean;
}

export const Header = styled.div`
  width: 100%;
  height: 6rem;
  font-size: 3rem;
  font-weight: bold;
  color: red;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderContainer = styled.div``;
