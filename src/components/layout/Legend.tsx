import React, {useEffect, useState} from "react";
import "./Legend.scss";
import CityIcon from "../icons/CityIcon.tsx";
import StarIcon from "../icons/StarIcon.tsx";
import LegendCheckbox from "../common/LegendCheckbox.tsx";
import CapitalIcon from "../icons/CapitalIcon.tsx";
import GitHubIcon from "../icons/GitHubIcon.tsx";
import DiscordIcon from "../icons/DiscordIcon.tsx";
import {Link} from "react-router-dom";

interface LegendProps {
    hidden?: boolean;
    showCapitals: boolean;
    showSettlements: boolean;
    showPOIs: boolean;
    onUpdated: (showCapitals: boolean, showSettlements: boolean, showPOIs: boolean) => void;
}

const Legend: React.FC<LegendProps> = ({ showCapitals, showSettlements, showPOIs, onUpdated, hidden = false }) => {
    const [platformText, setPlatformText] = useState(<></>);

    useEffect(() => {
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        const isWin = navigator.platform.toUpperCase().indexOf("WIN") >= 0;
        if (isMac) setPlatformText(<p>Hold the <span className={"key"}>⌘ Command</span> key to keep the tooltip from moving.</p>);
        else if (isWin) setPlatformText(<p>Hold the <span className={"key"}>Ctrl</span> key to keep the tooltip from moving.</p>);
    }, []);

    const onCheckboxUpdate = (type: "capitals" | "settlements" | "pois", checked: boolean) => {
        onUpdated(
            type === "capitals" ? checked : showCapitals,
            type === "settlements" ? checked : showSettlements,
            type === "pois" ? checked : showPOIs
        );
    };

    if (hidden) return null;

    return (
        <div className="legend">
            <h1>Tensura Map</h1>
            <div className="border"></div>

            <p>This is an interactive map of the Magic Continent from Tensei Shitara Slime Datta Ken (That Time I Got Reincarnated as a Slime).</p>

            <p style={{marginTop: "0px"}}>The data mainly comes from the <a href={"https://tensura.fandom.com/wiki/Home"} target={"_blank"} rel={"noreferrer noopener"}>Tensei Shitara Slime Datta Ken Wiki</a>.</p>

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

            {platformText && (
                <p className="platform-tooltip-info">
                    {platformText}
                </p>
            )}

            <div className="links">
                <a
                    className={"link"}
                    href={"https://github.com/KartoffelChipss/TensuraMap"}
                    target={"_blank"}
                    rel={"noreferrer noopener"}
                >
                    <GitHubIcon color={"#d78453"} />
                    GitHub
                </a>
                <a
                    className={"link"}
                    href={"https://strassburger.org/discord"}
                    target={"_blank"}
                    rel={"noreferrer noopener"}
                >
                    <DiscordIcon color={"#d78453"} />
                    Discord
                </a>
                <Link
                    className={"link"}
                    to={"/impressum"}
                >
                    Legal Notice
                </Link>
            </div>
        </div>
    );
}

export default Legend;