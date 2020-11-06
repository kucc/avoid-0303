import { getRandomHexColor } from "../../color";
import ImmovableRectangle from "../component/immovable-rectangle";

export default class GameMap {
  public walls: ImmovableRectangle[];
  public width: number;
  public height: number;

  public constructor(mapMeta: any) {
    this.width = mapMeta.width;
    this.height = mapMeta.height;

    this.walls = mapMeta.walls.map((m) => {
      const ir = new ImmovableRectangle(m.width, m.height, getRandomHexColor());
      ir.position.x = m.x;
      ir.position.y = m.y;
      return ir;
    });
  }
}
