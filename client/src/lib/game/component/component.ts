import * as PIXI from "pixi.js";
import { ComponentMeta } from "./types";

export default abstract class Component<T> extends PIXI.Graphics {
  public constructor(componentMeta: ComponentMeta<T>) {
    super();
    this.initilaize(componentMeta);
  }

  protected abstract initilaize(componentMeta: ComponentMeta<T>): void;
  public abstract update(): void;
  public abstract isCollided(target: Component<any>): void;

  public move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }
}
