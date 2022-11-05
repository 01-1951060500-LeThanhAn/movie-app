import React from "react";
import { img_300, unavailable } from "../../config/config";
import "./CardInfo.css";

const CardInfo = ({ id, poster, title, date, media_type }) => {
  return (
    <>
      <div className="box_info">
        <img
          className="poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <p className="title">{title.length > 20 ? title.substring(0,20) : title}...</p>
      
      </div>
    </>
  );
};

export default CardInfo;
