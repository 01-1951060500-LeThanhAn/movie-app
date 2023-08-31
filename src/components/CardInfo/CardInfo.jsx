import React from "react";
import { img_300, unavailable } from "../../config/config";
import "./CardInfo.css";
import { AiFillStar } from "react-icons/ai";
const CardInfo = ({ id, poster, title, rating }) => {
  return (
    <>
      <div className="box_info relative">
        <img
          className="poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <p className="title">{title.slice(0, 20)}</p>
        <div className="absolute rounded-lg flex items-center justify-center px-2 top-2 right-1 bg-blue-500">
          <span className="">{Math.round(rating * 100) / 100}</span>
          <span>
            <AiFillStar />
          </span>
        </div>
      </div>
    </>
  );
};

export default CardInfo;
