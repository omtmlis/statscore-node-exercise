import { Event, ParsedResult } from "../types";

export class EventParser {
  static parseEvents = (data: Event[]): ParsedResult[] => {
    return data
      .map((match) => {
        try {
          const name = `${match.participant1} - ${match.participant2}`;
          const score = this.formatScore(match);
          return { name, score };
        } catch (error: any) {
          // Uncomment the next line if you want to log errors
          //   console.error(error.message);
          return null;
        }
      })
      .filter(Boolean) as ParsedResult[];
  };

  static formatScore(match: Event): string {
    switch (match.sport) {
      case "soccer":
      case "handball":
        return this.formatHandballOrSoccerScore(match.score as string);
      case "tennis":
      case "volleyball":
        return this.formatTennisOrVolleyballScore(match.score as string);
      case "basketball":
        return this.formatBasketballScore(match.score as string[][]);
      default:
        throw new Error("Invalid sport");
    }
  }

  private static formatHandballOrSoccerScore(matchScore: string): string {
    if (!this.isValidBasicScore(matchScore)) {
      throw new Error("Invalid score format");
    }

    return matchScore;
  }

  private static formatTennisOrVolleyballScore(matchScore: string): string {
    const scores = (matchScore as string).match(
      /([0-9]+\:[0-9]+)(?:,([0-9]+\:[0-9]+))*/
    );

    if (!scores) {
      throw new Error("Invalid score format");
    }

    const sets = scores[0].split(",").slice(1);
    const formattedSets = sets
      .map((set, index) => `set${++index} ${set}`)
      .join(", ");

    return `Main score: ${scores[1]} (${formattedSets})`;
  }

  private static formatBasketballScore(matchScore: string[][]): string {
    const flatArr = (matchScore as string[][]).flat();

    if (
      !Array.isArray(matchScore) ||
      flatArr.length !== 4 ||
      !flatArr.every((quarterResult) => this.isValidBasicScore(quarterResult))
    ) {
      throw new Error("Invalid score format");
    }

    return flatArr.join(",");
  }

  private static isValidBasicScore(score: string): boolean {
    return /^[0-9]+\:[0-9]+$/.test(score);
  }
}
