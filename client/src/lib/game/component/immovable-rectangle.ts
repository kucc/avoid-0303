import Component from "./component";
import Rectangle from "./rectangle";

export default class ImmovableRectangle extends Rectangle {
  public constructor(width: number, height: number, color: number) {
    super(width, height, color);
  }

  public update() {}

  public isCollided(target: Component<any>): boolean {
    return false;
  }

  public onCollide(target: Component<any>) {}
}
