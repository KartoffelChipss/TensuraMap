import {MapRegion} from "../../../types/MapRegion.ts";
import CapitalIcon from "../../icons/CapitalIcon.tsx";
import PopulationIcon from "../../icons/PopulationIcon.tsx";
import RulerIcon from "../../icons/RulerIcon.tsx";
import DescriptionIcon from "../../icons/DescriptionIcon.tsx";
import "./Tooltip.scss";

interface MapLocationTooltipProps {
    region: MapRegion;
}

const MapLocationTooltip: React.FC<MapLocationTooltipProps> = ({ region }) => {
    return (
        <>
            <h3>{region.name}</h3>
            <div className="border"></div>
            {region.capital && (
                <div className="detailbox">
                    <CapitalIcon />
                    <span dangerouslySetInnerHTML={{__html: region.capital}}/>
                </div>
            )}
            {region.population && (
                <div className="detailbox">
                    <PopulationIcon />
                    <span dangerouslySetInnerHTML={{__html: region.population}}/>
                </div>
            )}
            {region.ruler && (
                <div className="detailbox">
                    <RulerIcon />
                    <span dangerouslySetInnerHTML={{__html: region.ruler}}/>
                </div>
            )}
            {region.description && (
                <div className="detailbox">
                    <DescriptionIcon />
                    <span dangerouslySetInnerHTML={{__html: region.description}}/>
                </div>
            )}
            {region.url && (
                <a
                    className={"more"}
                    href={region.url}
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