function drawMap() {
    const svg = document.getElementById("map");
    svg.innerHTML = "";
    svg.innerHTML += `<image href="img/map.webp" width="100%"/>`;

    for (let nation of nations) {
        addNation(svg, nation);
    }

    for (let capital of capitals) {
        addCapital(svg, capital);
    }

    for (let poi of pois) {
        addPOI(svg, poi);
    }
}

/**
 * @param {Element} svg
 * @param {NationData} nation
 */
function addNation(svg, nation) {
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("class", "region");
    polygon.setAttribute("fill", "transparent");
    polygon.setAttribute("stroke", "transparent");
    polygon.setAttribute("stroke-width", "4");
    polygon.setAttribute("points", nation.points);
    polygon.setAttribute("data-name", nation.name);
    polygon.setAttribute("data-ruler", nation.ruler);
    polygon.setAttribute("data-capital", nation.capital);
    polygon.setAttribute("data-population", nation.population);
    polygon.setAttribute("data-description", nation.description);
    polygon.setAttribute("data-url", nation.url ?? "");
    svg.appendChild(polygon);
}

/**
 * @param {Element} svg
 * @param {CapitalData} capital
 */
function addCapital(svg, capital) {
    const svgString = `
    <g
            transform="translate(${capital.position.x}, ${capital.position.y}) scale(2.5, 2.5 )"
            class="location"
            data-name="${capital.name}"
            data-url="${capital.url ?? ""}"
            data-description="${capital.description ?? ""}"
    >
        <rect x="0" y="0" width="24" height="24" fill="transparent" stroke="transparent" stroke-width="4" />
        <path d="M4.5 14L3 15V21H7M7 21H10M7 21V13L9.5 11V6L12 3L14.5 6V11L17 13V21M10 21H14M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21M14 21H17M17 21H21V15L19.5 14"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" />
    </g>
    `;

    svg.innerHTML += svgString;
}

/**
 * @param {Element} svg
 * @param {POIData} poi
 */
function addPOI(svg, poi) {
    const svgString = `
    <g
            transform="translate(${poi.position.x}, ${poi.position.y}) scale(2, 2)"
            class="location"
            data-name="${poi.name}"
            data-description="${poi.description}"
            data-url="${poi.url ?? ""}"
    >
        <rect x="-12" y="-12" width="24" height="24" fill="transparent" stroke="transparent" stroke-width="4" />
        <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3"
                 fill="white" stroke="black" stroke-width="1" />
    </g>
    `;

    svg.innerHTML += svgString;
}

drawMap();