import { useSave } from "../../contexts/SaveContext";
import { AchievementItem } from "../AchievementItem";
import { Achievement } from "../../Models/Achievement";

export const AchievementsTab = () => {
  const { save } = useSave();

  if (!save) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="card p-8 text-center">
          <h2 className="font-upheaval mb-4 text-3xl text-red-400">
            🏆 Achievements
          </h2>
          <p className="text-gray-400">Please load a save file first.</p>
        </div>
      </div>
    );
  }

  const achievements = save.getAchievements();
  const unlockedCount = achievements.filter(
    (a: Achievement) => a.unlocked,
  ).length;
  const totalCount = achievements.length;
  const percentage = ((unlockedCount / totalCount) * 100).toFixed(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h2 className="font-upheaval mb-6 bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-4xl text-transparent">
          🏆 Achievements
        </h2>

        {/* Progress Card */}
        <div className="card mb-6 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm tracking-wider text-gray-400 uppercase">
                Overall Progress
              </p>
              <p className="text-3xl font-bold">
                <span className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  {unlockedCount}
                </span>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-400">{totalCount}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm tracking-wider text-gray-400 uppercase">
                Completion
              </p>
              <p className="bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-3xl font-bold text-transparent">
                {percentage}%
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>{unlockedCount} unlocked</span>
            <span>{totalCount - unlockedCount} remaining</span>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="flex flex-wrap justify-center gap-3">
        {achievements.map((achievement: Achievement) => (
          <AchievementItem
            key={achievement.getID()}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
};
