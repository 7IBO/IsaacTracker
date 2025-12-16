import { Character } from "../Models/Character";
import { MarkEnum } from "../Helpers/Enums/Marks";
import { DifficultyEnum } from "../Helpers/Enums/Difficulties";
import { VersionEnum } from "../Helpers/Enums/Versions";
import { Constants } from "../Helpers/Constants";

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

    return (
      <div
        key={`${type}-${index}`}
        className="p-0.5 hover:scale-110 transition-transform cursor-pointer"
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
          className={`${difficulty === 0 ? "invert " : ""}w-8 h-8 pixelated`}
          alt={`Mark ${MarkEnum[mark]}`}
        />
      </div>
    );
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-yellow-500/30 transition-all">
      {/* Character Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700/50">
        <div className="w-16 h-16 shrink-0 bg-gray-900/50 rounded-lg p-2">
          <img
            loading="lazy"
            src={`/assets/gfx/characters/${character.getName()}.png`}
            style={{ filter: "invert(100%)" }}
            className="w-full h-full object-contain"
            alt={character.getName()}
          />
        </div>
        <h4 className="text-lg font-upheaval text-gray-200 truncate">
          {character.getName()}
        </h4>
      </div>

      {/* Marks Container */}
      <div className="space-y-3">
        {/* Solo Marks */}
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">
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
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">
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
