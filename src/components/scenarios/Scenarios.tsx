import { ROBOT_GRID_WIDTH, ROBOT_GRID_HEIGHT } from '@/constants';
import { ScenarioEnum, scenariosList } from '@/scenarios';
import { Obstacle, ObstacleDirection } from '@/schemas/obstacle';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBox, FaPlus } from 'react-icons/fa';
import { SiSpeedtest } from 'react-icons/si';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import CustomScenario from './CustomScenario';
import Scenario from './Scenario';

interface ScenariosProps {
  selectedScenario: ScenarioEnum;
  setSelectedScenario: React.Dispatch<React.SetStateAction<ScenarioEnum>>;
  obstacles: Obstacle[];
  setObstacles: React.Dispatch<React.SetStateAction<Obstacle[]>>;
  setAlgoRuntime: React.Dispatch<string>; // For reseting AlgoRuntime when changing the test
}

const Scenarios = (props: ScenariosProps) => {
  const { selectedScenario, setSelectedScenario, obstacles, setObstacles, setAlgoRuntime } = props;

  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Custom Obstacle
  const [isManageObstaclesModalOpen, setIsManageObstaclesModalOpen] = useState(false);
  const [customObstacle_X, setCustomObstacle_X] = useState<number>(0);
  const [customObstacle_Y, setCustomObstacle_Y] = useState<number>(0);
  const [customObstacle_Direction, setCustomObstacle_Direction] = useState<ObstacleDirection>(ObstacleDirection.N);
  const handleAddCustomObstacle = () => {
    // Check that cell is not occupied by Robot
    if (
      0 <= customObstacle_X &&
      customObstacle_X <= ROBOT_GRID_WIDTH - 1 &&
      0 <= customObstacle_Y &&
      customObstacle_Y <= ROBOT_GRID_HEIGHT - 1
    ) {
      return toast.error('Cell is occupied by the Robot!');
    }
    // Check that cell is not occupied by existing Obstacle
    if (obstacles.filter((obstacle) => obstacle.x === customObstacle_X && obstacle.y === customObstacle_Y).length > 0) {
      return toast.error('Cell is already occupied by an Obstacle!');
    }

    const updated = [
      ...obstacles,
      {
        id: obstacles.length,
        x: customObstacle_X,
        y: customObstacle_Y,
        d: customObstacle_Direction,
      },
    ];
    setObstacles(updated);
  };

  return (
    <div className='mt-2 mb-4 flex justify-center items-center gap-2'>
      {/* Button */}
      <Button onClick={() => setIsTestModalOpen(true)}>
        <span>Select Test - {selectedScenario}</span>
        <SiSpeedtest className='w-[18px] h-[18px]' />
      </Button>

      {/* Manage Custom Obstacles */}
      {selectedScenario === ScenarioEnum.CUSTOM && (
        <Button onClick={() => setIsManageObstaclesModalOpen(true)}>
          <span>Manage Obstacles</span>
          <FaBox />
        </Button>
      )}

      {/* Manage Custom Obstacles Modal */}
      {isManageObstaclesModalOpen && (
        <Modal title='Manage Obstacles' onClose={() => setIsManageObstaclesModalOpen(false)}>
          <div className='flex flex-col justify-center items-start'>
            {/* Obstacles List with Delete */}
            {obstacles.map((obstacle) => (
              <CustomScenario key={obstacle.id} obstacle={obstacle} setObstacles={setObstacles} />
            ))}

            {/* Add Obstacle */}
            <div className='w-full flex flex-col justify-center items-center mt-4'>
              {/* Title */}
              <div className='font-bold text-[18px] mb-2'>- Add Obstacles -</div>

              {/* X */}
              <div className='flex gap-2 items-center my-2'>
                <label htmlFor='steps-range' className='font-bold'>
                  X:{' '}
                </label>
                <input
                  id='steps-range'
                  type='range'
                  min={0}
                  max={19}
                  value={customObstacle_X}
                  onChange={(e) => {
                    setCustomObstacle_X(Number(e.target.value));
                  }}
                  step={1}
                  className='w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer'
                />
                <span className='font-bold'>{customObstacle_X}</span>
              </div>

              {/* Y */}
              <div className='flex gap-2 items-center mb-2'>
                <label htmlFor='steps-range' className='font-bold'>
                  Y:{' '}
                </label>
                <input
                  id='steps-range'
                  type='range'
                  min={0}
                  max={19}
                  value={customObstacle_Y}
                  onChange={(e) => {
                    setCustomObstacle_Y(Number(e.target.value));
                  }}
                  step={1}
                  className='w-full h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer'
                />
                <span className='font-bold'>{customObstacle_Y}</span>
              </div>

              {/* Direction */}
              <div className='flex gap-2 items-center mb-4'>
                <label className='font-bold'>Direction: </label>
                <Button
                  className={`${customObstacle_Direction === ObstacleDirection.N && '!text-purple-300'}`}
                  onClick={() => setCustomObstacle_Direction(ObstacleDirection.N)}
                >
                  N
                </Button>
                <Button
                  className={`${customObstacle_Direction === ObstacleDirection.S && '!text-purple-300'}`}
                  onClick={() => setCustomObstacle_Direction(ObstacleDirection.S)}
                >
                  S
                </Button>
                <Button
                  className={`${customObstacle_Direction === ObstacleDirection.E && '!text-purple-300'}`}
                  onClick={() => setCustomObstacle_Direction(ObstacleDirection.E)}
                >
                  E
                </Button>
                <Button
                  className={`${customObstacle_Direction === ObstacleDirection.W && '!text-purple-300'}`}
                  onClick={() => setCustomObstacle_Direction(ObstacleDirection.W)}
                >
                  W
                </Button>
              </div>

              {/* Add Obstacle Button */}
              <Button onClick={handleAddCustomObstacle}>
                <span>Add</span>
                <FaPlus />
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Test Modal */}
      {isTestModalOpen && (
        <Modal title='Tests' onClose={() => setIsTestModalOpen(false)}>
          <div className='flex flex-col items-start gap-2'>
            {scenariosList.map((algoTest) => (
              <Scenario
                key={algoTest}
                test={algoTest}
                isSelected={algoTest === selectedScenario}
                setSelectedScenario={setSelectedScenario}
                setIsTestModalOpen={setIsTestModalOpen}
                setAlgoRuntime={setAlgoRuntime}
              />
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Scenarios;
