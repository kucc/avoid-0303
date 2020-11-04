import * as PIXI from "pixi.js";
import { getRandomArray } from "../array";
import Ball from "./component/ball";
import InputController from "./controller/input.controller";
import ObstacleController from "./controller/obstacle.controller";

export default class Game extends PIXI.Application {
  private inputController: InputController;
  private obstacleController: ObstacleController;

  private container: PIXI.Container;

  public constructor() {
    super({
      width: 700,
      height: 400,
      backgroundColor: 0x1099bb,
    });

    this.container = new PIXI.Container();
    this.stage.addChild(this.container);

    const balls = this.createRandomBalls(20);

    // generate obstacles
    this.stage.addChild(...balls);
    this.obstacleController = new ObstacleController(balls);

    // create myBall

    const main = () => {
      this.obstacleController.update();

      requestAnimationFrame(main);
    };

    main();
  }

  private createRandomBalls(size: number) {
    const ballSize = getRandomArray(size).map((a) => Math.floor(a * 20) + 5);
    const balls = ballSize.map((n) => new Ball(n, (Math.random() * 0xffffff) << 0));

    balls.forEach((ball) => ball.resetPosition());
    balls.forEach((ball) => ball.resetSpeed());

    return balls;
  }
}
