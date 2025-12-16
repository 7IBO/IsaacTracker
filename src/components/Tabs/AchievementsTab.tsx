import { useSave } from "../../contexts/SaveContext";
import { AchievementItem } from "../AchievementItem";
import { Achievement } from "../../Models/Achievement";

export const AchievementsTab = () => {
  const { save } = useSave();

  if (!save) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <h2 className="text-3xl font-upheaval mb-4 text-red-400">
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-upheaval mb-6 text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-orange-500">
          🏆 Achievements
        </h2>

        {/* Progress Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Overall Progress
              </p>
              <p className="text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500">
                  {unlockedCount}
                </span>
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-400">{totalCount}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Completion
              </p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">
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

          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{unlockedCount} unlocked</span>
            <span>{totalCount - unlockedCount} remaining</span>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
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
