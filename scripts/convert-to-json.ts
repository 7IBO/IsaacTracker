#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { Save } from "../src/Models/Save";
import { VersionEnum } from "../src/Helpers/Enums/Versions";
import { Character } from "../src/Models/Character";

// Polyfill requestAnimationFrame for Node.js environment
if (typeof globalThis.requestAnimationFrame === "undefined") {
  (globalThis as any).requestAnimationFrame = (
    callback: FrameRequestCallback,
  ) => {
    return setTimeout(callback, 0);
  };
}

interface JsonOutput {
  metadata: {
    filename: string;
    version: string;
    exportDate: string;
  };
  characters: Array<{
    id: number;
    name: string;
    marks: {
      solo: Record<string, number>;
      online: Record<string, number>;
    };
  }>;
  achievements: Array<{
    id: number;
    name: string;
    unlocked: boolean;
  }>;
  items: Array<{
    id: number;
    seen: boolean;
  }>;
  challenges: Array<{
    id: number;
    done: boolean;
  }>;
  bestiary: Array<{
    id: number;
    name: string;
    variant: number;
    isBoss: boolean;
    isSpecial: boolean;
    kills: number;
    deaths: number;
    hits: number;
    encounters: number;
  }>;
  stats: Record<string, number>;
}

async function convertToJson(
  inputPath: string,
  outputPath?: string,
): Promise<void> {
  try {
    console.log(`Reading file: ${inputPath}`);

    // Read the .dat file
    const fileBuffer = readFileSync(inputPath);
    const dataArray = new Uint8Array(fileBuffer);

    console.log(`File size: ${dataArray.length} bytes`);

    // Create Save instance and load data
    const save = new Save();

    console.log("Parsing save file...");
    await save.load(dataArray);

    console.log("Extracting data...");

    // Get version
    let versionStr = "Unknown";
    const version = (save as any)._version;
    if (version === VersionEnum.REPENTANCE) {
      versionStr = "Repentance";
    } else if (version === VersionEnum.ONLINE) {
      versionStr = "Repentance+";
    }

    // Extract all data
    const characters = save.getCharacters().map((char: Character) => {
      const soloMarks: Record<string, number> = {};
      const onlineMarks: Record<string, number> = {};

      char.getSoloMarks().forEach((difficulty, mark) => {
        soloMarks[`mark_${mark}`] = difficulty;
      });

      char.getOnlineMarks().forEach((difficulty, mark) => {
        onlineMarks[`mark_${mark}`] = difficulty;
      });

      return {
        id: char.getID(),
        name: char.getName(),
        marks: {
          solo: soloMarks,
          online: onlineMarks,
        },
      };
    });

    const achievements = save.getAchievements().map((ach) => ({
      id: ach.getID(),
      name: ach.toString(),
      unlocked: ach.unlocked,
    }));

    const items = save.getItems().map((item) => ({
      id: item.getID(),
      seen: item.isSeen(),
    }));

    const challenges = save.getChallenges().map((challenge) => ({
      id: challenge.getID(),
      done: challenge.isDone(),
    }));

    const bestiary = save.getEntities().map((entity) => ({
      id: entity.getId(),
      name: entity.getName(),
      variant: entity.getVariant(),
      isBoss: entity.isBoss(),
      isSpecial: entity.isSpecial(),
      kills: entity.getKills(),
      deaths: entity.getDeaths(),
      hits: entity.getHits(),
      encounters: entity.getEncounter(),
    }));

    // Get stats
    const statsMap = save.getStats();
    const stats: Record<string, number> = {};
    statsMap.forEach((value, key) => {
      stats[key] = value;
    });

    // Build JSON output
    const jsonOutput: JsonOutput = {
      metadata: {
        filename: inputPath.split(/[\\/]/).pop() || "unknown",
        version: versionStr,
        exportDate: new Date().toISOString(),
      },
      characters,
      achievements,
      items,
      challenges,
      bestiary,
      stats,
    };

    // Determine output path
    const output = outputPath || inputPath.replace(/\.dat$/, ".json");

    console.log(`Writing JSON to: ${output}`);
    writeFileSync(output, JSON.stringify(jsonOutput, null, 2), "utf-8");

    console.log("✅ Conversion complete!");
    console.log(`\nSummary:`);
    console.log(`  Version: ${versionStr}`);
    console.log(`  Characters: ${characters.length}`);
    console.log(
      `  Achievements: ${achievements.length} (${
        achievements.filter((a) => a.unlocked).length
      } unlocked)`,
    );
    console.log(
      `  Items: ${items.length} (${items.filter((i) => i.seen).length} seen)`,
    );
    console.log(
      `  Challenges: ${challenges.length} (${
        challenges.filter((c) => c.done).length
      } completed)`,
    );
    console.log(`  Bestiary entries: ${bestiary.length}`);
    console.log(`  Stats: ${Object.keys(stats).length} entries`);
  } catch (error) {
    console.error("❌ Error during conversion:");
    console.error(error);
    process.exit(1);
  }
}

// CLI interface
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage: tsx scripts/convert-to-json.ts <input.dat> [output.json]

Converts a Binding of Isaac save file (.dat) to JSON format.

Arguments:
  input.dat    Path to the .dat save file
  output.json  Optional output path (default: same name with .json extension)

Example:
  tsx scripts/convert-to-json.ts 20251215.rep_persistentgamedata1.dat
  tsx scripts/convert-to-json.ts save.dat output.json
`);
  process.exit(0);
}

const inputPath = resolve(args[0]);
const outputPath = args[1] ? resolve(args[1]) : undefined;

convertToJson(inputPath, outputPath);
