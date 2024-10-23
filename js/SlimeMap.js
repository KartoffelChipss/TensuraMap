import Map from "./Map.js";

export default class SlimeMap extends Map {
    /**
     * @param {string} svgId - The ID of the SVG element
     * @param {string} mapImage - The URL of the map image
     * @param nations
     * @param capitals
     * @param pois
     */
    constructor(svgId, mapImage, nations, capitals, pois) {
        super(svgId, mapImage);
        this.nations = nations;
        this.capitals = capitals;
        this.pois = pois;
        this.addNations();
        this.addCapitals();
        this.addPOIs();
    }

    addNations() {
        for (let nation of this.nations) {
            this.addPolygon(nation.points, {
                class: "region",
                fill: "transparent",
                stroke: "transparent",
                "stroke-width": "4",
                "data-name": nation.name,
                "data-ruler": nation.ruler,
                "data-capital": nation.capital,
                "data-population": nation.population,
                "data-description": nation.description,
                "data-url": nation.url ?? ""
            });
        }
    }

    addCapitals() {
        for (let capital of this.capitals) {
            const svgString = `
            <g transform="translate(${capital.position.x}, ${capital.position.y}) scale(2.5, 2.5)"
                class="location"
                data-name="${capital.name}"
                data-url="${capital.url ?? ""}"
                data-description="${capital.description ?? ""}">
                <rect x="0" y="0" width="24" height="24" fill="transparent" stroke="transparent" stroke-width="4" />
                <path d="M4.5 14L3 15V21H7M7 21H10M7 21V13L9.5 11V6L12 3L14.5 6V11L17 13V21M10 21H14M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21M14 21H17M17 21H21V15L19.5 14"
                stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>`;
            this.addSVGElement(svgString);
        }
    }

    addPOIs() {
        for (let poi of this.pois) {
            const svgString = `
            <g transform="translate(${poi.position.x}, ${poi.position.y}) scale(2, 2)"
                class="location"
                data-name="${poi.name}"
                data-description="${poi.description}"
                data-url="${poi.url ?? ""}">
                <rect x="-12" y="-12" width="24" height="24" fill="transparent" stroke="transparent" stroke-width="4" />
                <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3"
                    fill="white" stroke="black" stroke-width="1" />
            </g>`;
            this.addSVGElement(svgString);
        }
    }
}