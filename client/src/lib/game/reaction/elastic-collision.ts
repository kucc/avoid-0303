import { HEIGHT, WIDTH } from "../../../constant";

export default function elasticCollision() {
  if (this.y + this.radius >= HEIGHT || this.y - this.radius <= 0) {
    this.ySpeed = -this.ySpeed;
  }

  if (this.x + this.radius >= 10000 || this.x - this.radius <= 0) {
    this.xSpeed = -this.xSpeed;
  }

  this.move(this.xSpeed, this.ySpeed);
}
