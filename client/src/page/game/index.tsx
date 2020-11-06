import React from "react";
import Layout from "../../component/layout";
import GameComponent from "../../component/game";

import * as S from "./styles";

const GamePage: React.FC = () => {
  return (
    <Layout>
      <S.GamePage>
        <S.GameArea>
          <GameComponent />
        </S.GameArea>
      </S.GamePage>
    </Layout>
  );
};

export default GamePage;
