import { useState } from "react";
import { useSave } from "../../contexts/SaveContext";
import { CharacterMarks } from "../CharacterMarks";
import { Character } from "../../Models/Character";

type CharacterFilter = "normal" | "tainted";

export const MarksTab = () => {
  const { save } = useSave();
  const [filter, setFilter] = useState<CharacterFilter>("normal");

  if (!save) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <h2 className="text-3xl font-upheaval mb-4 text-red-400">
            ✨ Completion Marks
          </h2>
          <p className="text-gray-400">Please load a save file first.</p>
        </div>
      </div>
    );
  }

  const allCharacters = save.getCharacters();

  // Filter characters based on selection
  const characters = allCharacters.filter((char: Character) => {
    const isTainted = char.getName().includes("Tainted");
    return filter === "tainted" ? isTainted : !isTainted;
  });

  // Calculate completion statistics
  const totalMarks = characters.reduce((total, char) => {
    return total + char.getSoloMarks().size + char.getOnlineMarks().size;
  }, 0);

  const completedMarks = characters.reduce((total, char) => {
    const soloCompleted = Array.from(char.getSoloMarks().values()).filter(
      (difficulty) => difficulty > 0,
    ).length;
    const onlineCompleted = Array.from(char.getOnlineMarks().values()).filter(
      (difficulty) => difficulty > 0,
    ).length;
    return total + soloCompleted + onlineCompleted;
  }, 0);

  const percentage =
    totalMarks > 0 ? ((completedMarks / totalMarks) * 100).toFixed(1) : "0.0";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-upheaval mb-6 text-transparent bg-clip-text bg-linear-to-r from-yellow-500 to-orange-500">
          ✨ Completion Marks
        </h2>

        {/* Progress Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Marks Completed
              </p>
              <p className="text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">
                  {completedMarks}
                </span>
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-400">{totalMarks}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Completion Rate
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
            <span>{completedMarks} completed</span>
            <span>{totalMarks - completedMarks} remaining</span>
          </div>

          <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              💡 Track your progress across all characters and difficulties
            </p>
          </div>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-xl font-upheaval text-yellow-400 flex items-center gap-2">
            <span>👥 Characters</span>
            <span className="text-sm text-gray-500 font-normal">
              ({characters.length} characters)
            </span>
          </h3>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("normal")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === "normal"
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setFilter("tainted")}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filter === "tainted"
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Tainted
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {characters.map((character: Character) => (
            <CharacterMarks key={character.getID()} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};
