import { GRID_TOTAL_HEIGHT, GRID_TOTAL_WIDTH } from '@/constants';
import { Obstacle } from '@/schemas/obstacle';
import { Position } from '@/schemas/robot';
import RobotGridCell from './RobotGridCell';
import ObstacleGridCell from './ObstacleGridCell';
import EmptyGridCell from './EmptyGridCell';
import { getCameraOffset, isRobotOccupyingCell } from '@/utils/grid.utils';

/**
 * Creates a grid of React Nodes representing the Robot, Obstacles and Empty Cells
 * @returns React.ReactNode[][] - `<td />[][]`
 * */
export const Grid = (
  robotPosition: Position,
  obstacles: Obstacle[],
  canAddObstacle: boolean,
  handleAddObstacle: (x: number, y: number, d: number) => void,
  handleChangeObstacleDirection: (x: number, y: number, new_d: number) => void,
) => {
  const grid: React.ReactNode[][] = [];

  for (let y = GRID_TOTAL_HEIGHT - 1; y >= 0; y--) {
    const currentRow: React.ReactNode[] = [];

    for (let x = 0; x < GRID_TOTAL_WIDTH; x++) {
      // Robot Cell
      if (isRobotOccupyingCell(robotPosition, x, y)) {
        currentRow.push(
          RobotGridCell(
            x,
            y,
            x === robotPosition.x + getCameraOffset(robotPosition.theta)[0] &&
            y === robotPosition.y + getCameraOffset(robotPosition.theta)[1]
              ? 'camera'
              : 'body',
          ),
        );
      } else {
        const obstacle = obstacles.find((obstacle) => obstacle.x === x && obstacle.y === y);
        // Obstacle Cell
        if (obstacle) {
          currentRow.push(
            ObstacleGridCell(
              x,
              y,
              obstacle.d,
              canAddObstacle,
              handleChangeObstacleDirection,
            ),
          );
        }
        // Empty Cell
        else {
          currentRow.push(EmptyGridCell(x, y, canAddObstacle, handleAddObstacle));
        }
      }
    }
    grid.push(currentRow);
  }
  return grid;
};