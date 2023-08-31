import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { unavailable } from "../../config/config";
import "./Detail.css";
import apiConfig from "../../config/config";

import Credit from "../Credit/Credit";
import ReactStars from "react-rating-stars-component";

import TrailerMovie from "../TrailerMovie/TrailerMovie";
import Similar from "../Similar/Similar";
import { toast } from "react-toastify";
import Button from "../Button/Button";

import { addMovieStorage } from "../../actions/historyMovie";

import { useStore } from "../../stored/store";
import { addFavouriteMovies } from "../../actions/fireStoreActions";
import Helmet from "../Helmet/Helmet"
const Detail = () => {
  const { id, media_type } = useParams();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);
  const { user, favouriteMovie, setFavouriteMovie } = useStore(
    (state) => state
  );

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        `${apiConfig.baseUrl}${media_type}/${id}?api_key=${apiConfig.apikey}`
      );
      setLoading(false);
      setContent(data);
    };
    setLoading(true);
    fetchMovies();
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [id, media_type]);

  useEffect(() => {
    if (content.id) {
      addMovieStorage({
        id: content?.id,
        poster_path: content?.poster_path,
        media_type: media_type,
        title: content?.name || content?.title,
        viewAt: Date.now(),
        rating: content.vote_average
      });
    }
  }, [content, media_type]);

  const handleAddMovies = async () => {
    if (!user) {
      return toast.error(`Please log in to add movie`);
    }
    if (favouriteMovie) {
      const movieFavourite = favouriteMovie.some(
        (item) => item.movie.id === content.id
      );
      if (movieFavourite) {
        return toast.error("Movies already exist");
      }
    }
    setLoading(true);
    const newFavouriteMovie = await addFavouriteMovies(
      user.uid,
      content,
      media_type
    );
    setFavouriteMovie([...favouriteMovie, newFavouriteMovie]);
    setLoading(false);
    toast.success("Add new movie success");
  };

  return (
    <>
        <Helmet title={content.name || content.title }/>
      <div>
        <div
          className="box_content "
          style={{
            backgroundImage: `url(${apiConfig.originalImage(
              content.backdrop_path
                ? content.backdrop_path
                : content.poster_path
            )})`,
          }}
        >
         
          {content && (
            <div className="container">
              <div className="row">
                <div className="box_details ">
                  <div className="box_image">
                    <img
                      src={
                        content.backdrop_path
                          ? apiConfig.w500Image(content.poster_path)
                          : unavailable
                      }
                      alt="poster"
                    />
                  </div>

                  <div className="content_info">
                    <div className="content_name text-3xl font-bold">
                      <h2>{content.name || content.title}</h2>
                    </div>
                    <div className="content_date">
                      <span>
                        ReleaseDate:{" "}
                        {content.first_air_date || content.release_date}
                      </span>
                    </div>
                    <div className="content_overview">
                      <p>{content.overview}</p>
                    </div>

                    <div className="flex flex-wrap flex-1 mt-4 ">
                      {content.genres &&
                        content.genres.map((genre, i) => (
                          <div className="genre_list" key={i}>
                            <div className="border-2 rounded-lg  my-2 border-white h-auto py-1 px-2 ml-2">
                              <p>{genre.name}</p>
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="ratings">
                      <ReactStars
                        count={8}
                       
                        size={content.vote_average}
                        color="yellow"
                      />{" "}
                      <div className="ratings_count">{`(${content.vote_count} vote)`}</div>
                    </div>

                    <div className="content_ watch">
                      <Link
                        to={
                          media_type === "tv"
                            ? `/watch/tv/${id}/season/1/esp/1`
                            : `/watch/movie/${id}`
                        }
                      >
                        <Button className="btns" href={content.homepage}>
                          Watch Now
                        </Button>
                      </Link>

                      <Button
                        style={{ marginLeft: "20px" }}
                        className="btns"
                        onClick={() => setShowModal(true)}
                      >
                        Watch The Trainer
                      </Button>
                      <Button
                        style={{ marginLeft: "20px" }}
                        className="btns"
                        onClick={handleAddMovies}
                      >
                        Add Favourite Movie
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Credit media_type={media_type} id={id} />
        {showModal ? (
          <TrailerMovie showModal={showModal} setShowModal={setShowModal} />
        ) : null}

        <Similar id={id} media_type={media_type} />
      </div>
    </>
  );
};

export default Detail;
