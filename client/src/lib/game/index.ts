import * as PIXI from "pixi.js";
import { getRandomArray } from "../array";
import { getRandomHexColor } from "../color";
import ImmovableRectangle from "./component/immovable-rectangle";
import RandomCollideBall from "./component/random-collide-ball";
import ObstacleController from "./controller/obstacle.controller";
import Character from "./unit/character";

export default class Game extends PIXI.Application {
  private obstacleController: ObstacleController;

  private container: PIXI.Container;

  public constructor() {
    super({
      width: 1000,
      height: 600,
      backgroundColor: 0x1099bb,
    });

    this.container = new PIXI.Container();
    this.stage.addChild(this.container);

    const balls = this.createRandomCollideBalls(10);
    const boxes = this.createRandomImmutableBox(10);

    // generate obstacles
    this.stage.addChild(...balls);
    this.stage.addChild(...boxes);

    this.obstacleController = new ObstacleController(balls);
    boxes.forEach((b) => this.obstacleController.addObstacle(b));

    // create character

    const character = new Character(50, 50, getRandomHexColor(), 2);
    this.stage.addChild(character);
    this.obstacleController.addObstacle(character);

    window.addEventListener("keydown", character.onKeyDown.bind(character));
    window.addEventListener("keyup", character.onKeyUp.bind(character));

    const main = () => {
      this.obstacleController.update();

      requestAnimationFrame(main);
    };

    main();
  }

  private createRandomCollideBalls(count: number) {
    const ballSize = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);
    const balls = ballSize.map((n) => new RandomCollideBall(n, getRandomHexColor()));

    balls.forEach((ball) => ball.resetPosition());
    balls.forEach((ball) => ball.resetSpeed());

    return balls;
  }

  private createRandomImmutableBox(count: number) {
    const boxWidth = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);
    const boxHeight = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);

    const boxes = boxHeight.map(
      (_, i) => new ImmovableRectangle(boxWidth[i], boxHeight[i], getRandomHexColor()),
    );

    boxes.forEach((b) => b.resetPosition());

    return boxes;
  }
}
