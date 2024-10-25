import {MapLocation} from "../../../types/MapLocation.ts";

interface CapitalProps {
    key: number;
    city: MapLocation;
    onMouseEnter: (event: React.MouseEvent<SVGGElement>, city: MapLocation) => void;
    onMouseMove: (event: React.MouseEvent<SVGGElement>) => void;
    onMouseLeave: () => void;
}

const Capital: React.FC<CapitalProps> = ({ key, city, onMouseEnter, onMouseMove, onMouseLeave }) => (
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
        <path
            d="M4.5 14L3 15V21H7M7 21H10M7 21V13L9.5 11V6L12 3L14.5 6V11L17 13V21M10 21H14M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21M14 21H17M17 21H21V15L19.5 14"
            stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
        />
        <path
            d="M4.5 14L3 15V21H7M7 21H10M7 21V13L9.5 11V6L12 3L14.5 6V11L17 13V21M10 21H14M10 21V17C10 15.8954 10.8954 15 12 15C13.1046 15 14 15.8954 14 17V21M14 21H17M17 21H21V15L19.5 14"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
    </g>
)

export default Capital;