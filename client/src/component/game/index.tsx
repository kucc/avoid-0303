import React, { useEffect, useRef, useState } from "react";

import * as PIXI from "pixi.js";

const game = new PIXI.Application({
  width: 600,
  height: 300,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

const container = new PIXI.Container();
game.stage.addChild(container);

const texture = PIXI.Texture.from(
  "https://avatars2.githubusercontent.com/u/41494099?s=460&u=a35f30bae3d4b988cc4ebd5923b2c79f657e77d7&v=4",
);

// Create a 5x5 grid of bunnies
for (let i = 0; i < 25; i++) {
  const bunny = new PIXI.Sprite(texture);
  bunny.anchor.set(0.5);
  bunny.x = (i % 5) * 40;
  bunny.y = Math.floor(i / 5) * 40;
  container.addChild(bunny);
}

// Move container to the center
container.x = game.screen.width / 2;
container.y = game.screen.height / 2;

// Center bunny sprite in local container coordinates
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

// Listen for animate update
game.ticker.add((delta) => {
  // rotate the container!
  // use delta to create frame-independent transform
  container.rotation -= 0.01 * delta;
});

const Game: React.FC = () => {
  const canvas = useRef(null as HTMLDivElement);

  useEffect(() => {
    canvas.current.appendChild(game.view);
    game.stage.addChild(container);
  }, []);

  return <span ref={canvas} id="game"></span>;
};

export default Game;
