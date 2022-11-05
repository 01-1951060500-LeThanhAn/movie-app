import React, { useEffect } from "react";
import axios from "axios";
import "./Genres.css";
import { Chip } from "@material-ui/core";
import apiConfig from "../../config/config"
const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  page,
  setPage,
  type,
}) => {


  const fetchGenres = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}genre/${type}/list?api_key=${apiConfig.apikey}&language=en-US`
    );
    
    setGenres(res.data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres({});
    };

  }, []);
  
  const addGenres = (genre) => {
    setSelectedGenres([...selectedGenres, genre])
    setGenres(genres.filter((item) => item.id !== genre.id))
    setPage(1)
   }

   const removeGenres = (genre) => {
    setSelectedGenres(selectedGenres.filter((item) => item.id !== genre.id))
    setGenres([...genres, genre])
    
    setPage(1)
   }

  return (
   <div className="genres-parent">
      <div className="genres mb-3">
       {selectedGenres &&
          selectedGenres.map((genre) => (
            <Chip
             
              label={genre.name}
              size="small"
              color="primary"
              key={genres.id}
              clickable
              onDelete={() => removeGenres(genre)}
              onClick={() => addGenres(genre)}
            />
          ))}
  
        {genres &&
          genres.map((genre) => (
            <Chip
              label={genre.name}
              size="small"
              key={genres.id}
              clickable
              onClick={() => addGenres(genre)}
            />
          ))}
      </div>
   </div>
  );
};

export default Genres;
