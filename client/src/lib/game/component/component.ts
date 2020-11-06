import * as PIXI from "pixi.js";
import { ComponentMeta } from "./types";

export default abstract class Component<T> extends PIXI.Sprite {
  public constructor(componentMeta: ComponentMeta<T>) {
    super(componentMeta.texture);
    this.initilaize(componentMeta);
  }

  protected abstract initilaize(componentMeta: ComponentMeta<T>): void;
  public abstract update(): void;
  public abstract isCollided(target: Component<any>): boolean;
  public abstract onCollide(target: Component<any>): void;

  public move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }
}
