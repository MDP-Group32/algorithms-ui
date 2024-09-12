const RobotGridCell = (x: number, y: number, type: 'camera' | 'body') => {
  return (
    <td
      key={`cell-${x}-${y}`}
      id={`cell-${x}-${y}`}
      className={`border-2 border-indigo-600 w-8 h-8 align-middle text-center ${
        type === 'camera' ? 'bg-emerald-300' : 'bg-cyan-300'
      }`}
    />
  );
};

export default RobotGridCell;