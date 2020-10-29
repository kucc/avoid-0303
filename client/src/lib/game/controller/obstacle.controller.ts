import Component from "../component/component";

export default class ObstacleController {
  public obstacles: Component<any>[];

  public constructor(obstacles?: Component<any>[]) {
    this.obstacles = obstacles ? obstacles : [];
  }

  public setObstacle(obstacles: Component<any>[]) {
    this.obstacles = obstacles;
  }

  public addObstacle(obstacle: Component<any>) {
    this.obstacles.push(obstacle);
  }

  public update() {
    this.obstacles.forEach((o) => o.update());
  }

  public checkCollision(target: Component<any>) {
    return this.obstacles.some((o) => o.isCollided(target));
  }
}
