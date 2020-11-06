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

    const gameOverTexture = PIXI.Texture.from("/images/surprise-inmyeon.png");
    const surprise = new PIXI.Sprite(gameOverTexture);
    surprise.width = WIDTH * 3;
    surprise.height = HEIGHT * 3;
    surprise.x = -WIDTH;
    surprise.y = -HEIGHT;
    // generate obstacles

    const balls = this.createRandomCollideBalls(15);
    this.stage.addChild(...balls);
    this.obstacleController = new ObstacleController(balls);

    // create character

    const gameOverText = new PIXI.Text("GAME OVER", new PIXI.TextStyle({ fontSize: 50 }));
    const WinText = new PIXI.Text("WIN", new PIXI.TextStyle({ fontSize: 50 }));

    gameOverText.position.x = WIDTH / 2;
    gameOverText.position.y = HEIGHT / 2;
    WinText.position.x = WIDTH / 2;
    WinText.position.y = HEIGHT / 2;

    const characterTexture = PIXI.Texture.from("/images/swim-right-1.png");
    const character = new Character(100, 40, getRandomHexColor(), 3.5, characterTexture);
    this.stage.addChild(character);
    this.obstacleController.addObstacle(character);

    const gameMap = new GameMap(stage1);
    this.stage.addChild(...gameMap.walls);
    gameMap.walls.forEach((a) => this.obstacleController.addObstacle(a));

    const enemies = this.createRandomEnemy(7);
    this.stage.addChild(...enemies);
    enemies.forEach((e) => this.obstacleController.addObstacle(e));

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

      this.stage.pivot.x = WIDTH / 2;
      this.stage.position.x = WIDTH / 2;

      while (this.stage.children[0]) this.stage.removeChild(this.stage.children[0]);
      this.stage.addChild(surprise);
    };

    character.stopGame = stopGame;

    main();
  }

  private createRandomCollideBalls(count: number) {
    const ballSize = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);
    const textureName = [
      "/images/ball-log-left.png",
      "/images/ball-tire-left.png",
      "/images/ball-bomb-left.png",
      "/images/ball-hyunchae-left.png",
    ];
    const textures = textureName.map((t) => PIXI.Texture.from(t));
    const balls = ballSize.map(
      (n, i) => new RandomCollideBall(100, getRandomHexColor(), textures[i]),
    );

    balls.forEach((ball) => ball.resetPosition());
    balls.forEach((ball) => ball.resetSpeed());

    return balls;
  }

  private createRandomImmutableBox(count: number) {
    const boxWidth = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);
    const boxHeight = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);
    const rightInmyeonTexture = PIXI.Texture.from("/images/surpriseinmyeon-right-1.png");

    const boxes = boxHeight.map(
      (_, i) =>
        new ImmovableRectangle(boxWidth[i], boxHeight[i], getRandomHexColor(), rightInmyeonTexture),
    );

    boxes.forEach((b) => b.resetPosition());

    return boxes;
  }

  private createRandomEnemy(count: number) {
    const boxWidth = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);
    const boxHeight = getRandomArray(count).map((a) => Math.floor(a * 20) + 5);

    const rightInmyeonTexture = PIXI.Texture.from("/images/inmyeon-right-1.png");
    const enemies = getRandomArray(count).map(
      (_, i) => new Enemy(400, 200, getRandomHexColor(), rightInmyeonTexture),
    );

    enemies.forEach((e, i) => e.setSpeed(1.5));
    enemies.forEach((e, i) => e.setY(i * 100 - 50));

    return enemies;
  }
}
