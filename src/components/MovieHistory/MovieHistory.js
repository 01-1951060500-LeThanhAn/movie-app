import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./MovieHistory.css";

import { RiCloseCircleLine } from "react-icons/ri";
import CardInfo from "../CardInfo/CardInfo";
import { getHistoryMovie } from "../../actions/historyMovie";
const MovieHistory = () => {
  const historyWatch = useMemo(getHistoryMovie,[])
  const [listMovie, setListMovie] = useState(historyWatch);

  const deleteMovie = (data) => {
    const filterMovie = listMovie.filter((movie) => {
      return movie.id !== data;
    });
    setListMovie(filterMovie);
  };

  useEffect(() => {
    localStorage.setItem("movie-watched", JSON.stringify(listMovie));
  }, [listMovie]);

  return (
    <>
      <div className="history-movies">
        <h4
          style={{
            marginBottom: "30px",
           textAlign: "center"
          }}
        >
          Movies Watched
        </h4>
        <div className="trendings">
          {listMovie.map((item) => (
            <div style={{ position: "relative" }} key={item.id}>
              <Link to={`/details/${item.media_type}/${item.id}`}>
                <CardInfo
                  id={item.id}
                  poster={item.poster_path}
                  title={item.title}
                  rating={item.rating}
                />
              </Link>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                onClick={() => deleteMovie(item.id)}
                className="remove_movie"
              >
                <RiCloseCircleLine />
              </div>
            </div>
          ))}
        </div>
      </div>
     
    </>
  );
};

export default MovieHistory;
