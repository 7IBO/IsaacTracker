import { Items } from "@/Helpers/Enums/Items";

export class Item {
  private _id: number;
  private _name: string;
  private _seen: boolean;

  constructor(id: number) {
    this._id = Items.getIDfromIndex(id);
    this._name = Items.getName(id);
    this._seen = false;
  }

  public getID(): number {
    return this._id;
  }

  public isSeen(): boolean {
    return this._seen;
  }

  public setSeen(seen: boolean): void {
    this._seen = seen;
  }
}
