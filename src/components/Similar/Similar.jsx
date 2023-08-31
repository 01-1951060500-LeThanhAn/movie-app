import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig, { img_300 } from "../../config/config";

import "swiper/css";
import "swiper/css/free-mode";
const Similar = ({ id, media_type }) => {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSimilar = async () => {
    const { data } = await axios.get(
      `${apiConfig.baseUrl}${media_type}/${id}/similar?api_key=${apiConfig.apikey}&language=en-US`
    );
    setSimilar(data.results);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getSimilar(id);
  }, [media_type, id]);

  return (
    <>
      <div className="px-2 pb-4 mt-16">
        <div className="2xl:px-12">
          <h4 className="py-4 font-bold text-3xl">SIMILAR</h4>
          {similar && (
            <Swiper
              breakpoints={{
                375: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                414: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                600: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
                1366: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
                1920: {
                  slidesPerView: 6,
                  spaceBetween: 10,
                },
              }}
              freeMode={true}
              grabCursor={true}
              spaceBetween={10}
              slidesPerView={6}
              loop={true}
            >
              {!loading
                ? similar.map((item) => (
                    <SwiperSlide key={item.id}>
                      <Link to={`/details/${media_type || "tv"}/${item.id}`}>
                        <div className="similar_card">
                          <div className="similar_image">
                            <img
                              src={`${img_300}/${item.poster_path}`}
                              alt=""
                            />
                          </div>
                          <div className="similar_title mt-2">
                            <p>{item.title || item.name}</p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))
                : null}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
};

export default Similar;
