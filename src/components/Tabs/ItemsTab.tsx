import { useSave } from "../../contexts/SaveContext";
import { ItemDisplay } from "../ItemDisplay";
import { Item } from "../../Models/Item";

export const ItemsTab = () => {
  const { save } = useSave();

  if (!save) {
    return (
      <div className="mx-auto max-w-7xl py-4 md:py-8">
        <div className="card p-8 text-center">
          <h2 className="font-upheaval mb-4 text-3xl text-red-400">🎁 Items</h2>
          <p className="text-gray-400">Please load a save file first.</p>
        </div>
      </div>
    );
  }

  const items = save.getItems().filter((item: Item) => item.getID() > 0);
  const seenItems = items.filter((item: Item) => item.isSeen());
  const totalItems = items.length;
  const percentage = ((seenItems.length / totalItems) * 100).toFixed(1);

  return (
    <div className="mx-auto max-w-7xl py-4 md:py-8">
      <div className="mb-8">
        <h2 className="font-upheaval mb-6 bg-linear-to-r from-purple-500 to-pink-500 bg-clip-text text-4xl text-transparent">
          🎁 Items Collection
        </h2>

        {/* Progress Card */}
        <div className="card mb-6 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm tracking-wider text-gray-400 uppercase">
                Items Seen
              </p>
              <p className="text-3xl font-bold">
                <span className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  {seenItems.length}
                </span>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-gray-400">{totalItems}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm tracking-wider text-gray-400 uppercase">
                Collection Rate
              </p>
              <p className="bg-linear-to-r from-purple-400 to-pink-500 bg-clip-text text-3xl font-bold text-transparent">
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
            <span>{seenItems.length} collected</span>
            <span>{totalItems - seenItems.length} remaining</span>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="card p-6">
        <h3 className="font-upheaval mb-4 flex items-center gap-2 text-xl text-purple-400">
          <span>📦 All Items</span>
          <span className="text-sm font-normal text-gray-500">
            ({items.length} items)
          </span>
        </h3>

        {/* Responsive Grid */}
        <div className="grid grid-cols-3 gap-8 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
          {items.map((item: Item) => (
            <ItemDisplay key={item.getID()} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
