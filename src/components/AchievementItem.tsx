import { Tooltip } from "./Tooltip";

interface AchievementItemProps {
  achievement: {
    id: number;
    name: string;
    unlocked: boolean;
  };
}

export const AchievementItem = ({ achievement }: AchievementItemProps) => {
  const tooltipContent = (
    <div className="text-center">
      <div className="font-bold text-purple-400">{achievement.name}</div>
      <div className="mt-1 text-xs text-gray-400">ID: {achievement.id}</div>
      <div
        className={`mt-1 text-xs ${achievement.unlocked ? "text-green-400" : "text-red-400"}`}
      >
        {achievement.unlocked ? "✓ Unlocked" : "✗ Locked"}
      </div>
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div
        className="cursor-pointer rounded p-1 transition-colors hover:bg-gray-700/30"
        data-id={achievement.id}
        data-unlocked={achievement.unlocked}
      >
        <div className="size-16">
          <img
            loading="lazy"
            src={`/assets/gfx/achievements/${achievement.id}.png`}
            className={`${
              !achievement.unlocked ? "opacity-80 grayscale" : ""
            } pixelated size-16`}
            alt={`Achievement ${achievement.id}`}
          />
        </div>
      </div>
    </Tooltip>
  );
};
