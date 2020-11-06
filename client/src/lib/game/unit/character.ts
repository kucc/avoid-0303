import { Texture } from "pixi.js";
import { HEIGHT, WIDTH } from "../../../constant";
import { KeyState } from "../../type";
import Circle from "../component/circle";
import Component from "../component/component";
import { getCollisionDirectionOfRectangle } from "../component/lib/get-collision-direction";
import Rectangle from "../component/rectangle";
import Enemy from "./enemy";
import GameMap from "./map";

export default class Character extends Rectangle {
  public stuck: boolean;
  public movable: number;
  public keyState: KeyState;
  public speed: number;
  public stage: any;
  public currentMap: GameMap;
  public stopGame: () => void;
  public stopped: boolean;

  public constructor(
    width: number,
    height: number,
    color: number,
    initialSpeed: number,
    texture: Texture,
  ) {
    super(width, height, color, texture);
    this.speed = initialSpeed;
    this.movable = 0;
    this.stuck = false;

    this.keyState = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  public setCurrentMap(g: GameMap) {
    this.currentMap = g;
  }

  public onCollide(t: Component<any>) {
    if (t instanceof Enemy) {
      if (this.stopGame)
        if (!this.stopped) {
          this.stopped = true;
          this.stopGame();
        }
      return;
    }

    if (t instanceof Rectangle) {
      const direction = getCollisionDirectionOfRectangle(this, t);

      switch (direction) {
        case "left":
          this.keyState.right = false;
          break;
        case "right":
          this.keyState.left = false;
          break;
        case "bottom":
          this.keyState.up = false;
          break;
        case "top":
          this.keyState.down = false;
      }
    }

    if (t instanceof Circle) {
      this.onBlur();
    }
  }

  public update() {
    if (!this.movable) return;
    if (this.stuck) return;

    this.move(
      this.speed * (this.keyState.right ? 1 : 0 - (this.keyState.left ? 1 : 0)),
      this.speed * (this.keyState.down ? 1 : 0 - (this.keyState.up ? 1 : 0)),
    );

    this.moveCamera();
  }

  public onKeyDown(e) {
    switch (e.keyCode) {
      case 38: // up
        this.keyState.up = true;
        break;
      case 40: // down
        this.keyState.down = true;
        break;
      case 37: // left
        this.keyState.left = true;
        break;
      case 39: // right
        this.keyState.right = true;
        break;
    }
    this.movable += 1;
  }

  public onKeyUp(e) {
    switch (e.keyCode) {
      case 38: // up
        this.keyState.up = false;
        break;
      case 40: // down
        this.keyState.down = false;
        break;
      case 37: // left
        this.keyState.left = false;
        break;
      case 39: // right
        this.keyState.right = false;
        break;
    }
    this.movable -= 1;
  }

  public onBlur() {
    this.keyState = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
  }

  private moveCamera() {
    if (this.position.x < WIDTH / 2) return;
    this.stage.pivot.x = this.position.x;
    // this.stage.pivot.y = this.position.y;
    this.stage.position.x = WIDTH / 2;
    // this.stage.position.y = HEIGHT / 2;
  }
}
