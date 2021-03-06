import { Texture } from "pixi.js";
import Rectangle from "../component/rectangle";

export default class Enemy extends Rectangle {
  public xSpeed: number;
  public baseY: number;
  public constructor(width: number, height: number, color: number, texture: Texture) {
    super(width, height, color, texture);
    this.position.x = -600;
  }

  public setSpeed(x: number) {
    this.xSpeed = x;
  }

  public setY(y: number) {
    this.baseY = y;
  }

  onCollide() {
    return;
  }

  update() {
    this.move(this.xSpeed, 0);
    this.y = this.baseY + Math.sin(Date.now() / 200) * 50;
  }
}
