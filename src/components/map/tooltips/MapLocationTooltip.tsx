import {MapLocation} from "../../../types/MapLocation.ts";

interface MapLocationTooltipProps {
    location: MapLocation;
}

const MapLocationTooltip: React.FC<MapLocationTooltipProps> = ({ location }) => {
    return (
        <>
            <h3>{location.name}</h3>
            <div className="border"></div>
            {location.description && (
                <span dangerouslySetInnerHTML={{__html: location.description}}/>
            )}
            {location.image?.url && (
                <img
                    className={"locationimg"}
                    src={location.image.url}
                    alt={location.image.name ?? location.name}
                    title={location.image.credit ?? ""}
                />
            )}
            {location.url && (
                <a
                    className={"more"}
                    href={location.url}
                    target={"_blank"}
                    rel={"noreferrer noopener"}
                >
                    <img src="img/icons/book.svg" alt="wiki icon"/>
                    Wiki
                </a>
            )}
        </>
    )
};

export default MapLocationTooltip;