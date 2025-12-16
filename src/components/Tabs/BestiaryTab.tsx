import { useSave } from "../../contexts/SaveContext";
import { EntityItem } from "../EntityItem";
import { Entity } from "../../Models/Entity";

export const BestiaryTab = () => {
  const { save } = useSave();

  if (!save) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 
        py-8"
      >
        <div className="card p-8 text-center">
          <h2
            className="text-3xl font-upheaval       
         mb-4 text-red-400"
          >
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
    <div
      className="max-w-7xl mx-auto px-4 
        py-8"
    >
      <div className="mb-8">
        <h2
          className="text-4xl font-upheaval         
        mb-6 text-transparent bg-clip-text 
        bg-linear-to-r from-green-500 to-emerald-500"
        >
          👹 Bestiary
        </h2>

        {/* Progress Card */}
        <div className="card p-6 mb-6">
          <div
            className="flex items-center 
        justify-between mb-4"
          >
            <div>
              <p
                className="text-sm 
        text-gray-400 uppercase tracking-wider"
              >
                Enemies Encountered
              </p>
              <p
                className="text-3xl 
        font-bold"
              >
                <span
                  className="text-transparent bg-clip-text 
        bg-linear-to-r from-green-400 to-emerald-500"
                >
                  {unlockedCount}
                </span>
                <span
                  className="text-gray-500        
        mx-2"
                >
                  /
                </span>
                <span className="text-gray-400">{totalCount}</span>
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-sm 
        text-gray-400 uppercase 
        tracking-wider"
              >
                Discovery Rate
              </p>
              <p
                className="text-3xl font-bold        
        text-transparent bg-clip-text bg-linear-to-r         
        from-green-400 to-emerald-500"
              >
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

          <div
            className="flex justify-between        
        mt-2 text-xs text-gray-500"
          >
            <span>
              {unlockedCount}
              discovered
            </span>
            <span>
              {totalCount - unlockedCount}
              undiscovered
            </span>
          </div>

          <div
            className="mt-4 p-3 
        bg-blue-900/20 border border-blue-500/30 
        rounded-lg"
          >
            <p
              className="text-sm 
        text-blue-300"
            >
              💡 Click on an enemy to view detailed stats
            </p>
          </div>
        </div>
      </div>

      {/* Regular Enemies Section */}
      {nonBoss.length > 0 && (
        <div className="mb-8">
          <h3
            className="text-2xl font-upheaval
        mb-4 text-gray-300 flex items-center gap-2"
          >
            <span>🎯</span>
            <span>Regular Enemies</span>
            <span
              className="text-sm
       text-gray-500 font-normal"
            >
              ({nonBoss.length} enemies)
            </span>
          </h3>
          <div className="card p-6">
            <div
              className="grid
       grid-cols-3 sm:grid-cols-4 md:grid-cols-6
       lg:grid-cols-8 gap-3"
            >
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
          <h3
            className="text-2xl font-upheaval
        mb-4 text-gray-300 flex items-center gap-2"
          >
            <span>👑</span>
            <span>Bosses</span>
            <span
              className="text-sm
       text-gray-500 font-normal"
            >
              ({boss.length} bosses)
            </span>
          </h3>
          <div className="card p-6">
            <div
              className="grid
       grid-cols-2 sm:grid-cols-3 md:grid-cols-4
       lg:grid-cols-6 gap-4"
            >
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
