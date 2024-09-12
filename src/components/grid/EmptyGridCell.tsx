const EmptyGridCell = (
  x: number,
  y: number,
  canAddObstacle: boolean,
  handleAddObstacle: (x: number, y: number, d: number) => void,
) => {
  if (!canAddObstacle) {
    return <td key={`cell-${x}-${y}`} id={`cell-${x}-${y}`} className='border border-purple-200 w-8 h-8' />;
  }

  return (
    <td
      id={`cell-${x}-${y}`}
      className='border border-purple-200 w-8 h-8 cursor-pointer hover:bg-fuchsia-200 hover:border-b-4 hover:border-b-fuchsia-400'
      onClick={() => handleAddObstacle(x, y, 2)} // Obstacle faces south by default
      title='Add obstacle'
    />
  );
};

export default EmptyGridCell;
