import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarMovie from "../Similar/SimilarMovie";
import Comment from "../Comment/Comment";
import "./Watch.css";

import axios from "axios";
import apiConfig from "../../config/config";
const WatchMovie = () => {
  const { id } = useParams();
  const [info, setInfo] = useState([]);

  const fetchInfo = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}movie/${id}?api_key=${apiConfig.apikey}&language=en-US`
    );

   
    setInfo(res.data);
  };

  useEffect(() => {
    fetchInfo();
  }, [id]);

  return (
    <div className="containers">
      <div className="row">
        <div className="watch-container">
          <div className="watch-movie-flex">
            <div className="watch-movie-video">
              <iframe
                width="100%"
                height={"100%"}
                src={`https://www.2embed.to/embed/tmdb/movie?id=${id}`}
                title="Movie player"
                
                allowFullScreen
              />
            </div>

            <div className="watch_info">
              <h1 className="watch_name">{info.title}</h1>
              <p className="watch_overview">{info.overview}</p>
              <p className="watch_release_date">
                Release date: {info.release_date}
              </p>
            </div>

            <Comment id={id} />
          </div>

          <div className="similarMovie">
            <SimilarMovie />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchMovie;
