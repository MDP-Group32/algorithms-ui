import { ROBOT_GRID_WIDTH, ROBOT_GRID_HEIGHT } from '@/constants';
import { RobotDirection } from '@/schemas/robot';
import { Position } from '@/schemas/robot';
import { convertThetaToDirection } from '@/utils/conversions.utils';


/**
 * Used Bottom Left of Robot's Body as Robot's current (x, y) position.
 * Converts a Robot's Theta rotation to the associated Camera Offset on the grid
 * Example: If robot's facing North, and robot at (0,0) we need to add offset +(1,2)
 * @returns (x, y) offset of the robot's camera from the bottom left corner of the robot
 */
export const getCameraOffset = (theta: number) => {
  const robotDirection = convertThetaToDirection(theta);
  switch (robotDirection) {
    case RobotDirection.N:
      return [1, 2];
    case RobotDirection.S:
      return [-1, -2];
    case RobotDirection.E:
      return [2, -1];
    case RobotDirection.W:
      return [-2, 1];
    default:
      return [0, 0];
  }
};

/**
 * Return true if current cell is occupied by a Robot based on it's (x, y) position and facing.
 * Robot is 3 * 3 on grid.
 */
export const isRobotOccupyingCell = (robotPosition: Position, cell_x: number, cell_y: number) => {
  const robotDirection: RobotDirection = convertThetaToDirection(robotPosition.theta);

  const withinXRange = (start: number, end: number) => start <= cell_x && cell_x <= end;
  const withinYRange = (start: number, end: number) => start <= cell_y && cell_y <= end;

  switch (robotDirection) {
    case RobotDirection.N:
      return (
        withinXRange(robotPosition.x, robotPosition.x + (ROBOT_GRID_WIDTH - 1)) &&
        withinYRange(robotPosition.y, robotPosition.y + (ROBOT_GRID_HEIGHT - 1))
      );
    case RobotDirection.S:
      return (
        withinXRange(robotPosition.x - (ROBOT_GRID_WIDTH - 1), robotPosition.x) &&
        withinYRange(robotPosition.y - (ROBOT_GRID_HEIGHT - 1), robotPosition.y)
      );
    case RobotDirection.E:
      return (
        withinXRange(robotPosition.x, robotPosition.x + (ROBOT_GRID_WIDTH - 1)) &&
        withinYRange(robotPosition.y - (ROBOT_GRID_HEIGHT - 1), robotPosition.y)
      );
    case RobotDirection.W:
      return (
        withinXRange(robotPosition.x - (ROBOT_GRID_WIDTH - 1), robotPosition.x) &&
        withinYRange(robotPosition.y, robotPosition.y + (ROBOT_GRID_HEIGHT - 1))
      );
    default:
      return false;
  }
};