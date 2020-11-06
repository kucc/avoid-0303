import { KeyState } from "../../type";
import Component from "../component/component";
import Rectangle from "../component/rectangle";

export default class Character extends Rectangle {
  public stuck: boolean;
  public movable: number;
  public keyState: KeyState;
  public speed: number;

  public constructor(width: number, height: number, color: number, initialSpeed: number) {
    super(width, height, color);
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

  public onCollide(t: Component<any>) {
    console.log("collide");
  }

  public update() {
    if (!this.movable) return;
    if (this.stuck) return;

    this.move(
      this.speed * (this.keyState.right ? 1 : 0 - (this.keyState.left ? 1 : 0)),
      this.speed * (this.keyState.down ? 1 : 0 - (this.keyState.up ? 1 : 0)),
    );
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
}
