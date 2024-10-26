import React from "react";
import "./Legend.scss";
import CityIcon from "../icons/CityIcon.tsx";
import StarIcon from "../icons/StarIcon.tsx";
import LegendCheckbox from "../common/LegendCheckbox.tsx";
import CapitalIcon from "../icons/CapitalIcon.tsx";

interface LegendProps {
    showCapitals: boolean;
    showSettlements: boolean;
    showPOIs: boolean;
    onUpdated: (showCapitals: boolean, showSettlements: boolean, showPOIs: boolean) => void;
}

const Legend: React.FC<LegendProps> = ({ showCapitals, showSettlements, showPOIs, onUpdated }) => {
    const onCheckboxUpdate = (type: "capitals" | "settlements" | "pois", checked: boolean) => {
        onUpdated(
            type === "capitals" ? checked : showCapitals,
            type === "settlements" ? checked : showSettlements,
            type === "pois" ? checked : showPOIs
        );
    };

    return (
        <div className="legend">
            <h1>Interactive Map of the Magic Continent</h1>
            <div className="border"></div>

            <h2>Filters</h2>

            <div className="form">
                <LegendCheckbox
                    key="capital-checkbox"
                    label="Capitals"
                    icon={<CapitalIcon />}
                    checked={showCapitals}
                    onUpdated={(checked) => onCheckboxUpdate("capitals", checked)}
                />

                <LegendCheckbox
                    key="city-checkbox"
                    label="Settlements"
                    icon={<CityIcon />}
                    checked={showSettlements}
                    onUpdated={(checked) => onCheckboxUpdate("settlements", checked)}
                />

                <LegendCheckbox
                    key="poi-checkbox"
                    label="Points of Interest"
                    icon={<StarIcon />}
                    checked={showPOIs}
                    onUpdated={(checked) => onCheckboxUpdate("pois", checked)}
                />
            </div>
        </div>
    );
}

export default Legend;