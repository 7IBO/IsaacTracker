import { useSave } from "../../contexts/SaveContext";

export const HomeTab = () => {
  const {
    save,
    loadSaveFile,
    loadSaveFromFile,
    isLoading,
    error,
    useFallback,
  } = useSave();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await loadSaveFromFile(file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-7xl mb-3 font-upheaval text-transparent bg-clip-text bg-linear-to-r from-red-600 via-red-500 to-yellow-500 drop-shadow-lg">
          The Binding of Isaac
        </h1>
        <p className="text-2xl font-upheaval text-gray-400">
          Repentance Save Viewer
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Read-only • Auto-refresh • Modern UI
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Load Section - Modern Card */}
        <div className="card p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full md:w-auto">
              {useFallback ? (
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="file-input"
                    className="btn-primary inline-block text-center cursor-pointer"
                  >
                    {isLoading
                      ? "⏳ Loading..."
                      : save
                      ? "📁 Load Another Save"
                      : "📂 Choose Save File"}
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept=".dat"
                    onChange={handleFileSelect}
                    disabled={isLoading}
                    className="hidden"
                  />
                  <p className="text-sm text-yellow-400/80 flex items-center gap-2">
                    <span>⚠️</span>
                    <span>Fallback mode - manual file selection required</span>
                  </p>
                </div>
              ) : (
                <button
                  onClick={loadSaveFile}
                  disabled={isLoading}
                  className="btn-primary w-full md:w-auto"
                >
                  {isLoading
                    ? "⏳ Loading..."
                    : save
                    ? "🔄 Reload Save"
                    : "📂 Load Save File"}
                </button>
              )}
            </div>

            {save && (
              <div className="flex items-center gap-3 px-6 py-3 bg-linear-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <div>
                  <p className="text-xs text-green-400/60 uppercase tracking-wider font-semibold">
                    Loaded Successfully
                  </p>
                  <p className="text-green-300 font-semibold font-mono text-sm">
                    {save.get_filename()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-linear-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-xl flex items-center gap-3 backdrop-blur-sm">
              <span className="text-2xl">⚠️</span>
              <p className="text-red-300">{error}</p>
            </div>
          )}
        </div>

        {/* Grid Layout - Instructions & Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* How to use */}
          <div className="card p-6">
            <h3 className="text-xl font-upheaval mb-4 text-red-400">
              📖 How to Use
            </h3>
            <div className="space-y-4 text-sm text-gray-300">
              {useFallback ? (
                <div className="space-y-3">
                  <p>
                    Click{" "}
                    <span className="text-yellow-400 font-semibold">
                      "Choose Save File"
                    </span>{" "}
                    and select your save:
                  </p>
                  <code className="block bg-black/50 px-3 py-2 rounded-lg border border-gray-700">
                    C:\Users\[YourName]\Documents\My Games\
                    <br />
                    Binding of Isaac Repentance\
                    <br />
                    *.rep_persistentgamedata1.dat
                  </code>
                  <div className="flex items-start gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <span>⚠️</span>
                    <p className="text-red-300 text-xs">
                      Auto-refresh is not available in fallback mode. Reload
                      manually to see updates.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p>
                    Click{" "}
                    <span className="text-green-400 font-semibold">
                      "Load Save File"
                    </span>{" "}
                    and select your save folder:
                  </p>
                  <code className="block bg-black/50 px-3 py-2 rounded-lg border border-gray-700">
                    C:\Users\[YourName]\Documents\My Games\
                    <br />
                    Binding of Isaac Repentance
                  </code>
                  <div className="flex items-start gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                    <span>✅</span>
                    <p className="text-green-300 text-xs">
                      Auto-loads the most recent save file and refreshes every 5
                      seconds
                    </p>
                  </div>
                </div>
              )}
              <div className="mt-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 text-xs font-semibold">
                  🔒 Read-only viewer - Your save files cannot be modified
                </p>
              </div>
            </div>
          </div>

          {/* Browser Compatibility */}
          <div className="card p-6">
            <h3 className="text-xl font-upheaval mb-4 text-yellow-400">
              🌐 Browser Support
            </h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <p className="text-green-400 font-semibold mb-2">
                  ✅ Full Support (with auto-refresh)
                </p>
                <ul className="list-none space-y-1 ml-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    Chrome / Edge 86+
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                    Opera 72+
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-yellow-400 font-semibold mb-2">
                  ⚠️ Partial Support (fallback mode)
                </p>
                <ul className="list-none space-y-1 ml-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                    Brave (manual file selection)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                    Firefox (manual file selection)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-yellow-400 rounded-full"></span>
                    Safari (manual file selection)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="text-2xl font-upheaval mb-4 text-red-400">
              🎮 Features
            </h2>
            <ul className="space-y-2 text-gray-300">
              {[
                "View all achievements with progress",
                "Character marks for all difficulties",
                "Complete item collection tracker",
                "Challenge completion status",
                "Detailed bestiary statistics",
                "Auto-refresh every 5 seconds",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-red-500 text-lg">▶</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="text-2xl font-upheaval mb-4 text-yellow-400">
              📊 Status
            </h2>
            {save ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold text-green-300">File Loaded</p>
                    <p className="text-xs text-gray-400">
                      Ready to view your progress
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 p-3 border rounded-lg ${
                    useFallback
                      ? "bg-red-900/20 border-red-500/30"
                      : "bg-green-900/20 border-green-500/30"
                  }`}
                >
                  <span className="text-2xl">{useFallback ? "⏸️" : "🔄"}</span>
                  <div>
                    <p className="font-semibold">Auto-refresh</p>
                    <p
                      className={`text-xs ${
                        useFallback ? "text-red-300" : "text-green-300"
                      }`}
                    >
                      {useFallback
                        ? "Not available (fallback mode)"
                        : "Active - Updates every 5s"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No save file loaded yet</p>
                <p className="text-gray-600 text-xs mt-2">
                  Load a file to view statistics
                </p>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="card p-6">
          <h3 className="text-xl font-upheaval mb-4 text-gray-400">ℹ️ About</h3>
          <div className="text-sm text-gray-400 space-y-3">
            <p>
              Isaac Save Viewer is an independent project and is not sponsored
              by, affiliated with, or related to the creators or publishers of
              The Binding of Isaac.
            </p>
            <p>
              Sprites from the{" "}
              <a
                href="https://bindingofisaacrebirth.wiki.gg/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline transition-colors"
              >
                Binding of Isaac Wiki
              </a>
              .
            </p>
            <p>
              Based on the work of{" "}
              <a
                href="https://x.com/Demorck_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline transition-colors"
              >
                @Demorck_
              </a>{" "}
              on X and reworked by{" "}
              <a
                href="https://fayardthibault.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline transition-colors"
              >
                7IBO
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
