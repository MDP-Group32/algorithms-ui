'use client';

import { getAlgoOutput } from '@/api/api';
import { NavigationGrid } from '@/components/algorithm/NavigationGrid';
import Scenarios from '@/components/scenarios/Scenarios';
import Button from '@/components/ui/Button';
import HealthIndicatorBadge from '@/components/ui/ServerStatus';
import { ROBOT_INITIAL_POSITION, GRID_ANIMATION_SPEED } from '@/constants';
import { ScenarioEnum, ScenarioToObstaclesMap } from '@/scenarios';
import { AlgorithmServerRequest, AlgorithmServerResponse } from '@/schemas/algorithm';
import { Obstacle } from '@/schemas/obstacle';
import { Position } from '@/schemas/robot';
import { convertAlgoOutputToStepwisePosition } from '@/utils/path.utils';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner, FaSitemap, FaPause, FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Home() {
  // Robot's Positions
  const [robotPositions, setRobotPositions] = useState<Position[]>();
  const totalSteps = robotPositions?.length ?? 0;
  
  // Algorithm Runtime
  const [algoRuntime, setAlgoRuntime] = useState<string>('');

  // Select Scenario
  const [selectedScenario, setSelectedScenario] = useState<ScenarioEnum>(ScenarioEnum.TWO_OBSTACLES);
  const [obstacles, setObstacles] = useState<Obstacle[]>(ScenarioToObstaclesMap[ScenarioEnum.TWO_OBSTACLES]);
  useEffect(() => {
    const obstacles = ScenarioToObstaclesMap[selectedScenario];
    setObstacles(obstacles);

    setCurrentStep(0);
    setCurrentRobotPosition(ROBOT_INITIAL_POSITION);
    setRobotPositions(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScenario]);

  // Run Algorithm
  const [isAlgorithmLoading, setIsAlgorithmLoading] = useState(false);

  // Run Algorithm
  const handleGetShortestPath = async () => {
    if (startAnimation === true || isAlgorithmLoading === true) return;
    setIsAlgorithmLoading(true);
    setAlgoRuntime('');

    const algoInput: AlgorithmServerRequest = {
      value: {
        obstacles: obstacles.map((obstacle) => {
          return {
            id: obstacle.id,
            // x: obstacle.x * ALGO_GRID_BLOCK_SIZE_MULTIPLIER,
            // y: obstacle.y * ALGO_GRID_BLOCK_SIZE_MULTIPLIER,
            x: obstacle.x,
            y: obstacle.y,
            d: obstacle.d,
          };
        }),
      },
      server_mode: 'simulator',
      algo_type: 'Exhaustive Astar',
    };
    try {
      setCurrentStep(0);
      const algoOutput: AlgorithmServerResponse = await getAlgoOutput(algoInput);
      setRobotPositions(convertAlgoOutputToStepwisePosition(algoOutput.positions));
      setAlgoRuntime(algoOutput.runtime);
      toast.success('Algorithm ran successfully.');
    } catch (e) {
      toast.error('Failed to run algorithm. Server Error: ' + e);
    }

    setIsAlgorithmLoading(false);
  };

  // Animation
  const [isManualAnimation, setIsManualAnimation] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentRobotPosition, setCurrentRobotPosition] = useState<Position>();

  // Animation
  useEffect(() => {
    if (robotPositions && startAnimation && currentStep + 1 < totalSteps) {
      const timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);

        // Handle Scan Animation
        if (robotPositions[nextStep].x === -1 && robotPositions[nextStep].y === -1) {
          if (robotPositions[nextStep].theta === -1) toast.success('Image Captured!');
          else toast('Capturing Image ...', {
            icon: '⏳',
          });
        } else {
          setCurrentRobotPosition(robotPositions[nextStep]);
        }

        // Stop Animation at the last step
        if (nextStep === totalSteps - 1) {
          setStartAnimation(false);
        }
      }, GRID_ANIMATION_SPEED);
      return () => clearTimeout(timer);
    } else if (robotPositions && isManualAnimation && currentStep < totalSteps) {
      // User manually click through the steps
      // Handle Scan Animation
      if (robotPositions[currentStep].x === -1 && robotPositions[currentStep].y === -1) {
        if (robotPositions[currentStep].theta === -1) toast.success('Image Captured!');
        else toast('Capturing Image ...', {
          icon: '⏳',
        });
      } else {
        setCurrentRobotPosition(robotPositions[currentStep]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, totalSteps, startAnimation, isManualAnimation]);

  return (
    <div className='flex flex-col justify-center items-center my-6'>
      <Toaster />
      <div className='font-bold text-[24px] mb-2'>{'CZ3004 MDP Group 32 AY24-25 Semester 1 Algorithm Simulator'}</div>
      <div>
        {/* Server Status */}
        <HealthIndicatorBadge />

        {/* Different Testing Scenarios */}
        <Scenarios
          selectedScenario={selectedScenario}
          setSelectedScenario={setSelectedScenario}
          obstacles={obstacles}
          setObstacles={setObstacles}
          setAlgoRuntime={setAlgoRuntime}
        />

        {/* Run Algo */}
        <div className='mb-4 flex justify-center'>
          <Button 
            onClick={handleGetShortestPath}>
            <span>Run Algorithm</span>
            {isAlgorithmLoading ? <FaSpinner className='animate-spin' /> : <FaSitemap className='text-[18px]' />}
          </Button>
        </div>

        {/* Algo Runtime */}
        {algoRuntime && (
          <div className='mb-4 flex justify-center'>
            Algorithm Runtime:&nbsp;
            <span className='font-bold'>{algoRuntime}</span>&nbsp;(
            {"Exhaustive Astar"})
          </div>
        )}

        {/* Animation */}
        {robotPositions && (
          <div className='mt-2 mb-4 flex flex-col justify-center items-center gap-2'>
            {/* Start Animation */}
            <Button
              onClick={() => {
                if (startAnimation) {
                  // Stop Animation
                  setStartAnimation(false);
                } else {
                  // Start Animation
                  setIsManualAnimation(false);
                  setStartAnimation(true);
                  if (currentStep === totalSteps - 1) {
                    setCurrentRobotPosition(robotPositions[0]);
                    setCurrentStep(0);
                  }
                }
              }}
            >
              <span>{startAnimation ? 'Stop Animation' : 'Start Animation'}</span>
              {startAnimation ? <FaPause /> : <FaPlay />}
            </Button>

            {/* Slider */}
            <label htmlFor='steps-range' className='font-bold text-[14px] flex gap-2 items-center'>
              <FaChevronLeft
                className='cursor-pointer'
                onClick={() => {
                  if (!startAnimation && currentStep - 1 >= 0) {
                    setIsManualAnimation(true);
                    setCurrentStep((prev) => prev - 1);
                  }
                }}
              />
              <span>
                Step: {currentStep + 1} / {totalSteps}
              </span>
              <FaChevronRight
                className='cursor-pointer'
                onClick={() => {
                  if (!startAnimation && currentStep + 1 < totalSteps) {
                    setIsManualAnimation(true);
                    setCurrentStep((prev) => prev + 1);
                  }
                }}
              />
            </label>
            <input
              id='steps-range'
              type='range'
              min={0}
              max={totalSteps - 1}
              value={currentStep}
              onChange={(e) => {
                setCurrentStep(Number(e.target.value));
                setIsManualAnimation(true);
              }}
              onPointerUp={() => setIsManualAnimation(false)}
              step={1}
              className='w-1/2 h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer'
              disabled={startAnimation === true}
            />
          </div>
        )}

        {/* Navigation Grid */}
        <NavigationGrid
          robotPosition={currentRobotPosition ?? ROBOT_INITIAL_POSITION}
          obstacles={obstacles}
          canAddObstacle={selectedScenario === ScenarioEnum.CUSTOM}
          setObstacles={setObstacles}
        />
      </div>
    </div>
  );
}
