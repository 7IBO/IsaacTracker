import { Constants } from "@/Helpers/Constants";
import { Difficulty } from "@/Helpers/Enums/Difficulties";
import { Achievements } from "@/Helpers/Enums/Achievements";
import { Characters } from "@/Helpers/Enums/Characters";
import { entities } from "@/Helpers/Enums/Entities";
import { VersionEnum } from "@/Helpers/Enums/Versions";
import { Achievement } from "@/Models/Achievement";
import { Challenge } from "@/Models/Challenge";
import { Character } from "@/Models/Character";
import { Entity } from "@/Models/Entity";
import { Item } from "@/Models/Item";
import { SaveManager } from "@/Models/SaveManager";

export class Save {
  private _manager: SaveManager;
  private _characters: Character[];
  private _achievements: Achievement[];
  private _items: Item[];
  private _challenges: Challenge[];
  private _entities: Entity[];
  private _version: VersionEnum;
  private _stats: Map<string, number>;
  private _filename: string;

  constructor() {
    this._manager = new SaveManager();
    this._characters = new Array(Constants.NUMBER_OF_CHARACTERS);
    this._achievements = new Array(Constants.NUMBER_OF_ACHIEVEMENTS);
    this._items = new Array(Constants.NUMBER_OF_ITEMS);
    this._challenges = new Array(Constants.NUMBER_OF_CHALLENGES);
    this._entities = new Array(Constants.NUMBER_OF_ENTITIES);
    this._stats = new Map();
    this._version = VersionEnum.UNDEFINED;
    this._filename = "";
  }

  public async update(dataFile: Uint8Array): Promise<void> {
    await this.load(dataFile);
  }

  public async load(dataFile: Uint8Array): Promise<void> {
    try {
      await this._manager.load(dataFile);
    } catch (error) {
      await Promise.reject(error);
    }

    const populateTasks = [
      this.populateVersion.bind(this),
      this.populateCharacters.bind(this),
      this.populateAchievements.bind(this),
      this.populateItems.bind(this),
      this.populateChallenges.bind(this),
      this.populateEntities.bind(this),
      this.populateStats.bind(this),
    ];

    const runTasks = async (tasks: (() => void)[]) => {
      if (tasks.length === 0) return;

      const task = tasks.shift();
      task!();

      await new Promise((resolve) => requestAnimationFrame(resolve));
      await runTasks(tasks);
    };

    await runTasks([...populateTasks]);
  }

  private populateCharacters(): void {
    for (let i = 0; i < Constants.NUMBER_OF_CHARACTERS; i++) {
      this._characters[i] = new Character(Characters.get(i), i);
      let markData = this._manager.getSpecificMark(i);

      for (let j = 0; j < Constants.NUMBER_OF_MARKS; j++) {
        let mark = j;
        let difficulty = markData[j];
        let soloDifficulty = Difficulty.getSoloDifficulty(difficulty);
        let onlineDifficulty = Difficulty.getOnlineDifficulty(difficulty);

        this._characters[i].setSoloMark(mark, soloDifficulty);
        this._characters[i].setOnlineMark(mark, onlineDifficulty);
      }
    }
  }

  private async populateAchievements(): Promise<void> {
    let numberAchievement =
      Constants.VERSION_LOADED == VersionEnum.ONLINE
        ? Constants.NUMBER_OF_ONLINE_ACHIEVEMENTS
        : Constants.NUMBER_OF_ACHIEVEMENTS;
    for (let i = 0; i < numberAchievement; i++) {
      this._achievements[i] = new Achievement(Achievements.getString(i));
      let unlocked = this._manager.achievements[i] == 1;
      this._achievements[i].setUnlocked(unlocked);
    }
  }

  private populateItems(): void {
    for (let i = 0; i < Constants.NUMBER_OF_ITEMS; i++) {
      this._items[i] = new Item(i + 1);
      let seen = this._manager.items[i] == 1;
      this._items[i].setSeen(seen);
    }
  }

  private populateChallenges(): void {
    for (let i = 0; i < Constants.NUMBER_OF_CHALLENGES; i++) {
      let done = this._manager.challenges[i] == 1;
      this._challenges[i] = new Challenge(i);
      this._challenges[i].setDone(done);
    }
  }

  private populateEntities(): void {
    for (let i = 0; i < Constants.NUMBER_OF_ENTITIES; i++) {
      let entity = entities[i];
      let special = entity.isSpecial ? true : false;
      this._entities[i] = new Entity(
        entity.id,
        entity.name,
        entity.variant,
        entity.isBoss,
        special,
      );
      this._entities[i].setKills(this._manager.kills[i]);
      this._entities[i].setDeaths(this._manager.deaths[i]);
      this._entities[i].setHits(this._manager.hits[i]);
      this._entities[i].setEncounter(this._manager.encounters[i]);
    }
  }

  private populateVersion(): void {
    let version = this._manager.version;
    switch (version) {
      case Constants.LAST_VERSION:
        this._version = VersionEnum.REPENTANCE;
        break;
      case Constants.ONLINE_VERSION:
        this._version = VersionEnum.ONLINE;
        break;
      default:
        this._version = VersionEnum.UNDEFINED;
        break;
    }

    Constants.VERSION_LOADED = this._version;
  }

  private populateStats(): void {
    this._stats = this._manager.stats;
  }

  public get data(): Uint8Array {
    return this._manager.data;
  }

  public export(): Uint8Array {
    return this._manager.data;
  }

  public getAchievements(): Achievement[] {
    return this._achievements;
  }

  public getCharacters(): Character[] {
    return this._characters;
  }

  public getItems(): Item[] {
    return this._items;
  }

  public getChallenges(): Challenge[] {
    return this._challenges;
  }

  public getEntities(): Entity[] {
    return this._entities;
  }

  public getStats(): Map<string, number> {
    return this._stats;
  }

  public set_filename(name: string) {
    this._filename = name;
  }

  public get_filename() {
    return this._filename;
  }
}
