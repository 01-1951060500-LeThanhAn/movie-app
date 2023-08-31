import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./SimilarMovie.css"
import apiConfig, { img_300 } from "../../config/config";
import { AiFillStar } from "react-icons/ai"
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
      <div className="similarmovies ml-12">
        <h4 style={{ paddingBottom: "30px", paddingLeft: "25px" }}>SIMILAR</h4>
        {similarMovie && (
          <div className="">
            {similarMovie.map((item) => (
              <Link to={`/details/movie/${item.id}`} key={item.id}>
                <div className="relative my-[20px] w-[300px]">
                  <div className="w-[230px] h-auto">
                    <img className="w-[120px] h-auto object-cover" src={`${img_300}/${item.poster_path}`} alt="" />
                  </div>
                  <div className="absolute left-[50%] top-5">
                    <p className="text-xl">{item.title.substring(0,20) || item.name.substring(0,20)}</p>
                  </div>
                  <div className="absolute left-[50%] top-[40%]">
                    <p className="text-slate-300">{item.release_date}</p>
                  </div>
                  <div className="flex rounded-lg px-2 items-center absolute border-2 border-blue-800 left-[50%] bottom-3">
                    <p className="text-blue-800">{(item.vote_average.toFixed(2))}</p>
                    <span className="pl-2 text-blue-800"><AiFillStar /></span>
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
