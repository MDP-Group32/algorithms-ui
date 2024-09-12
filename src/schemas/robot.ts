/** Bottmom left of robot */
export interface Position {
  x: number;
  y: number;
  theta: number;
}

export enum RobotDirection {
  N = "North",
  S = "South",
  E = "East",
  W = "West",
}

/** Robot turning in an arc */
export enum TurnDirection {
  Clockwise = "Clockwise",
  Anticlockwise = "Anti-Clockwise",
}
