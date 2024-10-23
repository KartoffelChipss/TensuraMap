function drawMap() {
    const svg = document.getElementById("map");
    svg.innerHTML = "";

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svg.appendChild(g);

    g.innerHTML += `<image href="img/map.webp" width="100%"/>`;

    for (let nation of nations) {
        addNation(g, nation);
    }

    for (let capital of capitals) {
        addCapital(g, capital);
    }

    for (let poi of pois) {
        addPOI(g, poi);
    }

    let isDragging = false;
    let startX, startY, initialTranslateX, initialTranslateY, initialScale;

    const dragSensitivity = 2;
    const maxScale = 6;

    svg.addEventListener("mousedown", (e) => {
        if (!g.getAttribute("transform") || g.getAttribute("transform").includes("scale(1)")) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        // Get the current transform values, including scale
        const [translate, scale] = parseTransform(g.getAttribute("transform") || "translate(0,0) scale(1)");
        initialTranslateX = translate[0];
        initialTranslateY = translate[1];
        initialScale = scale;
    });

    svg.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        const svgRect = svg.getBoundingClientRect();
        const mapRect = g.getBBox(); // Get the bounding box of the map content

        // Calculate how far the mouse has moved
        const deltaX = (e.clientX - startX) * dragSensitivity;
        const deltaY = (e.clientY - startY) * dragSensitivity;

        // New translation values
        let newTranslateX = initialTranslateX + deltaX;
        let newTranslateY = initialTranslateY + deltaY;

        // Calculate boundaries
        const scale = initialScale;
        const mapWidth = mapRect.width * scale;
        const mapHeight = mapRect.height * scale;
        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;

        // Constrain the translation to prevent dragging out of bounds
        const minTranslateX = Math.min(0, svgWidth - mapWidth); // Minimum X translation
        const minTranslateY = Math.min(0, svgHeight - mapHeight); // Minimum Y translation

        const maxTranslateX = 0; // Maximum X translation
        const maxTranslateY = 0; // Maximum Y translation

        // Apply constraints
        newTranslateX = Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX));
        newTranslateY = Math.max(minTranslateY, Math.min(maxTranslateY, newTranslateY));

        // Apply the movement to the translation, using the stored initialScale
        g.setAttribute("transform", `translate(${newTranslateX}, ${newTranslateY}) scale(${scale})`);
    });

    svg.addEventListener("mouseup", () => {
        isDragging = false;
    });

    svg.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    svg.addEventListener("wheel", (e) => {
        e.preventDefault();

        const [translate, scale] = parseTransform(g.getAttribute("transform") || "translate(0,0) scale(1)");
        const newScale = Math.min(Math.max(scale * (e.deltaY > 0 ? 0.9 : 1.1), 1), maxScale);

        if (newScale === 1) {
            // Center the map when zoomed out
            g.setAttribute("transform", `translate(0,0) scale(1)`);
        } else {
            // Convert mouse position to SVG coordinates
            const svgPoint = svg.createSVGPoint();
            svgPoint.x = e.clientX;
            svgPoint.y = e.clientY;
            const mousePoint = svgPoint.matrixTransform(svg.getScreenCTM().inverse());

            // Adjust translation based on new scale
            const newTranslateX = translate[0] - (mousePoint.x - translate[0]) * (newScale / scale - 1);
            const newTranslateY = translate[1] - (mousePoint.y - translate[1]) * (newScale / scale - 1);
            g.setAttribute("transform", `translate(${newTranslateX}, ${newTranslateY}) scale(${newScale})`);
        }
    });

    function parseTransform(transform) {
        const translateMatch = transform.match(/translate\(([^)]+)\)/);
        const scaleMatch = transform.match(/scale\(([^)]+)\)/);
        const translate = translateMatch ? translateMatch[1].split(",").map(Number) : [0, 0];
        const scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
        return [translate, scale];
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