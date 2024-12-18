import Legend from "../components/layout/Legend.tsx";
import Map from "../components/map/Map.tsx";
import nations from "../data/nations.ts";
import cities from "../data/cities.ts";
import capitals from "../data/capitals.ts";
import pois from "../data/pois.ts";
import { useState } from "react";

const Main = () => {
    const [showCapitals, setShowCapitals] = useState(true);
    const [showSettlements, setShowSettlements] = useState(true);
    const [showPOIs, setShowPOIs] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [isZoomedIn, setIsZoomedIn] = useState(false);

    const onUpdated = (showCapitals: boolean, showSettlements: boolean, showPOIs: boolean) => {
        setShowCapitals(showCapitals);
        setShowSettlements(showSettlements);
        setShowPOIs(showPOIs);
    };

    return (
        <>
            <Map
                imageUrl={"/img/map.webp"}
                regions={nations}
                capitals={showCapitals ? capitals : []}
                cities={showSettlements ? cities : []}
                pois={showPOIs ? pois : []}
                onStartDragging={() => setIsDragging(true)}
                onStopDragging={() => setIsDragging(false)}
                onZoom={(scale) => setIsZoomedIn(scale > 1)}
            />
            <Legend
                hidden={isDragging || isZoomedIn}
                showCapitals={showCapitals}
                showSettlements={showSettlements}
                showPOIs={showPOIs}
                onUpdated={onUpdated}
            />
        </>
    );
};

export default Main;