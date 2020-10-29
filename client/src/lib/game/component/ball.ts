import * as PIXI from "pixi.js";
import { getDistance } from "../../distance";
import Component from "./component";
import { ComponentMeta } from "./types";

export default class Ball extends Component<PIXI.Circle> {
  public xSpeed: number;
  public ySpeed: number;
  public radius: number;

  public constructor(radius: number, color: number) {
    super({ radius, color });

    this.xSpeed = 0;
    this.ySpeed = 0;
    this.radius = radius;
  }

  protected initilaize(meta: ComponentMeta<PIXI.Circle>) {
    this.beginFill(meta.color);
    this.drawCircle(0, 0, meta.radius);
    this.endFill();
  }

  public move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  public update() {
    this.move(this.xSpeed, this.ySpeed);
    if (
      this.x > 700 + this.radius ||
      this.x < -this.radius ||
      this.y > 400 + this.radius ||
      this.y < -this.radius
    ) {
      this.resetSpeed();
      this.resetPosition();
    }
  }

  public setSpeed(x: number, y: number) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  public resetPosition() {
    this.position.set(Math.random() * 700, Math.random() * 400);
  }

  public resetSpeed() {
    this.setSpeed((1 - 2 * Math.random()) * 3, (1 - 2 * Math.random()) * 3);
  }

  public isCollided(target: Component<any>): boolean {
    if (target instanceof Ball) {
      return this.isBallCollided(target);
    }
  }

  private isBallCollided(target: Ball): boolean {
    return getDistance(target.x, this.x, target.y, this.y) <= target.radius + this.radius;
  }
}
