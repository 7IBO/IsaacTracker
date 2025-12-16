import { useSave } from "../../contexts/SaveContext";
import { ChallengeItem } from "../ChallengeItem";
import { Challenge } from "../../Models/Challenge";
import { VersionEnum } from "../../Helpers/Enums/Versions";
import { Constants } from "../../Helpers/Constants";

export const ChallengesTab = () => {
  const { save } = useSave();

  if (!save) {
    return (
      <div className="mx-auto max-w-7xl py-4 md:py-8">
        <div className="card p-8 text-center">
          <h2 className="font-upheaval mb-4 text-3xl text-red-400">
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
    <div className="mx-auto max-w-7xl py-4 md:py-8">
      <div className="mb-8">
        <h2 className="font-upheaval mb-6 bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-4xl text-transparent">
          ⚡ Challenges
        </h2>

        {/* Progress Card */}
        <div className="card mb-6 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm tracking-wider text-gray-400 uppercase">
                Challenges Completed
              </p>
              <p className="text-3xl font-bold">
                <span className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  {completedCount}
                </span>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-400">{totalCount}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm tracking-wider text-gray-400 uppercase">
                Completion Rate
              </p>
              <p className="bg-linear-to-r from-orange-400 to-red-500 bg-clip-text text-3xl font-bold text-transparent">
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
            <span>{completedCount} completed</span>
            <span>{totalCount - completedCount} remaining</span>
          </div>
        </div>
      </div>

      {/* Challenges by DLC - Responsive Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {challengesByDLC.map((dlcChallenges, index) => {
          const dlc = getDLCInfo(index + 1);
          const dlcCompleted = dlcChallenges.filter((c) => c.isDone()).length;
          const dlcTotal = dlcChallenges.length;
          const dlcPercentage = ((dlcCompleted / dlcTotal) * 100).toFixed(0);

          return (
            <div key={index} className="card p-6">
              <div className="mb-4">
                <h3 className={`font-upheaval mb-2 text-2xl ${dlc.color}`}>
                  {dlc.name}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">
                    {dlcCompleted}/{dlcTotal}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/50">
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

              <div className="flex flex-col space-y-2">
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
