import { Constants } from "../Constants";
import { VersionEnum } from "./Versions";

export enum DifficultyEnum {
  NONE = 0,
  NORMAL = 1,
  HARD = 2,
  ONLINE_NORMAL = 4,
  ONLINE_HARD = 8,
}

export namespace Difficulty {
  export function isOnline(difficulty: DifficultyEnum): boolean {
    return difficulty >> 2 != 0;
  }

  export function getSoloDifficulty(
    difficulty: DifficultyEnum,
  ): DifficultyEnum {
    let tmp = difficulty & 0b11;
    if (tmp == 3) return DifficultyEnum.HARD;
    return difficulty & 0b11;
  }

  export function getOnlineDifficulty(
    difficulty: DifficultyEnum,
  ): DifficultyEnum {
    let tmp = difficulty >> 2;
    if (tmp == 3) return DifficultyEnum.HARD;
    return difficulty >> 2;
  }

  export function getBitwisedDifficulty(
    solo: DifficultyEnum,
    online: DifficultyEnum,
  ) {
    if (Constants.VERSION_LOADED != VersionEnum.ONLINE) return solo;
    if (solo == DifficultyEnum.HARD)
      solo = DifficultyEnum.HARD | DifficultyEnum.NORMAL;
    online <<= 2;
    if (online == DifficultyEnum.ONLINE_HARD)
      online = DifficultyEnum.ONLINE_HARD | DifficultyEnum.ONLINE_NORMAL;

    return online | solo;
  }
}
