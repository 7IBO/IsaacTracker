import { useState } from "react";
import { useSave } from "../../contexts/SaveContext";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoaded } = useSave();

  const tabs = [
    { id: "menu", label: "🏠 Home", icon: "🏠", alwaysVisible: true },
    {
      id: "achievements",
      label: "🏆 Achievements",
      icon: "🏆",
      alwaysVisible: false,
    },
    { id: "marks", label: "✅ Marks", icon: "✅", alwaysVisible: false },
    { id: "items", label: "🎁 Items", icon: "🎁", alwaysVisible: false },
    {
      id: "challenges",
      label: "⚡ Challenges",
      icon: "⚡",
      alwaysVisible: false,
    },
    { id: "bestiary", label: "👹 Bestiary", icon: "👹", alwaysVisible: false },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-red-900/30 bg-linear-to-b from-black/80 to-black/60 shadow-2xl backdrop-blur-lg">
      <div className="mx-auto max-w-7xl">
        {/* Mobile Menu Button */}
        <div className="flex items-center justify-between px-6 py-4 lg:hidden">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💀</span>
            <span className="font-upheaval text-xl text-white">
              Isaac Viewer
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white transition-colors hover:text-red-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden bg-linear-to-b from-black/95 to-black/80 backdrop-blur-lg transition-all duration-300 ease-in-out lg:hidden`}
        >
          <div className="flex flex-col gap-1 px-4 py-2">
            {tabs.map((tab) =>
              !tab.alwaysVisible && !isLoaded ? null : (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                    activeTab === tab.id
                      ? "border border-red-500/50 bg-linear-to-r from-red-900/50 to-red-800/50 text-white shadow-lg"
                      : "text-gray-300 hover:bg-red-900/20 hover:text-white"
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-semibold">
                    {tab.label.replace(/^[^\s]+ /, "")}
                  </span>
                  {activeTab === tab.id && (
                    <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-red-500"></span>
                  )}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-center gap-2 px-6 py-2 lg:flex">
          {tabs.map((tab) =>
            !tab.alwaysVisible && !isLoaded ? null : (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`group relative rounded-xl px-6 py-3 font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "scale-105 bg-linear-to-br from-red-900 to-red-800 text-white shadow-lg shadow-red-900/50"
                    : "text-gray-300 hover:bg-red-900/20 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`text-xl transition-transform group-hover:scale-110 ${
                      activeTab === tab.id ? "animate-pulse" : ""
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label.replace(/^[^\s]+ /, "")}</span>
                </span>
                {activeTab === tab.id && (
                  <span className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-linear-to-r from-transparent via-red-500 to-transparent"></span>
                )}
              </button>
            ),
          )}
        </div>
      </div>
    </nav>
  );
};
