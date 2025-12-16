import { Challenge } from "../Models/Challenge";

interface ChallengeItemProps {
  challenge: Challenge;
}

export const ChallengeItem = ({ challenge }: ChallengeItemProps) => {
  return (
    <div
      className={`p-1 text-l text-center cursor-pointer ${
        challenge.isDone() ? "line-through" : ""
      }`}
      data-id={challenge.getID()}
      data-done={challenge.isDone()}
    >
      {challenge.getName()}
    </div>
  );
};
