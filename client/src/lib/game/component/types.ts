import { Circle, Rectangle } from "pixi.js";

export interface CircleMeta {
  radius: number;
  color: number;
}

export interface RectanglerMeta {
  width: number;
  height: number;
  color: number;
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
