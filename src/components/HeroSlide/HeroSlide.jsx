import React, { useEffect, useState } from "react";
import axios from "axios";
import CardInfo from "../CardInfo/CardInfo";
import apiConfig from "../../config/config";

const HeroSlide = () => {
  const [slideMovie, setSlideMovie] = useState([]);

  useEffect(() => {
    fetchPopularMovie();
  }, []);
  
  const fetchPopularMovie = async () => {
    const res = await axios.get(
        `${apiConfig.baseUrl}trending/all/day?api_key=${apiConfig.apikey}&page=1`
    );

    console.log(res.data.results);
    setSlideMovie(res.data.results);
  };

  return (
    <div className="media">
      <div className="trending">
      {slideMovie && slideMovie.map((slide, i) => (
         <CardInfo
          key={slide.id}
          id={slide.id}
          poster={slide.poster_path}
          title={slide.title || slide.name}
          date={slide.first_air_date || slide.release_date}
          media_type={slide.media_type}
          />
        ))}
      </div>
     
    </div>
  );
};

export default HeroSlide;
