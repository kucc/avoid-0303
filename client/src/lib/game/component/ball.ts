import * as PIXI from "pixi.js";
import { getDistance } from "../../distance";
import elasticCollision from "../reaction/elastic-collision";
import updateRandomly from "../reaction/random-update";
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
    elasticCollision.bind(this)();
  }

  public setUpdate(update: () => void) {
    this.update = update;
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

  public onCollide(target: Component<any>) {
    if (target instanceof Ball) {
      const e = [this.xSpeed, this.ySpeed];
      const dist = getDistance(target.x, this.x, target.y, this.y);
      const n = [(this.x - target.x) / dist, (this.y - target.y) / dist];
      const edn = -e[0] * n[0] - e[1] * n[1];
      const result = [n[0] * edn * 2 + e[0], n[1] * edn * 2 + e[1]];
      this.xSpeed = result[0];
      this.ySpeed = result[1];
    }
  }
}
