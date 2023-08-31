import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";
import { Link } from "react-router-dom";
import CardInfo from "../../components/CardInfo/CardInfo";

import Paginations from "../../components/Paginations/Paginations";
import apiConfig from "../../config/config";

import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
const Trending = () => {
  const [slideMovie, setSlideMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState();
  const [loading, setLoading] = useState(false);

  const fetchPopularMovie = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}trending/movie/week?api_key=${apiConfig.apikey}&page=${page}`
    );

    console.log(res.data.results);
    setSlideMovie(res.data.results);
    setCountPages(res.data.total_pages);
  };

  useEffect(() => {
    fetchPopularMovie();
    window.scrollTo({
      behavior: "smooth",
      top: 320,
    });
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timing);
  }, [page]);

  return (
    <>
      <div className="2xl:px-32">
        <div className=" grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {loading && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
          {!loading &&
            slideMovie.map((slide) => (
              <Link to={`/details/movie/${slide.id}`}>
                <CardInfo
                  key={slide.id}
                  id={slide.id}
                  poster={slide.poster_path}
                  title={slide.title || slide.name}
                  date={slide.first_air_date || slide.release_date}
                  media_type={slide.media_type}
                  rating={slide.vote_average}
                />
              </Link>
            ))}
        </div>
      </div>

      <Paginations setPage={setPage} page={page} countPages={countPages} />
    </>
  );
};

export default Trending;
