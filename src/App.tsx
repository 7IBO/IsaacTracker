import { useState } from "react";
import { SaveProvider } from "./contexts/SaveContext";
import { Navigation } from "./components/Layout/Navigation";
import { HomeTab } from "./components/Tabs/HomeTab";
import { AchievementsTab } from "./components/Tabs/AchievementsTab";
import { MarksTab } from "./components/Tabs/MarksTab";
import { ItemsTab } from "./components/Tabs/ItemsTab";
import { ChallengesTab } from "./components/Tabs/ChallengesTab";
import { BestiaryTab } from "./components/Tabs/BestiaryTab";

function App() {
  const [activeTab, setActiveTab] = useState("menu");
  // const [isLoading, setIsLoading] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "menu":
        return <HomeTab />;
      case "achievements":
        return <AchievementsTab />;
      case "marks":
        return <MarksTab />;
      case "items":
        return <ItemsTab />;
      case "challenges":
        return <ChallengesTab />;
      case "bestiary":
        return <BestiaryTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <SaveProvider>
      <div className="min-h-screen flex flex-col">
        {/* <Loading isVisible={isLoading} /> */}

        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grow container mx-auto p-4">{renderTabContent()}</div>
      </div>
    </SaveProvider>
  );
}

export default App;
