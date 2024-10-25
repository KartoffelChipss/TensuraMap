import Legend from "../components/layout/Legend.tsx";
import Map from "../components/map/Map.tsx";
import nations from "../data/nations.ts";
import cities from "../data/cities.ts";
import capitals from "../data/capitals.ts";
import pois from "../data/pois.ts";

const Main = () => {
    return (
        <>
            <Map
                imageUrl={"/img/map.webp"}
                regions={nations}
                cities={cities}
                capitals={capitals}
                pois={pois}
            />
            <Legend />
        </>
    );
}

export default Main;