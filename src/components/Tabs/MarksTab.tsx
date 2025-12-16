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
      <div className="mx-auto max-w-7xl py-4 md:py-8">
        <div className="card p-8 text-center">
          <h2 className="font-upheaval mb-4 text-3xl text-red-400">
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
    <div className="mx-auto max-w-7xl py-4 md:py-8">
      <div className="mb-8">
        <h2 className="font-upheaval mb-6 bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-4xl text-transparent">
          ✨ Completion Marks
        </h2>

        {/* Progress Card */}
        <div className="card mb-6 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm tracking-wider text-gray-400 uppercase">
                Marks Completed
              </p>
              <p className="text-3xl font-bold">
                <span className="bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {completedMarks}
                </span>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-400">{totalMarks}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm tracking-wider text-gray-400 uppercase">
                Completion Rate
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
            <span>{completedMarks} completed</span>
            <span>{totalMarks - completedMarks} remaining</span>
          </div>

          <div className="mt-4 rounded-lg border border-blue-500/30 bg-blue-900/20 p-3">
            <p className="text-sm text-blue-300">
              💡 Track your progress across all characters and difficulties
            </p>
          </div>
        </div>
      </div>

      {/* Characters Grid */}
      <div className="card p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-upheaval flex items-center gap-2 text-xl text-yellow-400">
            <span>👥 Characters</span>
            <span className="text-sm font-normal text-gray-500">
              ({characters.length} characters)
            </span>
          </h3>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("normal")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                filter === "normal"
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setFilter("tainted")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                filter === "tainted"
                  ? "bg-red-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Tainted
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {characters.map((character: Character) => (
            <CharacterMarks key={character.getID()} character={character} />
          ))}
        </div>
      </div>
    </div>
  );
};
