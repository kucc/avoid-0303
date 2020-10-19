import React from "react";
import Layout from "../../component/layout";
import Game from "../../component/game";

import * as S from "./styles";

const GamePage: React.FC = () => {
  return (
    <Layout>
      <S.GamePage>
        <S.GameArea>
          <Game />
        </S.GameArea>
        <S.ChattingArea></S.ChattingArea>
      </S.GamePage>
    </Layout>
  );
};

export default GamePage;
