import { Item } from "../Models/Item";
import { Utils } from "../Helpers/Utils";
import { Tooltip } from "./Tooltip";

interface ItemDisplayProps {
  item: Item;
}

export const ItemDisplay = ({ item }: ItemDisplayProps) => {
  const tooltipContent = (
    <div className="text-center">
      <div className="font-bold text-yellow-400">{item.getName()}</div>
      <div className="mt-1 text-xs text-gray-400">ID: {item.getID()}</div>
      {!item.isSeen() && (
        <div className="mt-1 text-xs text-red-400">Not seen yet</div>
      )}
    </div>
  );

  return (
    <Tooltip content={tooltipContent}>
      <div
        className="flex aspect-square cursor-pointer items-center justify-center rounded p-1 transition-colors hover:bg-gray-700/30"
        data-seen={item.isSeen()}
      >
        <div className="w-16">
          <img
            loading="lazy"
            src={`/assets/gfx/items/collectibles/${Utils.numberWithLeadingZeros(
              item.getID(),
            )}.png`}
            className={`${
              !item.isSeen() ? "opacity-80 grayscale" : ""
            } pixelated w-16`}
            alt={`Item ${item.getID()}`}
          />
        </div>
      </div>
    </Tooltip>
  );
};
