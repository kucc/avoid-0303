import { getRandomHexColor } from "../../color";
import ImmovableRectangle from "../component/immovable-rectangle";

import * as PIXI from "pixi.js";

export default class GameMap {
  public walls: ImmovableRectangle[];
  public width: number;
  public height: number;

  public constructor(mapMeta: any) {
    this.width = mapMeta.width;
    this.height = mapMeta.height;

    const grayTexture = PIXI.Texture.from("/images/gray.png");
    const blackTexture = PIXI.Texture.from("/images/black.png");
    this.walls = mapMeta.walls.map((m, i) => {
      const ir = new ImmovableRectangle(m.width, m.height, getRandomHexColor(), blackTexture);
      ir.position.x = m.x;
      ir.position.y = m.y;
      return ir;
    });
  }
}
