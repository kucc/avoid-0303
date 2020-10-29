import React, { useEffect, useRef, useState } from "react";

import Game from "../../lib/game";

const GameComponent: React.FC = () => {
  const canvas = useRef(null as HTMLDivElement);

  useEffect(() => {
    canvas.current.appendChild(new Game().view);
  }, []);

  return <span ref={canvas} id="game"></span>;
};

export default GameComponent;
