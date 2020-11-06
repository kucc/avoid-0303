import * as PIXI from "pixi.js";
import { HEIGHT, WIDTH } from "../../../constant";
import { getEuclideanDistance } from "../../distance";
import elasticCollision from "../reaction/elastic-collision";
import Circle from "./circle";
import Component from "./component";
import ImmovableRectangle from "./immovable-rectangle";

export default class RandomCollideBall extends Circle {
  public constructor(radius: number, color: number) {
    super(radius, color);
  }

  public onCollide(t: Component<any>) {
    if (t instanceof Circle) {
      const e = [this.xSpeed, this.ySpeed];
      const dist = getEuclideanDistance(t.x, this.x, t.y, this.y);
      const n = [(this.x - t.x) / dist, (this.y - t.y) / dist];
      const edn = -e[0] * n[0] - e[1] * n[1];
      const result = [n[0] * edn * 2 + e[0], n[1] * edn * 2 + e[1]];
      this.xSpeed = result[0];
      this.ySpeed = result[1];
    }

    if (t instanceof ImmovableRectangle) {
      // TODO
    }
  }

  public update() {
    elasticCollision.bind(this)();
  }
}
