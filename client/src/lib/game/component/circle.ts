import * as PIXI from "pixi.js";
import { HEIGHT, WIDTH } from "../../../constant";
import { getEuclideanDistance } from "../../distance";
import elasticCollision from "../reaction/elastic-collision";
import Component from "./component";
import ImmovableRectangle from "./immovable-rectangle";
import { ComponentMeta } from "./types";

export default abstract class Circle extends Component<PIXI.Circle> {
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

  public setUpdate(update: () => void) {
    this.update = update;
  }

  public setSpeed(x: number, y: number) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  public resetPosition() {
    this.position.set(Math.random() * WIDTH, Math.random() * HEIGHT);
  }

  public resetSpeed() {
    this.setSpeed((1 - 2 * Math.random()) * 3, (1 - 2 * Math.random()) * 3);
  }

  public isCollided(target: Component<any>): boolean {
    if (target instanceof Circle) {
      return this.isBallCollided(target);
    } else if (target instanceof ImmovableRectangle) {
      return this.isRectangularCollided(target);
    }
  }

  private isBallCollided(target: Circle): boolean {
    return getEuclideanDistance(target.x, this.x, target.y, this.y) <= target.radius + this.radius;
  }

  private isRectangularCollided(t: ImmovableRectangle): boolean {
    const corners = [
      [t.x, t.y],
      [t.x + t.width, t.y],
      [t.x, t.y + t.height],
      [t.x + t.height, t.y + t.height],
    ];

    return false; // TODO
  }
}
