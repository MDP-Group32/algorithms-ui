import { ScenarioEnum } from '@/scenarios';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';

interface ScenarioProps {
  test: ScenarioEnum;
  isSelected?: boolean;
  setSelectedScenario: React.Dispatch<React.SetStateAction<ScenarioEnum>>;
  setIsTestModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlgoRuntime: React.Dispatch<string>; // For reseting AlgoRuntime when changing the test
}

const Scenario = (props: ScenarioProps) => {
  const {
    test,
    isSelected = false,
    setSelectedScenario,
    setIsTestModalOpen,
    setAlgoRuntime,
  } = props;

  return (
    <div
      className="group/test flex gap-2 items-center justify-center cursor-pointer"
      onClick={() => {
        setSelectedScenario(test);
        setIsTestModalOpen(false);
        setAlgoRuntime("");
      }}
    >
      {isSelected ? (
        <FaCheckSquare />
      ) : (
        <>
          <FaCheckSquare className="hidden group-hover/test:inline" />
          <FaSquare className="inline group-hover/test:hidden" />
        </>
      )}
      <div
        className={`${isSelected && "font-bold"} group-hover/test:font-bold`}
      >
        {test}
      </div>
    </div>
  );
};

export default Scenario;
