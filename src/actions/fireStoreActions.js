import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { toast } from "react-toastify";
import { db } from "../firebase/auth";

export const addUser = async (user) => {
  const userRef = await addDoc(collection(db, "users"), user);
  return userRef;
};

export const postComment = async (newComment) => {
  try {
    const res = await addDoc(collection(db, "comments"), newComment);
    return {
      ...newComment,
      id: res.id,
    };
  } catch (err) {
    return toast.error(err.message);
  }
};

export const fetchComment = async (id) => {
  try {
    const q = query(collection(db, "comments"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    const commentList = [];
    querySnapshot.forEach((doc) => {
      commentList.push({ ...doc.data(), id: doc.id });
    });
    return commentList;
  } catch (error) {
    console.log(error);
    return toast.error(error.message);
  }
};

export const addFavouriteMovies = async (uid, movie, media_type) => {
  try {
    const data = {
      uid,
      movie: {
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        media_type,
      },
      create_at: Timestamp.now(),
    };

    const res = await addDoc(collection(db, "favoriteMovie"), data);

    return { ...data, id: res.id };
  } catch (error) {
    return toast.error(error.message);
  }
};
