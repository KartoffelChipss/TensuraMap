import Map from "./Map.js";

export default class SlimeMap extends Map {
    /**
     * @param {string} svgId - The ID of the SVG element
     * @param {string} mapImage - The URL of the map image
     * @param nations
     * @param capitals
     * @param pois
     * @param cities
     */
    constructor(svgId, mapImage, nations, capitals, pois, cities) {
        super(svgId, mapImage);
        this.nations = nations;
        this.capitals = capitals;
        this.pois = pois;
        this.cities = cities;
        this.addNations();
        this.addCapitals();
        this.addPOIs();
        this.addCities();
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
            <g transform="translate(${capital.position.x}, ${capital.position.y}) scale(2.5, 2.5)" fill="transparent"
                class="location"
                data-name="${capital.name}"
                data-url="${capital.url ?? ""}"
                data-description="${capital.description ?? ""}"
                data-image-url="${capital.image?.url ?? ""}"
                data-image-name="${capital.image?.name ?? ""}"
                data-image-credit="${capital.image?.credit ?? ""}">
                <rect x="0" y="0" width="24" height="24" fill="transparent" stroke="transparent" stroke-width="4" />
                <!-- Black outer stroke -->
                <path d="M4.5 14L3 15V21H7M7 21H10M7 21V13L9.5 11V6L12 3L14.5 6V11L17 13V21M10 21H14M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21M14 21H17M17 21H21V15L19.5 14"
                    stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                <!-- White inner stroke -->
                <path d="M4.5 14L3 15V21H7M7 21H10M7 21V13L9.5 11V6L12 3L14.5 6V11L17 13V21M10 21H14M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21M14 21H17M17 21H21V15L19.5 14"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>`;
            this.addSVGElement(svgString);
        }
    }

    addCities() {
        for (let city of this.cities) {
            const svgString = `
            <g transform="translate(${city.position.x}, ${city.position.y}) scale(2.5, 2.5)" fill="transparent"
                class="location"
                data-name="${city.name}"
                data-url="${city.url ?? ""}"
                data-description="${city.description ?? ""}"
                data-image-url="${city.image?.url ?? ""}"
                data-image-name="${city.image?.name ?? ""}"
                data-image-credit="${city.image?.credit ?? ""}">
                <rect x="0" y="0" width="24" height="24" fill="transparent" stroke="transparent" stroke-width="4" />
                <!-- Black border -->
                <path d="M15 3L3 19V21H21V19L9 3M12 15L16 21H8L12 15Z"
                    stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" transform="scale(.8, .8)"></path>
                <!-- White inner stroke -->
                <path d="M15 3L3 19V21H21V19L9 3M12 15L16 21H8L12 15Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="scale(.8, .8)"></path>
            </g>`;
            this.addSVGElement(svgString);
        }
    }

    addPOIs() {
        for (let poi of this.pois) {
            const svgString = `
            <g transform="translate(${poi.position.x}, ${poi.position.y}) scale(2, 2)" fill="transparent"
                class="location"
                data-name="${poi.name}"
                data-description="${poi.description}"
                data-url="${poi.url ?? ""}"
                data-image-url="${poi.image?.url ?? ""}"
                data-image-name="${poi.image?.name ?? ""}"
                data-image-credit="${poi.image?.credit ?? ""}">
                <rect width="24" height="24" fill="transparent" stroke="transparent" stroke-width="4" />
                <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                    stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                    stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
<!--                <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3"-->
<!--                    fill="white" stroke="black" stroke-width="1" />-->
            </g>`;
            this.addSVGElement(svgString);
        }
    }
}