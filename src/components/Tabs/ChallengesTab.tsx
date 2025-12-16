import { useSave } from "../../contexts/SaveContext";
import { ChallengeItem } from "../ChallengeItem";
import { Challenge } from "../../Models/Challenge";
import { VersionEnum } from "../../Helpers/Enums/Versions";
import { Constants } from "../../Helpers/Constants";

export const ChallengesTab = () => {
  const { save } = useSave();

  if (!save) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <h2 className="text-3xl font-upheaval mb-4 text-red-400">
            ⚡ Challenges
          </h2>
          <p className="text-gray-400">Please load a save file first.</p>
        </div>
      </div>
    );
  }

  const challenges = save.getChallenges();
  const completedCount = challenges.filter((c: Challenge) => c.isDone()).length;
  const totalCount = challenges.length;
  const percentage = ((completedCount / totalCount) * 100).toFixed(1);

  const getDLCInfo = (dlc: VersionEnum) => {
    const dlcData: {
      [key: number]: { name: string; color: string; gradient: string };
    } = {
      [VersionEnum.REPENTANCE]: {
        name: "Repentance",
        color: "text-red-400",
        gradient: "from-red-500 to-orange-500",
      },
      [VersionEnum.AFTERBIRTH_PLUS]: {
        name: "Afterbirth+",
        color: "text-green-400",
        gradient: "from-green-500 to-emerald-500",
      },
      [VersionEnum.AFTERBIRTH]: {
        name: "Afterbirth",
        color: "text-blue-400",
        gradient: "from-blue-500 to-cyan-500",
      },
      [VersionEnum.REBIRTH]: {
        name: "Rebirth",
        color: "text-yellow-400",
        gradient: "from-yellow-500 to-amber-500",
      },
    };
    return (
      dlcData[dlc] || {
        name: "Undefined",
        color: "text-gray-400",
        gradient: "from-gray-500 to-gray-600",
      }
    );
  };

  const currentVersionID =
    Constants.VERSION_LOADED >= VersionEnum.REPENTANCE
      ? VersionEnum.REPENTANCE
      : Constants.VERSION_LOADED;

  // Group challenges by DLC
  const challengesByDLC: Challenge[][] = [];
  let currentIndex = 0;

  for (let i = 1; i <= currentVersionID; i++) {
    const count = Constants.CHALLENGES_ARRAY_DLC[i - 1];
    challengesByDLC.push(challenges.slice(currentIndex, currentIndex + count));
    currentIndex += count;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-upheaval mb-6 text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-red-500">
          ⚡ Challenges
        </h2>

        {/* Progress Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Challenges Completed
              </p>
              <p className="text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">
                  {completedCount}
                </span>
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-400">{totalCount}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Completion Rate
              </p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">
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
            <span>{completedCount} completed</span>
            <span>{totalCount - completedCount} remaining</span>
          </div>
        </div>
      </div>

      {/* Challenges by DLC - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {challengesByDLC.map((dlcChallenges, index) => {
          const dlc = getDLCInfo(index + 1);
          const dlcCompleted = dlcChallenges.filter((c) => c.isDone()).length;
          const dlcTotal = dlcChallenges.length;
          const dlcPercentage = ((dlcCompleted / dlcTotal) * 100).toFixed(0);

          return (
            <div key={index} className="card p-6">
              <div className="mb-4">
                <h3 className={`text-2xl font-upheaval mb-2 ${dlc.color}`}>
                  {dlc.name}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">
                    {dlcCompleted}/{dlcTotal}
                  </span>
                  <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-linear-to-r ${dlc.gradient} transition-all duration-500`}
                      style={{ width: `${dlcPercentage}%` }}
                    ></div>
                  </div>
                  <span className={`font-bold ${dlc.color}`}>
                    {dlcPercentage}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {dlcChallenges.map((challenge: Challenge) => (
                  <ChallengeItem
                    key={challenge.getID()}
                    challenge={challenge}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
