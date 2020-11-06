import * as PIXI from "pixi.js";
import { HEIGHT, WIDTH } from "../../constant";
import { getRandomArray } from "../array";
import { getRandomHexColor } from "../color";
import { stage1 } from "../map";
import ImmovableRectangle from "./component/immovable-rectangle";
import RandomCollideBall from "./component/random-collide-ball";
import ObstacleController from "./controller/obstacle.controller";
import Character from "./unit/character";
import Enemy from "./unit/enemy";
import GameMap from "./unit/map";

export default class Game extends PIXI.Application {
  private obstacleController: ObstacleController;

  private container: PIXI.Container;
  private runGame: boolean;

  public constructor() {
    super({
      width: 1000,
      height: 600,
      backgroundColor: 0x1099bb,
    });

    this.container = new PIXI.Container();
    this.stage.addChild(this.container);
    this.runGame = true;

    const gameOverTexture = PIXI.BaseTexture.from("/images/surprise-inmyeon.png");
    gameOverTexture.setSize(WIDTH, HEIGHT);
    // generate obstacles

    const balls = this.createRandomCollideBalls(10);
    this.stage.addChild(...balls);
    this.obstacleController = new ObstacleController(balls);

    // create character

    const gameOverText = new PIXI.Text("GAME OVER", new PIXI.TextStyle({ fontSize: 50 }));
    const WinText = new PIXI.Text("WIN", new PIXI.TextStyle({ fontSize: 50 }));

    gameOverText.position.x = WIDTH / 2;
    gameOverText.position.y = HEIGHT / 2;
    WinText.position.x = WIDTH / 2;
    WinText.position.y = HEIGHT / 2;

    const character = new Character(50, 25, getRandomHexColor(), 3);
    this.stage.addChild(character);
    this.obstacleController.addObstacle(character);

    const gameMap = new GameMap(stage1);
    this.stage.addChild(...gameMap.walls);
    gameMap.walls.forEach((a) => this.obstacleController.addObstacle(a));

    const enemies = this.createRandomEnemy(7);
    // this.stage.addChild(...enemies);
    // enemies.forEach((e) => this.obstacleController.addObstacle(e));

    character.stage = this.stage;

    character.position.x = 50;
    character.position.y = HEIGHT / 2;

    this.stage.pivot.x = WIDTH / 2;
    this.stage.pivot.y = HEIGHT / 2;
    this.stage.position.x = WIDTH / 2;
    this.stage.position.y = HEIGHT / 2;

    window.addEventListener("keydown", character.onKeyDown.bind(character));
    window.addEventListener("keyup", character.onKeyUp.bind(character));
    window.onblur = character.onBlur.bind(character);

    const main = () => {
      if (!this.runGame) return;
      this.obstacleController.update();

      requestAnimationFrame(main);
    };

    const stopGame = () => {
      this.obstacleController.setObstacle([]);
      this.runGame = false;
      while (this.stage.children[0]) this.stage.removeChild(this.stage.children[0]);
    };

    character.stopGame = stopGame;

    main();
  }

  private createRandomCollideBalls(count: number) {
    const ballSize = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);
    const balls = ballSize.map((n) => new RandomCollideBall(30, getRandomHexColor()));

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

  private createRandomEnemy(count: number) {
    const boxWidth = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);
    const boxHeight = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);

    const enemies = getRandomArray(count).map((_, i) => new Enemy(200, 100, getRandomHexColor()));

    enemies.forEach((e, i) => e.setSpeed(1.5));
    enemies.forEach((e, i) => e.setY(i * 100 - 50));

    return enemies;
  }
}
