import { Entity } from "../Models/Entity";

interface EntityItemProps {
  entity: Entity;
}

export const EntityItem = ({ entity }: EntityItemProps) => {
  const width = entity.isBoss() ? "w-24" : "w-16";

  return (
    <div
      className="items-center flex p-1 cursor-pointer"
      data-id={entity.getId()}
      data-variant={entity.getVariant()}
    >
      <div className={width}>
        <img
          loading="lazy"
          src={`/assets/gfx/enemies/${entity.getName().replace(/ /g, "_")}.png`}
          className={`${width} pixelated`}
          alt={entity.getName()}
        />
      </div>
    </div>
  );
};
