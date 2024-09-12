import { ObstacleDirection } from '@/schemas/obstacle';

const ObstacleGridCell = (
  x: number,
  y: number,
  direction: ObstacleDirection,
  canChangeObstacleDirection: boolean,
  handleChangeObstacleDirection: (x: number, y: number, new_d: number) => void,
) => {
  const directionClassMap = {
    [ObstacleDirection.N]: 'border-t-4 border-t-fuchsia-400',
    [ObstacleDirection.S]: 'border-b-4 border-b-fuchsia-400',
    [ObstacleDirection.E]: 'border-r-4 border-r-fuchsia-400',
    [ObstacleDirection.W]: 'border-l-4 border-l-fuchsia-400',
  };

  const imageFaceBorderClassName = directionClassMap[direction] || '';

  return (
    <td
      key={`cell-${x}-${y}`}
      id={`cell-${x}-${y}`}
      className={`border border-fuchsia-400 w-8 h-8 align-middle text-center bg-fuchsia-200 ${imageFaceBorderClassName} ${
        canChangeObstacleDirection ? 'cursor-pointer hover:bg-fuchsia-600' : ''
      }`}
      {...(canChangeObstacleDirection && {
        title: 'Change obstacle direction',
        onClick: () => handleChangeObstacleDirection(x, y, (direction.valueOf() % 4) + 1),
      })}
    />
  );
};

export default ObstacleGridCell;
