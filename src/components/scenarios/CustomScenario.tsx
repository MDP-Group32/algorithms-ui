import { Obstacle, ObstacleDirectionToString } from '@/schemas/obstacle';
import { FaCircle } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

interface CustomScenarioProps {
  obstacle: Obstacle;
  setObstacles: React.Dispatch<React.SetStateAction<Obstacle[]>>;
}

const CustomScenario = (props: CustomScenarioProps) => {
  const { setObstacles, obstacle } = props;
  const { x, y, d } = obstacle;

  const handleRemoveObstacle = () => {
    setObstacles((obstacles) => {
      const cleanedObstacles = obstacles.filter(
        (obstacle) => !(obstacle.x === obstacle.x && obstacle.y === obstacle.y)
      );

      return cleanedObstacles;
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 font-bold">
      <FaCircle className="text-[8px]" />
      <span>X: {x},</span>
      <span>Y: {y},</span>
      <span>Face: {ObstacleDirectionToString[d]}</span>
      <MdDelete
        title="Remove"
        className="text-[20px] hover:text-red-600 cursor-pointer"
        onClick={handleRemoveObstacle}
      />
    </div>
  );
};

export default CustomScenario;
