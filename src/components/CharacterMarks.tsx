import { Character } from "../Models/Character";
import { MarkEnum } from "../Helpers/Enums/Marks";
import { DifficultyEnum } from "../Helpers/Enums/Difficulties";
import { VersionEnum } from "../Helpers/Enums/Versions";
import { Constants } from "../Helpers/Constants";
import { Tooltip } from "./Tooltip";

interface CharacterMarksProps {
  character: Character;
}

export const CharacterMarks = ({ character }: CharacterMarksProps) => {
  const soloMarks = character.getSoloMarks();
  const onlineMarks = character.getOnlineMarks();

  const renderMark = (
    charId: number,
    mark: number,
    difficulty: number,
    type: VersionEnum,
    index: number,
  ) => {
    const isOnline = type === VersionEnum.ONLINE;
    const difficultyName =
      difficulty === 0 ? "normal" : DifficultyEnum[difficulty].toLowerCase();
    const markName = MarkEnum[mark];

    const getDifficultyColor = () => {
      switch (difficulty) {
        case 0:
          return "text-gray-400";
        case 1:
          return "text-orange-400";
        case 2:
          return "text-red-500";
        default:
          return "text-gray-400";
      }
    };

    const tooltipContent = (
      <div className="text-center">
        <div className="font-bold text-yellow-400">{markName}</div>
        <div className={`mt-1 text-xs ${getDifficultyColor()}`}>
          {difficultyName.charAt(0).toUpperCase() + difficultyName.slice(1)}
        </div>
        {isOnline && (
          <div className="mt-1 text-xs text-blue-400">Online Mode</div>
        )}
        {difficulty === 0 && (
          <div className="mt-1 text-xs text-gray-500">Not completed</div>
        )}
      </div>
    );

    return (
      <Tooltip key={`${type}-${index}`} content={tooltipContent}>
        <div
          className="cursor-pointer p-0.5 transition-transform hover:scale-110"
          data-player={charId}
          data-id={mark}
          data-difficulty={difficulty}
          data-type={type}
        >
          <img
            loading="lazy"
            src={`/assets/gfx/marks/${
              isOnline ? "online_" : ""
            }${difficultyName}/${MarkEnum[mark]}.png`}
            className={`${difficulty === 0 ? "brightness-200 grayscale invert" : ""} pixelated size-8`}
            alt={`Mark ${MarkEnum[mark]}`}
          />
        </div>
      </Tooltip>
    );
  };

  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-4 transition-all hover:border-yellow-500/30">
      {/* Character Header */}
      <div className="mb-4 flex items-center gap-3 border-b border-gray-700/50 pb-3">
        <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-900/50 p-2">
          <img
            loading="lazy"
            src={`/assets/gfx/characters/${character.getName()}.png`}
            style={{ filter: "invert(100%)" }}
            className="h-full w-full object-contain"
            alt={character.getName()}
          />
        </div>
        <h4 className="font-upheaval truncate text-lg text-gray-200">
          {character.getName()}
        </h4>
      </div>

      {/* Marks Container */}
      <div className="space-y-3">
        {/* Solo Marks */}
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Solo Marks
          </p>
          <div className="flex flex-wrap gap-0.5">
            {Array.from(soloMarks.entries()).map(([mark, difficulty], index) =>
              renderMark(
                character.getID(),
                mark,
                difficulty,
                VersionEnum.REPENTANCE,
                index,
              ),
            )}
          </div>
        </div>

        {/* Online Marks */}
        {Constants.VERSION_LOADED === VersionEnum.ONLINE && (
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Online Marks
            </p>
            <div className="flex flex-wrap gap-0.5">
              {Array.from(onlineMarks.entries()).map(
                ([mark, difficulty], index) =>
                  renderMark(
                    character.getID(),
                    mark,
                    difficulty,
                    VersionEnum.ONLINE,
                    index,
                  ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
