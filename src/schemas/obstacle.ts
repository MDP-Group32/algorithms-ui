export enum ObstacleDirection {
  N = 1,
  S = 2,
  E = 3,
  W = 4,
}

export interface Obstacle {
  id: number; // obstacle_id
  x: number; // grid format
  y: number; // grid format
  d: ObstacleDirection; // obstacle face direction
}

export const ObstacleDirectionToString = {
  [ObstacleDirection.N]: "North",
  [ObstacleDirection.S]: "South",
  [ObstacleDirection.E]: "East",
  [ObstacleDirection.W]: "West",
};
