import { Event, ParsedResult } from "../types";
import { EventParser } from "../entities/EventParser";

describe("EventParser", () => {
  describe("parseEvents", () => {
    test("should return the correct participants names in result", () => {
      const match: Event = {
        sport: "volleyball",
        participant1: "TeamA",
        participant2: "TeamB",
        score: "3:0,25:23,25:19,25:21",
      };

      const parsedEvent = EventParser.parseEvents([match]);
      expect(parsedEvent[0].name).toBe("TeamA - TeamB");
    });
  });
  describe("formatScore", () => {
    test("should return the correct score for soccer", () => {
      const match: Event = {
        sport: "soccer",
        participant1: "TeamA",
        participant2: "TeamB",
        score: "3:1",
      };

      expect(EventParser.formatScore(match)).toBe("3:1");
    });

    test("should return the correct score for tennis with multiple sets", () => {
      const match: Event = {
        sport: "tennis",
        participant1: "PlayerA",
        participant2: "PlayerB",
        score: "2:1,7:6,6:3,6:7",
      };

      expect(EventParser.formatScore(match)).toBe(
        "Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)"
      );
    });

    test("should throw an error for invalid sport", () => {
      const match: Event = {
        sport: "invalidSport",
        participant1: "TeamA",
        participant2: "TeamB",
        score: "invalidScore",
      };

      expect(() => EventParser.formatScore(match)).toThrow("Invalid sport");
    });

    test("should throw an error for invalid score format", () => {
      const match: Event = {
        sport: "soccer",
        participant1: "TeamA",
        participant2: "TeamB",
        score: "invalidScore",
      };

      expect(() => EventParser.formatScore(match)).toThrow(
        "Invalid score format"
      );
    });
  });
});
