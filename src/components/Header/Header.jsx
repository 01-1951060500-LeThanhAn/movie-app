import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import MovieBG from "../../assets/movie.png";
import "./Header.css";
import { BsSearch } from "react-icons/bs";
import { useStore } from "../../stored/store";
import { logOut } from "../../firebase/auth";

const Header = () => {
  const [navbar, setNavbar] = useState(false);
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const { user } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="container-main">
        <nav className={navbar ? "navbars active" : "navbars"}>
          <div className="flex justify-center">
            <div className="ml-9 -mr-6">
              <img className="w-12 h-12" src={MovieBG} alt="" />
            </div>
            <Link to="/" className="navbar-logo " onClick={closeMobileMenu}>
              PHIMNET
            </Link>
          </div>
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <FaTimes style={{ color: "white" }} />
            ) : (
              <FaBars style={{ color: "white" }} />
            )}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                to="/movies"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Movies
              </Link>
            </li>
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link
                to="/series"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                TV Shows
              </Link>
            </li>
            <li className="nav-item  mt-6">
              <Link
                to="/search"
                className="nav-links text-2xl cursor-pointer"
                onClick={closeMobileMenu}
              >
                <BsSearch />
              </Link>
            </li>

            <li className="nav-item">
              {user ? (
                <div className="header-user">
                  <img
                    className="w-12 h-12 rounded-full -mt-2"
                    src={user?.photoURL}
                    alt={user?.displayName}
                  />

                  <ul className="header-user-list">
                    <li className="header-user-item">
                      <Link to="/favourite-movie">Favourite Movie</Link>
                    </li>
                    <li className="header-user-item">
                      <Link to="/history-movie">History Movie</Link>
                    </li>
                    <li className="header-user-item">
                      <Link to={`/profile/${user?.uid}`}>Profile</Link>
                    </li>
                    <li className="header-user-item" onClick={handleLogout}>
                      Log Out
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login">
                  <div style={{ fontSize: "30px", color: "white" }}>
                    <i className="bx bx-user-circle"></i>
                  </div>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
