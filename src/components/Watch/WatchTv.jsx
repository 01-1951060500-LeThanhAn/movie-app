import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Helmet from "../Helmet/Helmet";
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
    <>
      <Helmet title={`${info.name || info.title}-Watch`} />
      <div className="pt-[120px] px-3 w-full 2xl:w-full">
        <div className="2xl:px-32">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-8/12">
              <div className="w-full h-[300px] 2xl:h-[500px] lg:h-[450px]">
                <iframe
                  width="100%"
                  height={"100%"}
                  src={`https://www.2embed.cc/embedtv/${id}&s=${season}&e=${esp}`}
                  title="Movie player"
                  allowFullScreen
                />
              </div>

              <div className="watch_info mt-6">
                <p className="watch-tv-season-number">
                  Season {espCurrent && espCurrent?.season_number} | Episode{" "}
                  {espCurrent?.episode_number}
                </p>
                <p className="watch-tv-name-esp my-2">
                  Name:{" "}
                  <span className="text-2xl font-bold">{espCurrent?.name}</span>
                </p>
                <p className="watch-tv-overview">
                  Overview: <br /> {espCurrent?.overview}
                </p>
                <p className="watch-tv-air_date">
                  Air Date: {espCurrent?.air_date}
                </p>
              </div>

              <Comment id={id} />
            </div>

            <div className="lg:w-4/12">
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
    </>
  );
};

export default WatchTv;
