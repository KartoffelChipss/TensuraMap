import {MapLocation} from "../../../types/MapLocation.ts";

interface CityProps {
    key: number;
    city: MapLocation;
    onMouseEnter: (event: React.MouseEvent<SVGGElement>, city: MapLocation) => void;
    onMouseMove: (event: React.MouseEvent<SVGGElement>) => void;
    onMouseLeave: (event: React.MouseEvent) => void;
}

const City: React.FC<CityProps> = ({ key, city, onMouseEnter, onMouseMove, onMouseLeave }) => (
    <g
        key={key}
        transform={`translate(${city.position.x}, ${city.position.y}) scale(2.5, 2.5)`}
        fill="transparent"
        className="location"
        data-name={city.name ?? ""}
        data-description={city.description ?? ""}
        data-url={city.url ?? ""}
        data-image-url={city.image?.url ?? ""}
        data-image-credit={city.image?.credit ?? ""}
        data-image-name={city.image?.name ?? ""}
        onMouseEnter={(e) => onMouseEnter(e, city)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
    >
        <rect x="0" y="0" width="24" height="24" fill="transparent" stroke="transparent" strokeWidth="4"/>

        {/* Black border */}
        <path
            d="M15 3L3 19V21H21V19L9 3M12 15L16 21H8L12 15Z"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(0.8, 0.8)"
        />

        {/* White inner stroke */}
        <path
            d="M15 3L3 19V21H21V19L9 3M12 15L16 21H8L12 15Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="scale(0.8, 0.8)"
        />
    </g>
)

export default City;