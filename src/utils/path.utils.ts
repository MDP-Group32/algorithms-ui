import { convertPositiveThetaToPostiveNegativeScale, convertThetaToDirection, convertThetaRotationToFinalDirection } from '@/utils/conversions.utils';
import { GRID_BLOCK_SIZE_CM, clockwiseOffsets, antiClockwiseOffsets, ARTIFICAL_DELAY_CURVE, ARTIFICAL_DELAY_SCAN } from '@/constants';
import { RobotDirection, TurnDirection } from '@/schemas/robot';
import { Position } from '@/schemas/robot';
import { AlgorithmServerResponse } from '@/schemas/algorithm';

/** Converts algorithm's output positions into step-wise Robot's Positions */
export const convertAlgoOutputToStepwisePosition = (
  positions: AlgorithmServerResponse["positions"]
): Position[] => {
  const isScanConfiguration = (position: AlgorithmServerResponse["positions"][number]) =>
    position.x === -1 && position.y === -1;

  return positions.map((position) => {
    if (isScanConfiguration(position)) return position;

    const { x, y, theta } = position;
    return {
      x: Math.floor(x / GRID_BLOCK_SIZE_CM),
      y: Math.floor(y / GRID_BLOCK_SIZE_CM),
      theta: convertPositiveThetaToPostiveNegativeScale(theta),
    };
  });
};

/**
 * Converts MoveStraight from total straight_distance (cm) to `Position[]` for each timestep / cell movement
 * @param startPosition: Position
 * @param distance_straight: in cm
 * @param forward Set to `false` if robot is taking MoveBack action
 * @returns Position[]
 * */
export const handleMoveStraightAction = (
  startPosition: Position,
  distance_straight: number,
  forward: boolean = true
) => {
  const robotPositions: Position[] = [];

  let currentPosition: Position = {
    x: startPosition.x,
    y: startPosition.y,
    theta: startPosition.theta,
  };
  let distanceLeft = distance_straight;
  const robotDirection = convertThetaToDirection(startPosition.theta);

  while (distanceLeft > 0) {
    const currentPositionTemp: Position = {
      x: currentPosition.x,
      y: currentPosition.y,
      theta: currentPosition.theta,
    };
    switch (robotDirection) {
      case RobotDirection.N:
        currentPositionTemp.y += forward ? 1 : -1;
        break;
      case RobotDirection.S:
        currentPositionTemp.y += forward ? -1 : 1;
        break;
      case RobotDirection.E:
        currentPositionTemp.x += forward ? 1 : -1;
        break;
      case RobotDirection.W:
        currentPositionTemp.x += forward ? -1 : 1;
        break;
    }
    robotPositions.push(currentPositionTemp);
    currentPosition = currentPositionTemp;
    distanceLeft -= GRID_BLOCK_SIZE_CM;
  }

  return robotPositions;
};

/**
 * Converts CurveLeft / CurveRight from `distance_arc` (cm), `theta` (radian), and `turn_direction` to `Position[]` for each timestep / cell movement
 * @param startPosition: Position
 * @param distance_arc in cm
 * @param theta in radian
 * @param turn_direction "Clockwise" or "Anticlockwise"
 * @returns Position[]
 * */
export const handleCurveAction = (
  startPosition: Position,
  distance_arc: number,
  theta: number,
  turn_direction: TurnDirection
) => {
  const robotPositions: Position[] = [];

  let currentPosition: Position = {
    x: startPosition.x,
    y: startPosition.y,
    theta: startPosition.theta,
  };

  // let distanceLeft = distance_arc;
  const robotStartDirection = convertThetaToDirection(startPosition.theta);
  let robotCurrentDirection: RobotDirection = robotStartDirection;

  let thetaLeft = theta;
  while (thetaLeft > 0) {
    const currentPositionTemp: Position = {
      x: currentPosition.x,
      y: currentPosition.y,
      theta: currentPosition.theta,
    };

    const robotEndDirection = convertThetaRotationToFinalDirection(
      robotCurrentDirection,
      Math.PI / 2,
      turn_direction
    );

    // Offsets
    const offsets =
      turn_direction === TurnDirection.Clockwise
        ? clockwiseOffsets[robotCurrentDirection][robotEndDirection]
        : antiClockwiseOffsets[robotCurrentDirection][robotEndDirection];

    currentPositionTemp.x += offsets[0];
    currentPositionTemp.y += offsets[1];
    if (turn_direction === TurnDirection.Clockwise) {
      currentPositionTemp.theta =
        (currentPositionTemp.theta - Math.PI / 2) % Math.PI;
    } else {
      currentPositionTemp.theta =
        (currentPositionTemp.theta + Math.PI / 2) % Math.PI;
    }

    // *Push to robotPositions twice to stimulate delay
    for (let i = 0; i < ARTIFICAL_DELAY_CURVE; i++) {
      robotPositions.push(currentPositionTemp);
    }

    currentPosition = currentPositionTemp;
    robotCurrentDirection = robotEndDirection;
    thetaLeft -= Math.PI / 2;
  }

  return robotPositions;
};

/**
 * Converts Scan to `Position`, where x = -1, y = -1, theta = -1.
 * @returns Position[] with 2 `Position` to simulate scanning action delay
 * @note (-1, -1, -1) means scanning done
 * */
export const handleScanAction = () => {
  const robotPositionScanConfigurations: Position[] = [];
  for (let i = 0; i < ARTIFICAL_DELAY_SCAN; i++) {
    if (i === ARTIFICAL_DELAY_SCAN - 1) {
      robotPositionScanConfigurations.push({ x: -1, y: -1, theta: -1 });
    } else {
      robotPositionScanConfigurations.push({ x: -1, y: -1, theta: 0 });
    }
  }

  return robotPositionScanConfigurations;
};