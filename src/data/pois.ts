import {MapLocation} from "../types/MapLocation.ts";

const pois: MapLocation[] = [
    {
        name: "Sealed Cave",
        description: "The cave where Veldora was sealed and where Rimuru was born.",
        image: {
            url: "img/locations/sealed_cave.webp",
            name: "Sealed Cave",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken. Sourced from the Tensei Shitara Slime Datta Ken Wiki"
        },
        url: "https://tensura.fandom.com/wiki/Sealed_Cave",
        position: { x: "1660", y: "1060" }
    },
    {
        name: "Lake Siss",
        description: "A great lake fed by the Ameld River. Home to the Lizardman tribe.",
        image: {
            url: "img/locations/lake_siss.webp",
            name: "Lake Siss",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken. Sourced from the Tensei Shitara Slime Datta Ken Wiki"
        },
        url: "https://tensura.fandom.com/wiki/Lake%20Siss",
        position: { x: "1835", y: "1100" }
    },
    {
        name: "Khusha Mountains",
        description: "A large mountain range that runs from the coast into the Jura Forest. Home to the Tengu tribe.",
        image: {
            url: "img/locations/khusha_mountains.webp",
            name: "Khusha Mountains Episode 64",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken, Episode 64. Sourced from the Tensei Shitara Slime Datta Ken Wiki"
        },
        url: "https://tensura.fandom.com/wiki/Khusha%20Mountains",
        position: { x: "1600", y: "1180" }
    },
    {
        name: "Scroching God Mountain",
        description: "The holy mountain where the scorch dragon Velgrynd is said to reside.",
        url: "https://tensura.fandom.com/wiki/Scorching%20God%20Mountain",
        position: { x: "2088", y: "680" }
    },
    {
        name: "Dragon's Den",
        description: "At the peak of the tallest mountain, the Great Canaat Mountains, lies the Dragon's Den where the Dragon Lords reside.",
        position: { x: "1720", y: "650" }
    },
    {
        name: "Charybdis Cave",
        description: "The cave where Charybis was sealed by the Chosen Hero in the distant past. It's location was known only to the hero and the Dryads.",
        image: {
            url: "img/locations/charybdis_cave.webp",
            name: "Charybdis Cave from Episode 18",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken, Episode 18. Sourced from the Tensei Shitara Slime Datta Ken Wiki"
        },
        position: { x: "1925", y: "990" }
    },
    {
        name: "Divine Tree",
        description: "The Divine Tree, a sacred relic designed to maintain the world. It is home to Elmine, Sarion's Capital.",
        url: "https://tensura.fandom.com/wiki/Divine%20Tree",
        position: { x: "1402", y: "1435" }
    },
    {
        name: "Ulgr Nature Park",
        description: "A nature preserve that was formerly home to the Dwelling of the Spirits.",
        position: { x: "1460", y: "1500" }
    },
    {
        name: "Heaven Tower",
        description: "The entrance to the Star Palace.",
        url: "https://tensura.fandom.com/wiki/Heaven%20Tower",
        position: { x: "330", y: "1170" }
    },
    {
        name: "Magic Tower",
        description: "The scholarly facility created by the Trinity Wisemen.",
        url: "https://tensura.fandom.com/wiki/Magic%20Tower",
        position: { x: "1138", y: "1355" }
    },
    {
        name: "Barren Lands",
        description: "The uninhabitable region laid to waste during the battle between Guy and Milim 2,000 years ago.",
        position: { x: "509", y: "940" }
    },
];

export default pois;