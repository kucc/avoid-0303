import React from "react";
import Layout from "../../component/layout";

import * as S from "./styles";

const Game: React.FC = () => {
  return (
    <Layout>
      <S.Game>
        <S.GameArea></S.GameArea>
        <S.ChattingArea></S.ChattingArea>
      </S.Game>
    </Layout>
  );
};

export default Game;
