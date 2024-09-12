import { Obstacle } from "./obstacle";

export interface AlgorithmServerRequest {
  value: {
    obstacles: Obstacle[];
  };
  server_mode: "simulator";
  algo_type: "Exhaustive Astar";
}

export interface AlgorithmServerResponse {
  positions: {
    x: number; // in 5cm increments
    y: number; // in 5cm increments
    theta: number; // in radians (positive from 0 to 2 PI), East = 0 radian
  }[];
  runtime: string;
}