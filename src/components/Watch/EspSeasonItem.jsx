import React from "react";
import { NavLink } from "react-router-dom";
import { img_500 } from "../../config/config";
import "./EspSeasonItem.css";
const EspItem = ({ esp, id, seasonCurrent }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <NavLink
      to={`/watch/tv/${id}/season/${esp.season_number}/esp/${esp.episode_number}`}
      className="esp-list"
      activeclassname="active"
      onClick={scrollToTop}
    >
      <div className="esp-main">
        <div
          style={
            seasonCurrent === esp.episode_number
              ? { backgroundColor: "orange" }
              : { backgroundColor: "rgba(0,0,0,0.5)" }
          }
          className="esp-item"
        >
          <div className="esp-item-img">
            <img
              src={
                esp.still_path
                  ? `${img_500}${esp.still_path}`
                  : "https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png"
              }
              alt={esp.name}
            />
          </div>

          <div className="esp-info" style={{ flex: 1, marginLeft: "15px" }}>
            <p className="esp-item-name">Episode {esp.episode_number}</p>
            <p className="esp-item-name">
              Name: <span className="esp-title">{esp.name.substring(0, 10)}</span>...
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default EspItem;
