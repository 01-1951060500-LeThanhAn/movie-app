import React, { useEffect} from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trending from "./pages/Trending/Trending";
import Movie from "./pages/Movies/Movie";
import Series from "./pages/Series/Series";
import Detail from "./components/Details/Detail";
import Search from "./pages/Search/Search";
import WatchMovie from "./components/Watch/WatchMovie";
import WatchTv from "./components/Watch/WatchTv";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage/LoginPage";

import Footer from "./pages/Footer/Footer";
import FavouriteMovie from "./components/Favourite/FavouriteMovie";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import MovieHistory from "./components/MovieHistory/MovieHistory";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import { useStore } from "./stored/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Profile from "./pages/Profile/Profile";

function App() {

  const { user, setUser } = useStore();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth", currentUser);
      setUser(currentUser);
      setDoc(doc(db, "users", user?.uid), {
        userId: user?.uid,
        email: user?.email,
        displayName: user?.displayName,
        photoURL: user?.photoURL || ""
      })
    });

    return () => {
      unsub();
    };
  }, [user]);
 
  return (
    <>
      <ToastContainer />
      <SkeletonTheme baseColor="rgb(224, 186, 170)" highlightColor="rgba(0,0,0,0.3)">
        <BrowserRouter>
          <Header />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/movies" element={<Movie />}></Route>
              <Route path="/series" element={<Series />}></Route>
              <Route
                path="/details/:media_type/:id"
                element={<Detail />}
              ></Route>

              <Route path="/search" element={<Search />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/profile/:id" element={<Profile />}></Route>
              <Route
                path="/favourite-movie"
                element={<FavouriteMovie />}
              ></Route>
              <Route path="/history-movie" element={<MovieHistory  />}></Route>
              <Route path="/watch/movie/:id" element={<WatchMovie />}></Route>
              <Route
                path="/watch/tv/:id/season/:season/esp/:esp"
                element={<WatchTv />}
              ></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </SkeletonTheme>
    </>
  );
}

export default App;
