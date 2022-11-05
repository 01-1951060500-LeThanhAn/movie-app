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
      className={`hero-slide_item ${props.className}`}
      style={{
        backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path)}`,
      }}
    >
      <div className="hero-slide_item_inner">
          <div className="hero-slide_item_content">
            <div className="hero-slide_item_poster">
              <img src={apiConfig.w500Image(item.poster_path)} alt="" />
            </div>
            <div className="hero-slide_item_info">
              <h2 className="title">{item.title}</h2>
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
