import { HEIGHT, WIDTH } from "../../../constant";

export default function updateRandomly() {
  if (
    this.x > WIDTH + this.radius ||
    this.x < -this.radius ||
    this.y > HEIGHT + this.radius ||
    this.y < -this.radius
  ) {
    this.resetSpeed();
    this.resetPosition();
  }
  this.move(this.xSpeed, this.ySpeed);
}
