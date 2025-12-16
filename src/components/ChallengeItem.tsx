import { Challenge } from "../Models/Challenge";
import { Tooltip } from "./Tooltip";

interface ChallengeItemProps {
  challenge: Challenge;
}

export const ChallengeItem = ({ challenge }: ChallengeItemProps) => {
  const tooltipContent = (
    <div className="text-center">
      <div className="font-bold text-orange-400">{challenge.getName()}</div>
      <div className="mt-1 text-xs text-gray-400">
        Challenge #{challenge.getID() + 1}
      </div>
      <div
        className={`mt-1 text-xs ${challenge.isDone() ? "text-green-400" : "text-yellow-400"}`}
      >
        {challenge.isDone() ? "✓ Completed" : "○ Not completed"}
      </div>
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div
        className={`text-l cursor-pointer rounded p-2 text-center transition-colors hover:bg-gray-700/30 ${
          challenge.isDone() ? "text-gray-500 line-through" : "text-gray-200"
        }`}
        data-id={challenge.getID()}
        data-done={challenge.isDone()}
      >
        {challenge.getName()}
      </div>
    </Tooltip>
  );
};
