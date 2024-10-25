import {MapLocation} from "../../types/MapLocation.ts";
import {MapRegion} from "../../types/MapRegion.ts";
import Capital from "./locations/Capital.tsx";
import City from "./locations/City.tsx";
import Poi from "./locations/Poi.tsx";
import {useState} from "react";
import MapLocationTooltip from "./tooltips/MapLocationTooltip.tsx";
import MapRegionTooltip from "./tooltips/MapRegionTooltip.tsx";

interface MapProps {
    imageUrl: string;
    regions?: MapRegion[];
    capitals?: MapLocation[];
    cities?: MapLocation[];
    pois?: MapLocation[];
}

const Map: React.FC<MapProps> = ({imageUrl, regions = [], cities = [], pois = [], capitals = []}) => {
    const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; content: JSX.Element | null }>({
        visible: false,
        x: 0,
        y: 0,
        content: null,
    });

    const handleMouseEnterRegion = (event: React.MouseEvent<SVGPolygonElement>, region: MapRegion) => {
        setTooltip({
            visible: true,
            x: event.clientX + 10,
            y: event.clientY + 10,
            content: <MapRegionTooltip region={region} />,
        });
    };

    const handleMouseEnterLocation = (event: React.MouseEvent<SVGGElement>, location: MapLocation) => {
        setTooltip({
            visible: true,
            x: event.clientX + 10,
            y: event.clientY + 10,
            content: <MapLocationTooltip location={location} />,
        });
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        setTooltip(prev => ({
            ...prev,
            x: event.clientX + 10,
            y: event.clientY + 10,
        }));
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, content: null });
    };

    return (
        <>
            <svg id="map" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2641 2035">
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
                        onMouseMove={handleMouseMove}
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
            </svg>
            {tooltip.visible && (
                <div
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
}

export default Map;