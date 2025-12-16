import { Entity } from "../Models/Entity";
import { Tooltip } from "./Tooltip";

interface EntityItemProps {
  entity: Entity;
}

export const EntityItem = ({ entity }: EntityItemProps) => {
  const width = entity.isBoss() ? "size-24" : "size-16";
  const isUnlocked = entity.isUnlocked();

  const tooltipContent = (
    <div className="text-center">
      <div
        className={`font-bold ${entity.isBoss() ? "text-red-400" : "text-green-400"}`}
      >
        {entity.getName()}
      </div>
      {entity.isBoss() && <div className="text-xs text-orange-400">Boss</div>}
      {isUnlocked ? (
        <div className="mt-2 space-y-1 text-xs text-gray-300">
          <div>
            Kills: <span className="text-green-400">{entity.getKills()}</span>
          </div>
          <div>
            Deaths: <span className="text-red-400">{entity.getDeaths()}</span>
          </div>
          <div>
            Hits: <span className="text-yellow-400">{entity.getHits()}</span>
          </div>
          <div>
            Encounters:{" "}
            <span className="text-blue-400">{entity.getEncounter()}</span>
          </div>
        </div>
      ) : (
        <div className="mt-1 text-xs text-gray-500">Not encountered yet</div>
      )}
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div
        className="flex aspect-square cursor-pointer items-center justify-center rounded p-2 transition-colors hover:bg-gray-700/30"
        data-id={entity.getId()}
        data-variant={entity.getVariant()}
      >
        <div className={width}>
          <img
            loading="lazy"
            src={`/assets/gfx/enemies/${entity.getName().replace(/ /g, "_")}.png`}
            className={`${width} pixelated object-contain ${!isUnlocked ? "opacity-50 grayscale" : ""}`}
            alt={entity.getName()}
          />
        </div>
      </div>
    </Tooltip>
  );
};
