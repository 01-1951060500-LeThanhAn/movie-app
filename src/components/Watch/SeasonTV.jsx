import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import apiConfig from "../../config/config";
import EspSeasonItem from "./EspSeasonItem";
import "./SeasonTV.css"
const SeasonTV = ({ seasonCurrent, setSeasonCurrent, id, key, item }) => {
    const [espSeason, setEspSeason] = useState([]);

    
  useEffect(() => {
    const getEsp = (season, id) => {
      fetch(`${apiConfig.baseUrl}/tv/${id}/season/${season}?api_key=${apiConfig.apikey}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.episodes)
            setEspSeason(data.episodes);
        });
    };

    getEsp(item.season_number, id);
  }, [id, item.season_number]);


  return (
    <>
      <div className="watch-tv-season">
        <div className="watch-tv-flex">
          <div className="watch-tv-img">
          <div className="esp">
        {item.season_number === seasonCurrent &&
          espSeason.map((esp) => (
            <EspSeasonItem
              key={esp.id}
              esp={esp}
              seasonCurrent={seasonCurrent}
              id={id}
            />
          ))}
      </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeasonTV;
