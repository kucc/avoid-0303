export default function updateRandomly() {
  if (
    this.x > 700 + this.radius ||
    this.x < -this.radius ||
    this.y > 400 + this.radius ||
    this.y < -this.radius
  ) {
    this.resetSpeed();
    this.resetPosition();
  }
  this.move(this.xSpeed, this.ySpeed);
}
