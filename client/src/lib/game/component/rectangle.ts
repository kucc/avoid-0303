import * as PIXI from "pixi.js";
import { HEIGHT, WIDTH } from "../../../constant";
import Circle from "./circle";
import Component from "./component";
import { ComponentMeta } from "./types";

export default abstract class Rectangle extends Component<PIXI.Rectangle> {
  public constructor(width: number, height: number, color: number, texture: PIXI.Texture) {
    super({ width, height, color, texture });
  }

  protected initilaize(meta: ComponentMeta<PIXI.Rectangle>) {
    this.width = meta.width;
    this.height = meta.height;
  }

  public resetPosition() {
    this.position.set(Math.random() * WIDTH, Math.random() * HEIGHT);
  }

  public setPosition(x: number, y: number) {
    this.position.set(x, y);
  }

  public isCollided(t: Component<any>): boolean {
    if (t instanceof Rectangle) {
      return this.isRectangleCollided(t);
    } else if (t instanceof Circle) {
      return this.isCircleCollided(t);
    }
  }

  public isRectangleCollided(r: Rectangle): boolean {
    return (
      r.x < this.x + this.width &&
      r.x + r.width > this.x &&
      r.y < this.y + this.height &&
      r.y + r.height > this.y
    );
  }

  public isCircleCollided(c: Circle): boolean {
    let testX = c.x;
    let testY = c.y;

    if (c.x < this.x) testX = this.x;
    else if (c.x > this.x + this.width) testX = this.x + this.width; // right edge
    if (c.y < this.y) testY = this.y;
    else if (c.y > this.y + this.height) testY = this.y + this.height; // bottom edge

    let distX = c.x - testX;
    let distY = c.y - testY;
    let distance = Math.sqrt(distX * distX + distY * distY);

    return distance <= c.radius;
  }
}
