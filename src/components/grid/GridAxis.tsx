import { GRID_TOTAL_HEIGHT, GRID_TOTAL_WIDTH } from '@/constants';

const GridAxis = (grid: React.ReactNode[][]) => {
  grid.forEach((row, index) => row.unshift(<td key={`row-${index}`} className='font-bold pr-2'>{GRID_TOTAL_HEIGHT - index - 1}</td>));

  const gridColumnLabels: React.ReactNode[] = [];
  for (let c = -1; c < GRID_TOTAL_WIDTH; c++) {
    if (c === -1) gridColumnLabels.push(<td />);
    else gridColumnLabels.push(<td key={`col-${c}`} className='font-bold pt-2 text-center'>{c}</td>);
  }
  grid.push(gridColumnLabels);
  return grid;
};

export default GridAxis;