import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiConfig from "../../config/config";

import "./SliderPreview.css";
const HeroSlideItem = (props) => {
  
  const item = props.item;
  const [type, setType] = useState(undefined);
  const { media_type } = useParams();

  return ( 
    <div
      className={`hero-slide_item  ${props.className}`}
      style={{
        backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path)}`,
      }}
    >
      <div className="hero-slide_item_inner px-0 lg:px-12">
          <div className="hero-slide_item_content pt-44 lg:pt-44">
            <div className="w-[300px] md:w-[330px] lg:w-[430px] 2xl:w-[460px] h-auto hero-slide_item_poster z-30 hidden md:block md:px-8">
              <img className="scale-100 " src={apiConfig.w500Image(item.poster_path)} alt="" />
            </div>
            <div className="z-30 w-full px-3">
              <h2 className="text-3xl font-bold">{item.title}</h2>
              <div className="overview">{item.overview}</div>
              <div className="btns">
                <Link to={`/watch/${media_type === type ? "movie" : "tv"}/${item.id}`}>
                  <button className="watchnow" href={item.homepage}>
                    Watch Now
                  </button>
                </Link>
                <Link
                  to={`/details/${media_type === type ? "movie" : "tv"}/${item.id}`}
                >
                  <button className="watchtrailer">View Info</button>
                </Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default HeroSlideItem;
