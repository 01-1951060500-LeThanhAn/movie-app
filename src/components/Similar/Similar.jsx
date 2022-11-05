import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Similar.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import apiConfig, { img_300 } from "../../config/config";

import 'swiper/css';
import 'swiper/css/free-mode'
const Similar = ({ id, media_type }) => {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSimilar = async () => {
    const { data } = await axios.get(
      `${apiConfig.baseUrl}${media_type}/${id}/similar?api_key=${apiConfig.apikey}&language=en-US`
    );
    setSimilar(data.results);
    setLoading(false)
  };

  useEffect(() => {
    setLoading(true)
    getSimilar(id);
  }, [media_type , id]);

  return ( 
    <>
      <div className="similar">
        <h4 style={{ paddingBottom: "30px"}}>SIMILAR</h4>
        {similar && (
          <Swiper
            breakpoints={{
               320: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              375: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              600: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10
              },
              1366: {
                slidesPerView: 6,
                spaceBetween: 10
              },
              1920: {
                slidesPerView: 6,
                spaceBetween: 10
              },
              
            }}
            freeMode={true}
          
            grabCursor={true}
            spaceBetween={10}
            slidesPerView={6}
            loop={true}
          >
            <div className="similar_box">
              {!loading ? similar.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link to={`/details/${media_type || "tv"}/${item.id}`}>
                    <div className="similar_card">
                      <div className="similar_image">
                        <img src={`${img_300}/${item.poster_path}`} alt="" />
                      </div>
                      <div className="similar_title">
                        <p>{item.title || item.name}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )) : (
               null
              )}
            </div>
          </Swiper>
        )}
      </div>
    </>
  );
};

export default Similar;
