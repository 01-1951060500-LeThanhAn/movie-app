import React, { useEffect, useState } from "react";
import axios from "axios";
import "swiper/css";

import "./Credit.css";
import { SwiperSlide, Swiper } from "swiper/react";
import apiConfig, { img_300, unavailable } from "../../config/config";
const handleDragStart = (e) => e.preventDefault();
const Credit = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);

  const fetchCredits = async () => {
    const { data } = await axios.get(
      `${apiConfig.baseUrl}${media_type}/${id}/credits?api_key=${apiConfig.apikey}&language=en-US`
    );

    setCredits(data.cast);
  };
  useEffect(() => {
    fetchCredits();
  }, [id, media_type]);

  return (
    <div className="pt-6 lg:px-4 2xl:px-12">
      <h3 className="text-3xl font-bold">Full Cast</h3>
      <div className="px-2 ">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            375: {
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
          }}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={6}
          loop={true}
        >
          {credits.map((item) => (
            <SwiperSlide>
              <div className="carouselItem mt-4">
                <img
                  src={
                    item.profile_path
                      ? `${img_300}/${item.profile_path}`
                      : unavailable
                  }
                  alt={item.name}
                  onDragStart={handleDragStart}
                  className="carouselItem__img w-56 h-96 object-cover"
                />

                <p className="text-yellow-500 mt-2">{item.name}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Credit;
