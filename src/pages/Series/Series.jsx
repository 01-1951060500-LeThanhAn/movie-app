import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TV.css"
import useGenres from "../../components/Genres/useGenres";
import CardInfo from "../../components/CardInfo/CardInfo";
import GenresTv from "../../components/Genres/GenresTV";
import Paginations from "../../components/Paginations/Paginations";
import { Link } from "react-router-dom";
import apiConfig from "../../config/config";
import SkeletonPost from "../../components/SkeletonCard/SkeletonCard";
const Series = () => {
  const [contact, setContact] = useState([]);
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreURL = useGenres(selectedGenres);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0
    })
    fetchPopularMovie();
  }, [page, genreURL]);
  
  const fetchPopularMovie = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}discover/tv?api_key=${apiConfig.apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
    );

   
    setContact(res.data.results);
    setCountPages(res.data.total_pages)
  };

  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timing);
  }, []);

  return (
    <>
  <div className="2xl:px-32 pt-28 ">
        <GenresTv
          type="tv"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
          page={page}
        />
        <div className="px-3  grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
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
            contact.map((slide) => (
              <Link to={`/details/tv/${slide.id}`}>
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
      {
        countPages > 1 && <Paginations setPage={setPage} page={page} countPages={countPages} />
      }
      
    </>
  );
};

export default Series;
