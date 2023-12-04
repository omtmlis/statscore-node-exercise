import { EventParser } from "./entities/EventParser";
import { data } from "./constants";

const matchesParsed = EventParser.parseEvents(data);
console.log(matchesParsed);
