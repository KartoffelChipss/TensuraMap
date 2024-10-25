import React, { useEffect, useRef, useState } from "react";
import { MapLocation } from "../../types/MapLocation.ts";
import { MapRegion } from "../../types/MapRegion.ts";
import Capital from "./locations/Capital.tsx";
import City from "./locations/City.tsx";
import Poi from "./locations/Poi.tsx";
import MapLocationTooltip from "./tooltips/MapLocationTooltip.tsx";
import MapRegionTooltip from "./tooltips/MapRegionTooltip.tsx";

interface MapProps {
    imageUrl: string;
    regions?: MapRegion[];
    capitals?: MapLocation[];
    cities?: MapLocation[];
    pois?: MapLocation[];
}

const Map: React.FC<MapProps> = ({ imageUrl, regions = [], cities = [], pois = [], capitals = [] }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const gRef = useRef<SVGGElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);  // Ref for the tooltip
    const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; content: JSX.Element | null }>({
        visible: false,
        x: 0,
        y: 0,
        content: null,
    });

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);

    const dragSensitivity = 2;

    useEffect(() => {
        const svgElement = svgRef.current;
        const gElement = gRef.current;

        if (svgElement && gElement) {
            const handleMouseDown = (e: MouseEvent) => {
                setIsDragging(true);
                setStartX(e.clientX);
                setStartY(e.clientY);
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!isDragging || scale <= 1) return;

                const deltaX = (e.clientX - startX) * dragSensitivity;
                const deltaY = (e.clientY - startY) * dragSensitivity;
                setTranslate(prev => ({
                    x: prev.x + deltaX,
                    y: prev.y + deltaY,
                }));
                setStartX(e.clientX);
                setStartY(e.clientY);
            };

            const handleMouseUp = () => setIsDragging(false);
            const handleWheel = (e: WheelEvent) => {
                e.preventDefault();
                const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
                const newScale = Math.min(Math.max(scale * zoomFactor, 1), 6);
                if (newScale === 1) {
                    setTranslate({ x: 0, y: 0 });
                } else {
                    const svgPoint = svgElement.createSVGPoint();
                    svgPoint.x = e.clientX;
                    svgPoint.y = e.clientY;
                    const mousePoint = svgPoint.matrixTransform(svgElement.getScreenCTM()?.inverse());
                    const newTranslateX = translate.x - (mousePoint.x - translate.x) * (newScale / scale - 1);
                    const newTranslateY = translate.y - (mousePoint.y - translate.y) * (newScale / scale - 1);
                    setTranslate({ x: newTranslateX, y: newTranslateY });
                }
                setScale(newScale);
            };

            svgElement.addEventListener("mousedown", handleMouseDown);
            svgElement.addEventListener("mousemove", handleMouseMove);
            svgElement.addEventListener("mouseup", handleMouseUp);
            svgElement.addEventListener("mouseleave", handleMouseUp);
            svgElement.addEventListener("wheel", handleWheel);

            return () => {
                svgElement.removeEventListener("mousedown", handleMouseDown);
                svgElement.removeEventListener("mousemove", handleMouseMove);
                svgElement.removeEventListener("mouseup", handleMouseUp);
                svgElement.removeEventListener("mouseleave", handleMouseUp);
                svgElement.removeEventListener("wheel", handleWheel);
            };
        }
    }, [isDragging, startX, startY, scale]);

    const setDynamicTooltipPosition = (clientX: number, clientY: number) => {
        if (tooltipRef.current) {
            const { width, height } = tooltipRef.current.getBoundingClientRect();
            // console.log("Width:", width, "Height:", height);
            let tooltipX = clientX + 10;
            let tooltipY = clientY + 10;

            if (tooltipX + width > window.innerWidth) {
                // console.log("Horizontal overflow");
                tooltipX = clientX - width - 10;
            }

            if (tooltipY + height > window.innerHeight) {
                // console.log("Vertical overflow");
                tooltipY = clientY - height - 10;
            }

            return { tooltipX, tooltipY };
        }
        return { tooltipX: clientX, tooltipY: clientY };
    };

    const handleMouseEnterRegion = (event: React.MouseEvent<SVGPolygonElement>, region: MapRegion) => {
        const { tooltipX, tooltipY } = setDynamicTooltipPosition(event.pageX, event.pageY);
        setTooltip({
            visible: true,
            x: tooltipX,
            y: tooltipY,
            content: <MapRegionTooltip region={region} />,
        });
    };

    const handleMouseEnterLocation = (event: React.MouseEvent<SVGGElement>, location: MapLocation) => {
        const { tooltipX, tooltipY } = setDynamicTooltipPosition(event.clientX, event.clientY);
        setTooltip({
            visible: true,
            x: tooltipX,
            y: tooltipY,
            content: <MapLocationTooltip location={location} />,
        });
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        const { tooltipX, tooltipY } = setDynamicTooltipPosition(event.clientX, event.clientY);
        setTooltip(prev => ({
            ...prev,
            x: tooltipX,
            y: tooltipY,
        }));
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, content: null });
    };

    return (
        <>
            <svg ref={svgRef} id="map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2641 2035" onMouseMove={handleMouseMove}>
                <g ref={gRef} transform={`translate(${translate.x}, ${translate.y}) scale(${scale})`}>
                    <image href={imageUrl} width="100%" />
                    {regions.map((region, index) => (
                        <polygon
                            key={index}
                            className="region"
                            points={region.points}
                            fill="transparent"
                            stroke="transparent"
                            strokeWidth={4}
                            onMouseEnter={(e) => handleMouseEnterRegion(e, region)}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                    {capitals.map((location, index) => (
                        <Capital
                            key={index}
                            city={location}
                            onMouseEnter={(e) => handleMouseEnterLocation(e, location)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                    {cities.map((location, index) => (
                        <City
                            key={index}
                            city={location}
                            onMouseEnter={(e) => handleMouseEnterLocation(e, location)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                    {pois.map((location, index) => (
                        <Poi
                            key={index}
                            poi={location}
                            onMouseEnter={(e) => handleMouseEnterLocation(e, location)}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        />
                    ))}
                </g>
            </svg>
            {tooltip.visible && !isDragging && (
                <div
                    ref={tooltipRef}  // Attach the ref here
                    id={"tooltip"}
                    className={"tooltip"}
                    style={{
                        display: "flex",
                        left: tooltip.x,
                        top: tooltip.y,
                    }}
                >
                    {tooltip.content}
                </div>
            )}
        </>
    );
};

export default Map;