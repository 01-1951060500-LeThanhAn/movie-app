import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import apiConfig, { img_300 } from "../../config/config";
import "./SimilarMovie.css";
const SimilarMovie = () => {
  const [similarMovie, setSimilarMovie] = useState([]);

  const [page, setPage] = useState(1);

  const { media_type, id } = useParams();

  const getSimilar = async (id) => {
    const { data } = await axios.get(
      `${apiConfig.baseUrl}movie/${id}/similar?api_key=${apiConfig.apikey}&language=en-US&page=${page}`
    );
    setSimilarMovie(data.results);
  };

  useEffect(() => {
    getSimilar(id);
  }, [page, id]);

  return (
    <>
      <div className="similarmovie">
        <h4 style={{ paddingBottom: "30px", paddingLeft: "25px" }}>SIMILAR</h4>
        {similarMovie && (
          <div className="similar_box_movie">
            {similarMovie.map((item) => (
              <Link to={`/details/movie/${item.id}`} key={item.id}>
                <div className="similar_card_movie">
                  <div className="similar_image">
                    <img src={`${img_300}/${item.poster_path}`} alt="" />
                  </div>
                  <div className="similar_title_movie">
                    <p>{item.title || item.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SimilarMovie;
