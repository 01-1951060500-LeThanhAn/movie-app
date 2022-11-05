export const img_500 = "https://image.tmdb.org/t/p/w500";
export const img_300 = "https://image.tmdb.org/t/p/w300";

//content modal

// contentModal and singleContent
export const unavailable =
  "https://www.movienewz.com/img/films/poster-holder.jpg";

// contentModal
export const unavailableLandscape =
  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";

    //avatar
  export const avatar = 
  "https://el.tvu.edu.vn/images/avatar/no-avatar.png"

// For Carousel
export const noPicture =
  "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";

  
  const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apikey: 'b9a79216b65e3f15674332102ae5616f',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`

}

export default apiConfig;