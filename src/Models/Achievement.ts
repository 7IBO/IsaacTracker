import { AchievementEnum, Achievements } from "@/Helpers/Enums/Achievements";
import { Constants } from "@/Helpers/Constants";

export class Achievement {
  private _achievement: AchievementEnum;
  private _unlocked: boolean;

  constructor(name: string) {
    this._achievement = Achievements.getAchievement(name);
    this._unlocked = false;
  }

  public setUnlocked(value: boolean): void {
    this._unlocked = value;
  }

  public getID(): number {
    return parseInt(AchievementEnum[this._achievement]);
  }

  public get unlocked(): boolean {
    return this._unlocked;
  }

  public toString(): string {
    return this._achievement.toString();
  }

  public isOnline(): boolean {
    return this.getID() > Constants.NUMBER_OF_ACHIEVEMENTS;
  }
}
