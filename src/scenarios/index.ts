import { collisionCourseAObstacles, collisionCourseBObstacles, collisionCourseCObstacles, cornersObstacles, customObstacles, eightObstacles, fiveObstacles, mockCourseObstacles, sevenObstacles, twoObstacles, uTurnObstacles, vCourseObstacles } from './obstacles';

export enum ScenarioEnum {
  U_TURN = "U-Turn",
  COLLISION_A = "Collision Course A",
  COLLISION_B = "Collision Course B",
  COLLISION_C = "Collision Course C",
  CORNERS = "Corners Course",
  V_SHAPE = "V Shape",
  CUSTOM = "Custom Course",
  TWO_OBSTACLES = "Two Obstacles",
  FIVE_OBSTACLES = "5 Obstacles",
  SEVEN_OBSTACLES = "7 Obstacles",
  EIGHT_OBSTACLES = "8 Obstacles",
  MOCK_OBSTACLE_COURSE = "Mock Obstacle Course",
}

export const scenariosList = Object.values(ScenarioEnum);

export const ScenarioToObstaclesMap = {
  [ScenarioEnum.U_TURN]: uTurnObstacles,
  [ScenarioEnum.COLLISION_A]: collisionCourseAObstacles,
  [ScenarioEnum.COLLISION_B]: collisionCourseBObstacles,
  [ScenarioEnum.COLLISION_C]: collisionCourseCObstacles,
  [ScenarioEnum.CORNERS]: cornersObstacles,
  [ScenarioEnum.V_SHAPE]: vCourseObstacles,
  [ScenarioEnum.CUSTOM]: customObstacles,
  [ScenarioEnum.TWO_OBSTACLES]: twoObstacles,
  [ScenarioEnum.SEVEN_OBSTACLES]: sevenObstacles,
  [ScenarioEnum.FIVE_OBSTACLES]: fiveObstacles,
  [ScenarioEnum.EIGHT_OBSTACLES]: eightObstacles,
  [ScenarioEnum.MOCK_OBSTACLE_COURSE]: mockCourseObstacles,
};
