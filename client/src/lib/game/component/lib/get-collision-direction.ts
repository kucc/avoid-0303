import Circle from "../circle";
import Component from "../component";
import Rectangle from "../rectangle";

export const getCollisionDirectionOfRectangle = (a: Component<any>, b: Component<any>) => {
  if (
    (a instanceof Circle && b instanceof Rectangle) ||
    (a instanceof Rectangle && b instanceof Circle)
  ) {
    let c, r;
    if (a instanceof Circle) {
      c = a;
      r = b;
    } else {
      c = b;
      r = a;
    }
  } else if (a instanceof Rectangle && b instanceof Rectangle) {
    let a_bottom = a.y + a.height;
    let b_bottom = b.y + b.height;
    let a_right = a.x + a.width;
    let b_right = b.x + b.width;

    let b_collision = b_bottom - a.y;
    let t_collision = a_bottom - b.y;
    let l_collision = a_right - b.x;
    let r_collision = b_right - a.x;

    if (t_collision <= b_collision && t_collision <= l_collision && t_collision <= r_collision) {
      return "top";
    }
    if (b_collision <= t_collision && b_collision <= l_collision && b_collision <= r_collision) {
      return "bottom";
    }
    if (l_collision <= r_collision && l_collision <= t_collision && l_collision <= b_collision) {
      return "left";
    }
    if (r_collision <= l_collision && r_collision <= t_collision && r_collision <= b_collision) {
      return "right";
    }
  }
};
