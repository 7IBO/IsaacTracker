import { useSave } from "../../contexts/SaveContext";
import { EntityItem } from "../EntityItem";
import { Entity } from "../../Models/Entity";

export const BestiaryTab = () => {
  const { save } = useSave();

  if (!save) {
    return (
      <div className="mx-auto max-w-7xl py-4 md:py-8">
        <div className="card p-8 text-center">
          <h2 className="font-upheaval mb-4 text-3xl text-red-400">
            👹 Bestiary
          </h2>
          <p className="text-gray-400">Please load a save file first.</p>
        </div>
      </div>
    );
  }

  const entities = save.getEntities();
  const nonBoss = entities.filter(
    (entity: Entity) => !entity.isBoss() && !entity.isSpecial(),
  );
  const boss = entities.filter(
    (entity: Entity) => entity.isBoss() && !entity.isSpecial(),
  );

  const unlockedCount = entities.filter((e: Entity) => e.isUnlocked()).length;
  const totalCount = entities.length;
  const percentage = ((unlockedCount / totalCount) * 100).toFixed(1);

  return (
    <div className="mx-auto max-w-7xl py-4 md:py-8">
      <div className="mb-8">
        <h2 className="font-upheaval mb-6 bg-linear-to-r from-green-500 to-emerald-500 bg-clip-text text-4xl text-transparent">
          👹 Bestiary
        </h2>
        {/* Progress Card */}
        <div className="card mb-6 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm tracking-wider text-gray-400 uppercase">
                Enemies Encountered
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
                Discovery Rate
              </p>
              <p className="bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
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
            <span>{unlockedCount} discovered</span>
            <span>{totalCount - unlockedCount} undiscovered</span>
          </div>

          <div className="mt-4 rounded-lg border border-blue-500/30 bg-blue-900/20 p-3">
            <p className="text-sm text-blue-300">
              💡 Click on an enemy to view detailed stats
            </p>
          </div>
        </div>
      </div>

      {/* Regular Enemies Section */}
      {nonBoss.length > 0 && (
        <div className="mb-8">
          <h3 className="font-upheaval mb-4 flex items-center gap-2 text-2xl text-gray-300">
            <span>🎯</span>
            <span>Regular Enemies</span>
            <span className="text-sm font-normal text-gray-500">
              ({nonBoss.length} enemies)
            </span>
          </h3>
          <div className="card p-6">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
              {nonBoss.map((entity: Entity) => (
                <EntityItem
                  key={`${entity.getId()}-${entity.getVariant()}`}
                  entity={entity}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Boss Enemies Section */}
      {boss.length > 0 && (
        <div>
          <h3 className="font-upheaval mb-4 flex items-center gap-2 text-2xl text-gray-300">
            <span>👑</span>
            <span>Bosses</span>
            <span className="text-sm font-normal text-gray-500">
              ({boss.length} bosses)
            </span>
          </h3>
          <div className="card p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {boss.map((entity: Entity) => (
                <EntityItem
                  key={`${entity.getId()}-${entity.getVariant()}`}
                  entity={entity}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
