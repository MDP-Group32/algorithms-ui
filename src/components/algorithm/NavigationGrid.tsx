import React from 'react';
import { Position } from '@/schemas/robot';
import { Obstacle } from '@/schemas/obstacle';
import { Grid } from '../grid/Grid';
import GridAxis from '../grid/GridAxis';

interface NavigationGridProps {
  robotPosition: Position;
  obstacles: Obstacle[];
  canAddObstacle: boolean;
  setObstacles: React.Dispatch<React.SetStateAction<Obstacle[]>>;
}

export const NavigationGrid = (props: NavigationGridProps) => {
  const { robotPosition, obstacles, canAddObstacle, setObstacles } = props;

  const handleAddObstacle = (x: number, y: number, d: number) => {
    setObstacles((obstacles) => {
      const updated = [
        ...obstacles,
        {
          id: obstacles.length,
          x: x,
          y: y,
          d: d,
        },
      ];
      return updated;
    });
  };
  const handleChangeObstacleDirection = (x: number, y: number, new_d: number) => {
    setObstacles((obstacles) => {
      const obstacleToChange = obstacles.filter((o) => o.x === x && o.y === y)[0];
      const remainingObstacles = obstacles.filter((o) => o.x !== x || o.y !== y);
      const updated = [
        ...remainingObstacles,
        {
          id: obstacleToChange.id,
          x: obstacleToChange.x,
          y: obstacleToChange.y,
          d: new_d,
        },
      ];
      return updated;
    });
  };

  const grid = Grid(robotPosition, obstacles, canAddObstacle, handleAddObstacle, handleChangeObstacleDirection);
  GridAxis(grid);

  return (
    <div>
      {/* Grid */}
      <table>
        <tbody>
          {grid.map((row, rowIndex) => {
            return <tr key={rowIndex}>{row.map((column) => column)}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};
