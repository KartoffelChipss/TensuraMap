/**
 * @typedef {Object} POIData
 * @property {string} name
 * @property {string} description
 * @property {POIImage?} image
 * @property {string?} url
 * @property {{x:string,y:string}} position
 */

/**
 * @typedef {Object} POIImage
 * @property {string} url
 * @property {string} name
 * @property {string} credit
 */

/**
 * @type {[POIData]}
 */
export const pois = [
    {
        name: "Sealed Cave",
        description: "The cave where Veldora was sealed and where Rimuru was born.",
        image: {
            url: "img/locations/sealed_cave.webp",
            name: "Sealed Cave",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken. Sourced from the Tensei Shitara Slime Datta Ken Wiki"
        },
        url: "https://tensura.fandom.com/wiki/Sealed_Cave",
        position: { x: "1680", y: "1080" }
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
        position: { x: "1850", y: "1121" }
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
        position: { x: "1618", y: "1240" }
    },
    {
        name: "Scroching God Mountain",
        description: "The holy mountain where the scorch dragon Velgrynd is said to reside.",
        url: "https://tensura.fandom.com/wiki/Scorching%20God%20Mountain",
        position: { x: "2111", y: "700" }
    },
    {
        name: "Dragon's Den",
        description: "At the peak of the tallest mountain, the Great Canaat Mountains, lies the Dragon's Den where the Dragon Lords reside.",
        position: { x: "1740", y: "665" }
    },
    {
        name: "Charybdis Cave",
        description: "The cave where Charybis was sealed by the Chosen Hero in the distant past. It's location was known only to the hero and the Dryads.",
        image: {
            url: "img/locations/charybdis_cave.webp",
            name: "Charybdis Cave from Episode 18",
            credit: "Screenshot from Tensei Shitara Slime Datta Ken, Episode 18. Sourced from the Tensei Shitara Slime Datta Ken Wiki"
        },
        position: { x: "1956", y: "1010" }
    },
    {
        name: "Divine Tree",
        description: "The Divine Tree, a sacred relic designed to maintain the world. It is home to Elmine, Sarion's Capital.",
        url: "https://tensura.fandom.com/wiki/Divine%20Tree",
        position: { x: "1420", y: "1450" }
    },
    {
        name: "Ulgr Nature Park",
        description: "A nature preserve that was formerly home to the Dwelling of the Spirits.",
        position: { x: "1480", y: "1520" }
    },
    {
        name: "Heaven Tower",
        description: "The entrance to the Star Palace.",
        url: "https://tensura.fandom.com/wiki/Heaven%20Tower",
        position: { x: "350", y: "1205" }
    },
    {
        name: "Magic Tower",
        description: "The scholarly facility created by the Trinity Wisemen.",
        url: "https://tensura.fandom.com/wiki/Magic%20Tower",
        position: { x: "1165", y: "1375" }
    },
    {
        name: "Barren Lands",
        description: "The uninhabitable region laid to waste during the battle between Guy and Milim 2,000 years ago.",
        position: { x: "509", y: "940" }
    },
]