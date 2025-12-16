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
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="font-upheaval mb-3 bg-linear-to-r from-red-600 via-red-500 to-yellow-500 bg-clip-text text-7xl text-transparent drop-shadow-lg">
          The Binding of Isaac
        </h1>
        <p className="font-upheaval text-2xl text-gray-400">
          Repentance Save Viewer
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Read-only • Auto-refresh • Modern UI
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Load Section - Modern Card */}
        <div className="card p-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="w-full flex-1 md:w-auto">
              {useFallback ? (
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="file-input"
                    className="btn-primary inline-block cursor-pointer text-center"
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
                  <p className="flex items-center gap-2 text-sm text-yellow-400/80">
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
              <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-linear-to-r from-green-900/20 to-emerald-900/20 px-6 py-3 backdrop-blur-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
                <div>
                  <p className="text-xs font-semibold tracking-wider text-green-400/60 uppercase">
                    Loaded Successfully
                  </p>
                  <p className="font-mono text-sm font-semibold text-green-300">
                    {save.get_filename()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-500/50 bg-linear-to-r from-red-900/30 to-orange-900/30 p-4 backdrop-blur-sm">
              <span className="text-2xl">⚠️</span>
              <p className="text-red-300">{error}</p>
            </div>
          )}
        </div>

        {/* Grid Layout - Instructions & Info */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* How to use */}
          <div className="card p-6">
            <h3 className="font-upheaval mb-4 text-xl text-red-400">
              📖 How to Use
            </h3>
            <div className="space-y-4 text-sm text-gray-300">
              {useFallback ? (
                <div className="space-y-3">
                  <p>
                    Click{" "}
                    <span className="font-semibold text-yellow-400">
                      "Choose Save File"
                    </span>{" "}
                    and select your save:
                  </p>
                  <code className="block rounded-lg border border-gray-700 bg-black/50 px-3 py-2">
                    C:\Users\[YourName]\Documents\My Games\
                    <br />
                    Binding of Isaac Repentance\
                    <br />
                    *.rep_persistentgamedata1.dat
                  </code>
                  <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-900/20 p-3">
                    <span>⚠️</span>
                    <p className="text-xs text-red-300">
                      Auto-refresh is not available in fallback mode. Reload
                      manually to see updates.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p>
                    Click{" "}
                    <span className="font-semibold text-green-400">
                      "Load Save File"
                    </span>{" "}
                    and select your save folder:
                  </p>
                  <code className="block rounded-lg border border-gray-700 bg-black/50 px-3 py-2">
                    C:\Users\[YourName]\Documents\My Games\
                    <br />
                    Binding of Isaac Repentance
                  </code>
                  <div className="flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-900/20 p-3">
                    <span>✅</span>
                    <p className="text-xs text-green-300">
                      Auto-loads the most recent save file and refreshes every 5
                      seconds
                    </p>
                  </div>
                </div>
              )}
              <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3">
                <p className="text-xs font-semibold text-yellow-300">
                  🔒 Read-only viewer - Your save files cannot be modified
                </p>
              </div>
            </div>
          </div>

          {/* Browser Compatibility */}
          <div className="card p-6">
            <h3 className="font-upheaval mb-4 text-xl text-yellow-400">
              🌐 Browser Support
            </h3>
            <div className="space-y-4 text-sm text-gray-300">
              <div>
                <p className="mb-2 font-semibold text-green-400">
                  ✅ Full Support (with auto-refresh)
                </p>
                <ul className="ml-4 list-none space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-green-400"></span>
                    Chrome / Edge 86+
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-green-400"></span>
                    Opera 72+
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-2 font-semibold text-yellow-400">
                  ⚠️ Partial Support (fallback mode)
                </p>
                <ul className="ml-4 list-none space-y-1">
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-yellow-400"></span>
                    Brave (manual file selection)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-yellow-400"></span>
                    Firefox (manual file selection)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-yellow-400"></span>
                    Safari (manual file selection)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-upheaval mb-4 text-2xl text-red-400">
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
                  <span className="text-lg text-red-500">▶</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="font-upheaval mb-4 text-2xl text-yellow-400">
              📊 Status
            </h2>
            {save ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-green-500/30 bg-green-900/20 p-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="font-semibold text-green-300">File Loaded</p>
                    <p className="text-xs text-gray-400">
                      Ready to view your progress
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-3 rounded-lg border p-3 ${
                    useFallback
                      ? "border-red-500/30 bg-red-900/20"
                      : "border-green-500/30 bg-green-900/20"
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
              <div className="py-8 text-center">
                <p className="text-sm text-gray-500">No save file loaded yet</p>
                <p className="mt-2 text-xs text-gray-600">
                  Load a file to view statistics
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Future Developments Section */}
        <div className="card p-6">
          <h3 className="font-upheaval mb-4 text-xl text-purple-400">
            🚀 Future Developments
          </h3>
          <div className="space-y-4 text-sm text-gray-300">
            <p className="text-gray-400">
              Upcoming features and improvements planned for future releases:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Detailed Views */}
              <div className="rounded-lg border border-purple-500/30 bg-purple-900/10 p-4">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-purple-300">
                  <span className="text-lg">🔍</span>
                  Detailed Views
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">▶</span>
                    <span>
                      <span className="font-semibold">Items Details:</span>{" "}
                      Comprehensive information about each item
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">▶</span>
                    <span>
                      <span className="font-semibold">Achievements Details:</span>{" "}
                      Unlock requirements and tips
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">▶</span>
                    <span>
                      <span className="font-semibold">Entities Details:</span>{" "}
                      Stats, behaviors, and strategies
                    </span>
                  </li>
                </ul>
              </div>

              {/* Real-time Tracking */}
              <div className="rounded-lg border border-blue-500/30 bg-blue-900/10 p-4">
                <h4 className="mb-3 flex items-center gap-2 font-semibold text-blue-300">
                  <span className="text-lg">📡</span>
                  Real-time Save Tracking
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">▶</span>
                    <span>
                      <span className="font-semibold">Desktop Monitoring:</span>{" "}
                      Background script to track save file changes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">▶</span>
                    <span>
                      <span className="font-semibold">Online Sync:</span> Automatic
                      upload and real-time updates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">▶</span>
                    <span>
                      <span className="font-semibold">User Accounts:</span>{" "}
                      Personalized dashboards and cloud saves
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">▶</span>
                    <span>
                      <span className="font-semibold">Progress History:</span> Track
                      your journey over time
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-gray-700 bg-gray-900/30 p-3">
              <p className="text-xs text-gray-500">
                💡 These features are in planning phase. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="card p-6">
          <h3 className="font-upheaval mb-4 text-xl text-gray-400">ℹ️ About</h3>
          <div className="space-y-3 text-sm text-gray-400">
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
                className="text-red-400 underline transition-colors hover:text-red-300"
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
                className="text-red-400 underline transition-colors hover:text-red-300"
              >
                @Demorck_
              </a>{" "}
              on X and reworked by{" "}
              <a
                href="https://fayardthibault.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 underline transition-colors hover:text-red-300"
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
