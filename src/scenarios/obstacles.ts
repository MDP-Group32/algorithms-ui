import { Obstacle, ObstacleDirection } from '@/schemas/obstacle';

export const uTurnObstacles: Obstacle[] = [{ id: 1, x: 11, y: 2, d: ObstacleDirection.N }];

export const collisionCourseAObstacles: Obstacle[] = [
  { id: 1, x: 1, y: 13, d: ObstacleDirection.S },
  { id: 2, x: 7, y: 13, d: ObstacleDirection.W },
];

export const collisionCourseBObstacles: Obstacle[] = [
  { id: 1, x: 10, y: 15, d: ObstacleDirection.S },
  { id: 2, x: 10, y: 7, d: ObstacleDirection.N },
];

export const collisionCourseCObstacles: Obstacle[] = [
  { id: 1, x: 9, y: 5, d: ObstacleDirection.W },
  { id: 2, x: 9, y: 9, d: ObstacleDirection.E },
  { id: 2, x: 17, y: 7, d: ObstacleDirection.W },
];

export const cornersObstacles: Obstacle[] = [
  { id: 1, x: 1, y: 18, d: ObstacleDirection.E },
  { id: 2, x: 18, y: 18, d: ObstacleDirection.S },
  { id: 3, x: 18, y: 1, d: ObstacleDirection.W },
];

export const vCourseObstacles: Obstacle[] = [
  { id: 1, x: 2, y: 18, d: ObstacleDirection.S },
  { id: 2, x: 10, y: 2, d: ObstacleDirection.N },
  { id: 3, x: 18, y: 18, d: ObstacleDirection.S },
];

export const customObstacles: Obstacle[] = [];

export const twoObstacles: Obstacle[] = [
  { id: 1, x: 15, y: 10, d: ObstacleDirection.W },
  { id: 2, x: 1, y: 18, d: ObstacleDirection.S },
];

export const fiveObstacles: Obstacle[] = [
  { id: 1, x: 7, y: 19, d: ObstacleDirection.S },
  { id: 2, x: 6, y: 2, d: ObstacleDirection.N },
  { id: 3, x: 1, y: 15, d: ObstacleDirection.S },
  { id: 4, x: 18, y: 12, d: ObstacleDirection.W },
  { id: 5, x: 18, y: 6, d: ObstacleDirection.W },
];

export const sevenObstacles: Obstacle[] = [
  { id: 1, x: 1, y: 10, d: ObstacleDirection.N },
  { id: 2, x: 9, y: 8, d: ObstacleDirection.W },
  { id: 3, x: 6, y: 1, d: ObstacleDirection.E },
  { id: 4, x: 1, y: 18, d: ObstacleDirection.E },
  { id: 5, x: 18, y: 18, d: ObstacleDirection.S },
  { id: 6, x: 18, y: 0, d: ObstacleDirection.N },
  { id: 7, x: 12, y: 17, d: ObstacleDirection.S },
];

export const eightObstacles: Obstacle[] = [
  { id: 1, x: 1, y: 10, d: ObstacleDirection.N },
  { id: 2, x: 9, y: 8, d: ObstacleDirection.W },
  { id: 3, x: 6, y: 1, d: ObstacleDirection.E },
  { id: 4, x: 1, y: 18, d: ObstacleDirection.E },
  { id: 5, x: 18, y: 18, d: ObstacleDirection.S },
  { id: 6, x: 18, y: 0, d: ObstacleDirection.N },
  { id: 7, x: 12, y: 17, d: ObstacleDirection.S },
  { id: 7, x: 18, y: 7, d: ObstacleDirection.S },
];

export const mockCourseObstacles: Obstacle[] = [
  { id: 1, x: 5, y: 9, d: ObstacleDirection.S },
  { id: 2, x: 7, y: 14, d: ObstacleDirection.W },
  { id: 3, x: 12, y: 9, d: ObstacleDirection.E },
  { id: 4, x: 15, y: 4, d: ObstacleDirection.W },
  { id: 5, x: 15, y: 15, d: ObstacleDirection.S },
];
