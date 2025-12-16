# The Binding of Isaac: Repentance - Save Viewer

A read-only save file viewer for The Binding of Isaac: Repentance, built with React + TypeScript + Vite + Tailwind CSS v4.

## Features

- 📖 **Read-Only Viewer**: View your save data without any risk of accidental modifications
- 🔄 **Auto-Refresh**: Automatically detects and displays changes every 5 seconds
- 📊 **Complete Stats**:
  - Achievements progress (unlocked/total + percentage)
  - Character marks (all difficulties)
  - Items collection (seen/total + percentage)
  - Challenges completion (completed/total + percentage)
  - Bestiary statistics (encountered/total + percentage)
- 🎨 **Modern UI**: Built with React and Tailwind CSS
- ⚡ **Fast**: Powered by Vite and Bun
- 🔒 **Privacy**: All operations happen locally, no data is sent to any server

## Browser Compatibility

This app uses the **File System Access API** for automatic folder access and auto-refresh:

**Full Support (with auto-refresh):**
- ✅ Chrome/Edge 86+
- ✅ Opera 72+

**Partial Support (fallback mode):**
- ⚠️ Brave (manual file selection, no auto-refresh)
- ⚠️ Firefox (manual file selection, no auto-refresh)
- ⚠️ Safari (manual file selection, no auto-refresh)

In fallback mode, you'll need to select the save file manually and reload it each time to see updates.

## Installation

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Steps

1. Clone the repository:
```bash
git clone https://github.com/Demorck/Isaac-save-manager.git
cd isaac-save-manager
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Click the "**Load Save File**" button on the home page
2. When prompted, navigate to your Isaac save folder:
   - **Windows**: `C:\Users\[YourName]\Documents\My Games\Binding of Isaac Repentance`
   - **Linux**: `~/.local/share/Steam/steamapps/compatdata/250900/pfx/drive_c/users/steamuser/Documents/My Games/Binding of Isaac Repentance`
3. Select the folder (you don't need to select a specific file)
4. The app will automatically load the most recent save file (`*.rep_persistentgamedata1.dat`)
5. Browse through the tabs to view your progress
6. The app will automatically refresh every 5 seconds to show the latest changes

## Project Structure

```
src/
├── components/
│   ├── Layout/          # Navigation, Modal, Loading
│   ├── Tabs/            # Different view tabs
│   ├── AchievementItem.tsx
│   ├── CharacterMarks.tsx
│   ├── ChallengeItem.tsx
│   ├── EntityItem.tsx
│   └── ItemDisplay.tsx
├── contexts/
│   └── SaveContext.tsx  # Global state management
├── Controllers/
│   └── SaveController.ts
├── Models/              # Data models
├── Helpers/             # Utility functions and enums
├── services/
│   └── FileSystemService.ts  # File system access
├── styles/
│   └── index.css        # Tailwind CSS
├── App.tsx
└── main.tsx
```

## Build for Production

```bash
bun run build
```

The built files will be in the `dist/` folder.

## Development

- **Dev server**: `bun run dev`
- **Build**: `bun run build`
- **Preview build**: `bun run preview`

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Bun** - JavaScript runtime & package manager
- **Tailwind CSS v4** - Styling
- **File System Access API** - Local file access

## Important Notes

- ⚠️ This is a **read-only** viewer - it cannot and will not modify your save files
- 🔒 All file operations happen locally in your browser
- 🔄 The app auto-refreshes every 5 seconds to show the latest save state
- 💾 No data is ever uploaded to any server
- 🌐 Works only in Chromium-based browsers (Chrome, Edge, Opera)

## Credits

- **Sprites**: [Binding of Isaac Rebirth Wiki](https://bindingofisaacrebirth.wiki.gg/)
- **Save file format**: Community research projects on GitHub

## Support & Contributions

- No ads, ever.
- Want to support development? You can donate on [Patreon](https://patreon.com/demorck).

## Contact

If you encounter any issues, please report them via:
- Twitter/X: [@Demorck_](https://x.com/Demorck_)
- GitHub Issues: [Create an issue](https://github.com/Demorck/Isaac-save-manager/issues)

## Disclaimer

Isaac Save Viewer is an independent project and is not sponsored by, affiliated with, or related to the creators or publishers of The Binding of Isaac.

## License

ISC License