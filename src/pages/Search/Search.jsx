import Paginations from "../../components/Paginations/Paginations";
import CardInfo from "../../components/CardInfo/CardInfo";
import React, { useEffect, useState } from "react";
import { createTheme, TextField } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Tabs, Tab } from "@material-ui/core";
import axios from "axios";
import "./Search.css";

import { Link } from "react-router-dom";
import apiConfig from "../../config/config";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});
const Search = () => {
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `${apiConfig.baseUrl}search/${type ? "movie" : "tv"}?api_key=${
        apiConfig.apikey
      }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );

    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scrollTo({
      top: "0",
      behavior: "smooth"
    })
    fetchSearch();
  }, [type, page]); 

  return (
    <div className="pt-[100px]  2xl:px-32">
      <div className="px-3">
        <div style={{ display: "flex" }}>
          <ThemeProvider theme={theme}>
            <TextField
              style={{ flex: 1, width: "100%"}}
              className="search"
              label="Search"
              variant="filled"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <Button variant="contained" onClick={fetchSearch}>
              <SearchIcon />
            </Button>
          </ThemeProvider>
        </div>

        <Tabs
          onChange={(e, val) => {
            setType(val);
            setPage(1);
          }}
          value={type}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            style={{ width: "50%", margin: "0 auto", color: "#fff" }}
            label="Search Movies"
          ></Tab>
          <Tab
            style={{ width: "50%", margin: "0 auto", color: "#fff" }}
            label="Search TV"
          ></Tab>
        </Tabs>

        <div className=" mt-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {content.map((item) => (
              <Link to={`/details/${type ? "movie" : "tv"}/${item.id}`}>
                <CardInfo
                  key={item.id}
                  id={item.id}
                  poster={item.poster_path}
                  title={item.title || item.name}
                  date={item.first_air_date || item.release_date}
                  media_type={item.media_type}
                  rating={item.vote_average}
                />
              </Link>
            ))}
            {searchText &&
              !content &&
              (type ? (
                <h2>No Series Found in App</h2>
              ) : (
                <h2>No Movies found in App</h2>
              ))}
          </div>
        </div>
        {numOfPages > 1 && (
          <Paginations setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </div>
  );
};

export default Search;
