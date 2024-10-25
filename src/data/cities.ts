import {MapLocation} from "../types/MapLocation.ts";

const cities: MapLocation[] = [
    {
        name: "Tengu Village",
        description: "The village of the Tengu tribe, located in the Khusha Mountains.",
        image: {
            url: "img/locations/tengu_village.webp",
            name: "Tengu Village from Episode 64",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken, Episode 64."
        },
        position: { x: "1638", y: "1252" }
    },
    {
        name: "Ogre Village",
        description: "The site of the former Ogre Village, prior to it being destroyed in the Orc War.",
        image: {
            url: "img/locations/ogre_village.webp",
            name: "Ogre Village from Episode 1",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken, Episode 1. Sourced from the Tensei Shitara Slime Datta Ken Wiki"
        },
        position: { x: "1780", y: "1190" }
    },
    {
        name: "Treant Village",
        description: "The former location of the Treant Village, prior to them moving to Floor 95 of the Dungeon.",
        position: { x: "1957", y: "1100" }
    },
    {
        name: "Gozu and Mezu Villages",
        description: "The homeland of both the Gozu and the Mezu tribes, which has been ravaged by their conflict for the last century.",
        position: { x: "1990", y: "1020" }
    },
    {
        name: "Migam Earldom",
        description: "The territory of the noble house of Migam, in charge of the nation's border with the Jura Forest.",
        image: {
            url: "img/locations/migam_domain.webp",
            name: "Migam Earldom from Episode 57",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken, Episode 57. Sourced from the Tensei Shitara Slime Datta Ken Wiki"
        },
        position: { x: "1540", y: "930" }
    },
    {
        name: "Muller March",
        description: "The territory of the noble house of muller, distant relatives of the Blumund royal family.",
        position: { x: "1465", y: "980" }
    },
    {
        name: "Guratol County",
        description: "A small territory ruled by Count Guratol with his wife Ulamuth Guratol.",
        image: {
            url: "img/locations/guratol_county.webp",
            name: "Guratol County",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken. Sourced from the Tensei Shitara Slime Datta Ken Wiki"
        },
        position: { x: "1224", y: "1010" }
    },
];

export default cities;