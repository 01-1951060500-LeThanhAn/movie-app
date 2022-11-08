import axios from "axios";
import React, { useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import apiConfig from "../../config/config";
import HeroSlideItem from "./HeroSlideItem"
import "./SliderPreview.css";
import "swiper/css";
const SliderPreview = () => {
  const [slider, setSlider] = useState([]);

  SwiperCore.use([Autoplay]);

  const fetchSlider = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}trending/all/week?api_key=${apiConfig.apikey}`
    );
    console.log(res.data.results.slice(0, 2));
    setSlider(res.data.results.slice(0, 12));
  };

  useEffect(() => {
    fetchSlider();
  }, []);

  return (
    <>
      <div className="hero_slide">
        <Swiper
          modules={[Autoplay]}
          grabCursor={true}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{delay: 4000}}
          navigation
          loop={true}
        >
          {slider.map((item, i) => (
            <SwiperSlide key={item.id}>
              {({ isActive }) => (
                <HeroSlideItem
                  item={item}
                  slider={slider}
                  className={`${isActive ? "active" : ""}`}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};


export default SliderPreview;
