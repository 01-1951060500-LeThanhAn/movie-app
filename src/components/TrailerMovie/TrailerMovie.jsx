import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiConfig from "../../config/config";
import {AiOutlineCloseCircle} from "react-icons/ai"
import "./Trailer.css";

const TrailerMovie = ({ showModal, setShowModal }) => {
  const { media_type, id } = useParams();
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const getTrailer = async (id) => {
      fetch(
        `${apiConfig.baseUrl}${media_type}/${id}/videos?api_key=${apiConfig.apikey}&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => {
          setTrailers(data.results);
        })
        .catch((err) => console.log(err));
    };
    getTrailer(id);
  }, [id]);
  return (
    <>
      <div
        className="overlay"
        style={{ display: showModal ? "flex" : "none" }}
        onClick={() => setShowModal(false)}
      >
        <div className="trailer-container" onClick={(e) => e.stopPropagation()}>
          <div className="trailer-title-close">
            <h1 className="trailer-title">Movie or TV trailers</h1>
            <p className="trailer-close"  onClick={() => setShowModal(false)}>
              <AiOutlineCloseCircle />
            </p>
          </div>

          <div className="trailer-content">
            {!trailers.length === 0 ? (
              <h1>Ko tìm thấy trailer</h1>
            ) : (
              trailers.map((trailer) => (
                <div key={trailer.id}>
                  <h1 className="trailer-name">{trailer.name}</h1>
                  <iframe
                    style={{
                      height: "315px",
                    }}
                    width="100%"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullscreen
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrailerMovie;
