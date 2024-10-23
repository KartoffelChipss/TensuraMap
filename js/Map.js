/**
 * Map class for creating interactive maps with SVG
 */
export default class Map {
    /**
     * @param {string} svgId - The ID of the SVG element
     * @param {string} mapImage - The URL of the map image
     */
    constructor(svgId, mapImage) {
        this.svg = document.getElementById(svgId);
        this.svg.innerHTML = "";

        this.g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.svg.appendChild(this.g);

        this.g.innerHTML += `<image href="${mapImage}" width="100%"/>`;

        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.initialTranslateX = 0;
        this.initialTranslateY = 0;
        this.initialScale = 1;

        this.dragSensitivity = 2;
        this.maxScale = 6;
        this.minScale = 1;

        this.initializeEvents();
    }

    initializeEvents() {
        this.svg.addEventListener("mousedown", (e) => this.onMouseDown(e));
        this.svg.addEventListener("mousemove", (e) => this.onMouseMove(e));
        this.svg.addEventListener("mouseup", () => this.onMouseUp());
        this.svg.addEventListener("mouseleave", () => this.onMouseUp());
        this.svg.addEventListener("wheel", (e) => this.onWheel(e));
    }

    /**
     * Set the zoom level
     * @param {number} zoomLevel - The zoom level
     */
    setZoomLevel(zoomLevel) {
        const svgRect = this.svg.getBoundingClientRect();
        const centerX = svgRect.width / 2;
        const centerY = svgRect.height / 2;

        const [translate, scale] = this.parseTransform(this.g.getAttribute("transform") || "translate(0,0) scale(1)");
        const newScale = Math.min(Math.max(zoomLevel, this.minScale), this.maxScale);

        const svgPoint = this.svg.createSVGPoint();
        svgPoint.x = centerX;
        svgPoint.y = centerY;
        const centerPoint = svgPoint.matrixTransform(this.svg.getScreenCTM().inverse());

        const newTranslateX = translate[0] - (centerPoint.x - translate[0]) * (newScale / scale - 1);
        const newTranslateY = translate[1] - (centerPoint.y - translate[1]) * (newScale / scale - 1);

        this.g.setAttribute("transform", `translate(${newTranslateX}, ${newTranslateY}) scale(${newScale})`);
    }

    /**
     * Zoom in
     * @param factor - The zoom factor
     */
    zoomIn(factor = 1.1) {
        const [translate, scale] = this.parseTransform(this.g.getAttribute("transform") || "translate(0,0) scale(1)");
        const newScale = Math.min(scale * factor, this.maxScale);
        this.setZoomLevel(newScale);
    }

    /**
     * Zoom out
     * @param {number} factor - The zoom factor
     */
    zoomOut(factor = 0.9) {
        const [translate, scale] = this.parseTransform(this.g.getAttribute("transform") || "translate(0,0) scale(1)");
        const newScale = Math.max(scale * factor, this.minScale);
        this.setZoomLevel(newScale);
    }

    onMouseDown(e) {
        if (!this.g.getAttribute("transform") || this.g.getAttribute("transform").includes("scale(1)")) return;
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;

        const [translate, scale] = this.parseTransform(this.g.getAttribute("transform") || "translate(0,0) scale(1)");
        this.initialTranslateX = translate[0];
        this.initialTranslateY = translate[1];
        this.initialScale = scale;
    }

    onMouseMove(e) {
        if (!this.isDragging) return;

        const svgRect = this.svg.getBoundingClientRect();
        const mapRect = this.g.getBBox();

        const deltaX = (e.clientX - this.startX) * this.dragSensitivity;
        const deltaY = (e.clientY - this.startY) * this.dragSensitivity;

        let newTranslateX = this.initialTranslateX + deltaX;
        let newTranslateY = this.initialTranslateY + deltaY;

        const scale = this.initialScale;
        const mapWidth = mapRect.width * scale;
        const mapHeight = mapRect.height * scale;
        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;

        const minTranslateX = Math.min(0, svgWidth - mapWidth);
        const minTranslateY = Math.min(0, svgHeight - mapHeight);

        const maxTranslateX = 0;
        const maxTranslateY = 0;

        newTranslateX = Math.max(minTranslateX, Math.min(maxTranslateX, newTranslateX));
        newTranslateY = Math.max(minTranslateY, Math.min(maxTranslateY, newTranslateY));

        this.g.setAttribute("transform", `translate(${newTranslateX}, ${newTranslateY}) scale(${scale})`);
    }

    onMouseUp() {
        this.isDragging = false;
    }

    onWheel(e) {
        e.preventDefault();

        const [translate, scale] = this.parseTransform(this.g.getAttribute("transform") || "translate(0,0) scale(1)");
        const newScale = Math.min(Math.max(scale * (e.deltaY > 0 ? 0.9 : 1.1), 1), this.maxScale);

        if (newScale === 1) {
            this.g.setAttribute("transform", `translate(0,0) scale(1)`);
        } else {
            const svgPoint = this.svg.createSVGPoint();
            svgPoint.x = e.clientX;
            svgPoint.y = e.clientY;
            const mousePoint = svgPoint.matrixTransform(this.svg.getScreenCTM().inverse());

            const newTranslateX = translate[0] - (mousePoint.x - translate[0]) * (newScale / scale - 1);
            const newTranslateY = translate[1] - (mousePoint.y - translate[1]) * (newScale / scale - 1);
            this.g.setAttribute("transform", `translate(${newTranslateX}, ${newTranslateY}) scale(${newScale})`);
        }
    }

    parseTransform(transform) {
        const translateMatch = transform.match(/translate\(([^)]+)\)/);
        const scaleMatch = transform.match(/scale\(([^)]+)\)/);
        const translate = translateMatch ? translateMatch[1].split(",").map(Number) : [0, 0];
        const scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
        return [translate, scale];
    }

    addPolygon(points, attributes = {}) {
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", points);
        Object.entries(attributes).forEach(([key, value]) => polygon.setAttribute(key, value));
        this.g.appendChild(polygon);
    }

    addSVGElement(svgString) {
        this.g.innerHTML += svgString;
    }
}