import {pois, capitals, nations, cities} from "./locations";
import SlimeMap from "./SlimeMap.js";

const slimeMap = new SlimeMap("map", "img/map.webp", nations, capitals, pois, cities);