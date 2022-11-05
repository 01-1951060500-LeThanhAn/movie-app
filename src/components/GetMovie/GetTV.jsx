import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link} from "react-router-dom";
import CardInfo from "../../components/CardInfo/CardInfo";

import Paginations from "../../components/Paginations/Paginations";
import apiConfig from "../../config/config";
import { BarWave } from "react-cssfx-loading";
import SkeletonPost from "../SkeletonCard/SkeletonCard";

const GetTV = ({ type }) => {
 
  const [slideMovie, setSlideMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState();
  const [loading, setLoading] = useState(false);

  const fetchPopularMovie = async () => {
    const res = await axios.get(
        type === "trending" 
     ? `${apiConfig.baseUrl}trending/tv/week?api_key=${apiConfig.apikey}&page=${page}`
     : `${apiConfig.baseUrl}tv/${type}?api_key=${apiConfig.apikey}&page=${page}`
    );

    console.log(res.data.results);
    setSlideMovie(res.data.results);
    setCountPages(res.data.total_pages);
  };

  useEffect(() => {
    fetchPopularMovie();
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timing);
  }, [page]);

  return (
    <>
   
      <div className="media">
        <div className="trending">
          {loading && (
           <>
           <SkeletonPost />
           <SkeletonPost />
           <SkeletonPost />
           <SkeletonPost />
           <SkeletonPost />
           <SkeletonPost />
         </>
          )}
          {!loading &&
            slideMovie.map((slide) => (
              <Link to={`/details/tv/${slide.id}`}>
                <CardInfo
                  key={slide.id}
                  id={slide.id}
                  poster={slide.poster_path}
                  title={slide.title || slide.name}
                  date={slide.first_air_date || slide.release_date}
                  media_type={slide.media_type}
                />
              </Link>
            ))}
        </div>
      </div>

      <Paginations setPage={setPage} page={page} countPages={countPages} />
    </>
  );
};

export default GetTV;
