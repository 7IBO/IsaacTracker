import { DifficultyEnum } from "@/Helpers/Enums/Difficulties";
import { CharacterEnum, Characters } from "@/Helpers/Enums/Characters";
import { MarkEnum } from "@/Helpers/Enums/Marks";
import { VersionEnum } from "@/Helpers/Enums/Versions";

export class Character {
  private _character: CharacterEnum;
  private _tainted: boolean;
  private _soloMarks: Map<MarkEnum, DifficultyEnum>;
  private _onlineMarks: Map<MarkEnum, DifficultyEnum>;
  private _id: number;

  constructor(name: string, id: number) {
    this._character = Characters.getCharacter(name);
    this._tainted = Characters.isTainted(this._character);
    this._soloMarks = new Map<MarkEnum, DifficultyEnum>();
    this._onlineMarks = new Map<MarkEnum, DifficultyEnum>();
    this._id = id;
  }

  public setSoloMark(mark: MarkEnum, difficulty: DifficultyEnum): void {
    this._soloMarks.set(mark, difficulty);
  }

  public getSoloMark(mark: MarkEnum): DifficultyEnum {
    return this._soloMarks.get(mark) ?? DifficultyEnum.NONE;
  }

  public getSoloMarks(): Map<MarkEnum, DifficultyEnum> {
    return new Map(this._soloMarks);
  }

  public setOnlineMark(mark: MarkEnum, difficulty: DifficultyEnum): void {
    this._onlineMarks.set(mark, difficulty);
  }

  public getOnlineMark(mark: MarkEnum): DifficultyEnum {
    return this._onlineMarks.get(mark) ?? DifficultyEnum.NONE;
  }

  public setMark(
    mark: MarkEnum,
    difficulty: DifficultyEnum,
    type: VersionEnum,
  ): void {
    if (type == VersionEnum.ONLINE) {
      this.setOnlineMark(mark, difficulty);
    } else {
      this.setSoloMark(mark, difficulty);
    }
  }

  public getOnlineMarks(): Map<MarkEnum, DifficultyEnum> {
    return new Map(this._onlineMarks);
  }

  public getID(): number {
    return this._id;
  }

  public getName(): string {
    return this._character.toString();
  }
}
