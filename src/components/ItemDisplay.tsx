import { Item } from "../Models/Item";
import { Utils } from "../Helpers/Utils";

interface ItemDisplayProps {
  item: Item;
}

export const ItemDisplay = ({ item }: ItemDisplayProps) => {
  return (
    <div
      className="sm:flex-1 rounded p-1 cursor-pointer"
      data-seen={item.isSeen()}
    >
      <div className="w-16">
        <img
          loading="lazy"
          src={`/assets/gfx/items/collectibles/${Utils.numberWithLeadingZeros(
            item.getID(),
          )}.png`}
          className={`${
            !item.isSeen() ? "grayscale opacity-80" : ""
          } w-16 pixelated`}
          alt={`Item ${item.getID()}`}
        />
      </div>
    </div>
  );
};
