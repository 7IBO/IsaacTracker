export enum ChallengeEnum {
  "Pitch Black" = 1,
  "High Brow",
  "Head Trauma",
  "Darkness Falls",
  "The Tank",
  "Solar System",
  "Suicide King",
  "Cat Got Your Tongue",
  "Demo Man",
  "Cursed!",
  "Glass Cannon",
  "When Life Gives You Lemons",
  "Beans!",
  "It's in the Cards",
  "Slow Roll",
  "Computer Savvy",
  "Waka Waka",
  "The Host",
  "The Family Man",
  "Purist",
  "XXXXXXXXL",
  "SPEED!",
  "Blue Bomber",
  "PAY TO PLAY",
  "Have a Heart",
  "I RULE!",
  "BRAINS!",
  "PRIDE DAY!",
  "Onan's Streak",
  "The Guardian",
  "Backasswards",
  "Aprils Fool",
  "Pokey Mans",
  "Ultra Hard",
  "Pong",
  "Scat Man",
  "Bloody Mary",
  "Baptism by Fire",
  "Isaac's Awakening",
  "Seeing Double",
  "Pica Run",
  "Hot Potato",
  "Cantripped!",
  "Red Redemption",
  "DELETE THIS",
}

export namespace Challenges {
  export function get(index: number): ChallengeEnum {
    const values = Object.values(ChallengeEnum);
    if (index < 0 || index >= values.length) {
      throw new Error("Index out of bounds");
    }
    return values[index].valueOf() as ChallengeEnum;
  }

  export function getChallenge(name: string): ChallengeEnum {
    const challenge = Object.values(ChallengeEnum).find(
      (c) => c.toString() === name,
    );
    if (challenge === undefined) {
      throw new Error("Challenge not found");
    }
    return challenge.valueOf() as ChallengeEnum;
  }

  export function getID(name: string): number {
    return parseInt(ChallengeEnum[Challenges.getChallenge(name)]);
  }

  export function getString(index: number): string {
    return Challenges.get(index).toString();
  }
}
