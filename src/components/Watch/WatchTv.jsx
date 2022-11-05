import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarMovie from "../Similar/SimilarMovie";
import "./Watch.css";

import axios from "axios";
import apiConfig from "../../config/config";
import Comment from "../Comment/Comment";
import SeasonTV from "./SeasonTV";
const WatchTv = () => {
  const { id, esp, season } = useParams();
  const [info, setInfo] = useState([]);
  const [seasonsTV, setSeasonsTV] = useState([]);
  const [espCurrent, setEspCurrent] = useState();
  const [seasonCurrent, setSeasonCurrent] = useState(Number(season));

  const fetchInfo = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}tv/${id}?api_key=${apiConfig.apikey}`
    );

    setSeasonsTV(res.data.seasons);
    setInfo(res.data);
  };

  useEffect(() => {
    fetchInfo();
  }, [id]);

  useEffect(() => {
    const getEspCurrent = (id, season, esp) => {
      fetch(
        `${apiConfig.baseUrl}/tv/${id}/season/${season}/episode/${esp}?api_key=${apiConfig.apikey}`
      )
        .then((res) => res.json())
        .then((data) => {
          setEspCurrent(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getEspCurrent(id, season, esp);
  }, [esp, season, id]);

  return (
    <div className="containers">
      <div className="row">
        <div className="watch-container">
          <div className="watch-movie-flex">
            <div className="watch-movie-video">
              <iframe
                width="100%"
                height={"100%"}
                src={`https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${season}&e=${esp}`}
                title="Movie player"
                allowFullScreen
              />
            </div>

            <div className="watch_info">
              <p className="watch-tv-season-number">
                Season {espCurrent && espCurrent?.season_number} | Episode{" "}
                {espCurrent?.episode_number}
              </p>
              <p className="watch-tv-name-esp">Name: {espCurrent?.name}</p>
              <p className="watch-tv-overview">
                Overview: {espCurrent?.overview}
              </p>
              <p className="watch-tv-air_date">
                Air Date: {espCurrent?.air_date}
              </p>
             
            </div>

            <Comment id={id} />
          </div>

          <div className="similarMovie">
            {seasonsTV.map((item) => {
              if (item.season_number > 0) {
                return (
                  <SeasonTV
                    seasonCurrent={seasonCurrent}
                    setSeasonCurrent={setSeasonCurrent}
                    id={id}
                    key={item.id}
                    item={item}
                  />
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchTv;
