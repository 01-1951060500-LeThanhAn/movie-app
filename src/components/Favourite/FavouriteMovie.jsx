import React, { useEffect, useState } from "react";
import "./Favourite.css";
import { RiCloseCircleLine } from "react-icons/ri";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useStore } from "../../stored/store";
import { db } from "../../firebase/auth";
import CardInfo from "../CardInfo/CardInfo";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const FavouriteMovie = () => {
  const [favouriteMovie, setFavouriteMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useStore()
  useEffect(() => {
    const q = query(
      collection(db, "favoriteMovie"),
      orderBy("create_at", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      setFavouriteMovie(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });

    return () => unsub();
  }, []);

  const handleDeleteMovie = async (idPost) => {
    const Ref = doc(db, "favoriteMovie", idPost.id);

    try {
      await deleteDoc(Ref);
      const newListPost = favouriteMovie.filter(
        (post) => post.id !== idPost.id
      );
      setFavouriteMovie(newListPost);
      setLoading(true);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
    return toast.success("Delete this movie successfully");
  };

  return (
    <>
      {!loading && (
        <div className="2xl:px-32 pb-4">
          <div className="px-3 ">
            {favouriteMovie.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                {favouriteMovie.map((slide) => (
                     slide.uid === user?.uid && (
                      <div className="favourite__card" key={slide.id}>
                      <Link
                        to={`/details/${slide.movie?.media_type}/${slide.movie?.id}`}
                      >
                        <CardInfo
                          poster={slide.movie?.poster_path}
                          title={slide.movie?.title}
                          rating={slide.movie?.rating}
                        />
                      </Link>
  
                      <div
                        onClick={() => handleDeleteMovie(slide)}
                        className="favourite__slide__item--close "
                      >
                        <RiCloseCircleLine />
                      </div>
                    </div>
                     )
                ))}
              </div>
            ) : (
              <p className="no_favourite">No movies favourite</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FavouriteMovie;
