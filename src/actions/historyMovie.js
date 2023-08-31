export const addMovieStorage = (movie) => {
    let historyMovie = localStorage.getItem("movie-watched")
      ? JSON.parse(localStorage.getItem("movie-watched"))
      : [];
  
    const existMovie = historyMovie.find((p) => p.id === movie.id);
  
    if (existMovie) {
      historyMovie = historyMovie.filter((item) => item.id !== movie.id);
    }
  
    historyMovie.push(movie);
    localStorage.setItem("movie-watched", JSON.stringify(historyMovie));
  };

  export const getHistoryMovie = () => {
    const historyMovie = localStorage.getItem("movie-watched")
      ? JSON.parse(localStorage.getItem("movie-watched"))
      : [];
  
    const result = historyMovie.sort((a, b) => b.viewAt - a.viewAt);
  
    return result;
  };