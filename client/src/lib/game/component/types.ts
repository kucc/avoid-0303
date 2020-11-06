import { Circle, Rectangle, Texture } from "pixi.js";

export interface CircleMeta {
  radius: number;
  color: number;
  texture: Texture;
}

export interface RectanglerMeta {
  width: number;
  height: number;
  color: number;
  texture: Texture;
}

export interface OvalMeta {
  longAxis: number;
  shortAxis: number;
  color: string;
}

export type ComponentMeta<T> = T extends Circle
  ? CircleMeta
  : T extends Rectangle
  ? RectanglerMeta
  : never;
