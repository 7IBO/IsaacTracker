import { useSave } from "../../contexts/SaveContext";
import { ItemDisplay } from "../ItemDisplay";
import { Item } from "../../Models/Item";

export const ItemsTab = () => {
  const { save } = useSave();

  if (!save) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="card p-8 text-center">
          <h2 className="text-3xl font-upheaval mb-4 text-red-400">🎁 Items</h2>
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-4xl font-upheaval mb-6 text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">
          🎁 Items Collection
        </h2>

        {/* Progress Card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Items Seen
              </p>
              <p className="text-3xl font-bold">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
                  {seenItems.length}
                </span>
                <span className="text-gray-500 mx-2">/</span>
                <span className="text-gray-400">{totalItems}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                Collection Rate
              </p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
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
            <span>{seenItems.length} collected</span>
            <span>{totalItems - seenItems.length} remaining</span>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="card p-6">
        <h3 className="text-xl font-upheaval mb-4 text-purple-400 flex items-center gap-2">
          <span>📦 All Items</span>
          <span className="text-sm text-gray-500 font-normal">
            ({items.length} items)
          </span>
        </h3>

        {/* Responsive Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
          {items.map((item: Item) => (
            <ItemDisplay key={item.getID()} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
