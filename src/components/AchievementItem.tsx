import { Achievement } from "../Models/Achievement";

interface AchievementItemProps {
  achievement: Achievement;
}

export const AchievementItem = ({ achievement }: AchievementItemProps) => {
  return (
    <div
      className="p-1 cursor-pointer"
      data-id={achievement.getID()}
      data-unlocked={achievement.unlocked}
    >
      <div className="size-16">
        <img
          loading="lazy"
          src={`/assets/gfx/achievements/${achievement.getID()}.png`}
          className={`${
            !achievement.unlocked ? "grayscale opacity-80" : ""
          } size-16 pixelated`}
          alt={`Achievement ${achievement.getID()}`}
        />
      </div>
    </div>
  );
};
