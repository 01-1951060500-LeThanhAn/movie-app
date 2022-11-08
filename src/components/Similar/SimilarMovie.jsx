import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./SimilarMovie.css"
import apiConfig, { img_300 } from "../../config/config";

const SimilarMovie = () => {
  const [similarMovie, setSimilarMovie] = useState([]);

  const [page, setPage] = useState(1);

  const { id } = useParams();

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
      <div className="similarmovies ml-4">
        <h4 style={{ paddingBottom: "30px", paddingLeft: "25px" }}>SIMILAR</h4>
        {similarMovie && (
          <div className="flex flex-col items-center">
            {similarMovie.map((item) => (
              <Link to={`/details/movie/${item.id}`} key={item.id}>
                <div className="relative my-[20px]">
                  <div className="w-[230px] h-auto">
                    <img className="w-[120px] h-auto object-cover" src={`${img_300}/${item.poster_path}`} alt="" />
                  </div>
                  <div className="absolute left-[65%] top-1/2">
                    <p>{item.title.substring(0,20) || item.name.substring(0,20)}</p>
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
