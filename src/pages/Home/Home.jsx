import { Box, Tab } from "@material-ui/core";
import Helmet from "../../components/Helmet/Helmet";
import "./Home.css";
import React, { useState } from "react";
import Trending from "../Trending/Trending";
import TabConText from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import TabList from "@material-ui/lab/TabList";
import SliderPreview from "../../components/SliderPreview/SliderPreview";

import GetMovie from "../../components/GetMovie/GetMovie";
import GetTV from "../../components/GetMovie/GetTV";
const Home = () => {
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet title={"Phim Net | Watching and stream video "} />
      <SliderPreview />

      <Box>
        <TabConText value={value}>
          <Box className="tabs" sx={{ maxWidth: "100%", padding: "0 30px" }}>
            <TabList
              style={{ textAlign: "center", marginTop: "50px" }}
              onChange={handleChange}
              aria-label="Tabs Example"
              indicatorColor="white"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Trending " value="1" />
              <Tab label="Popular" value="2" />
              <Tab label="Top_Rated" value="3" />
              <Tab label="Trending TV " value="4" />
              <Tab label="Popular TV" value="5" />
              <Tab label="Top_Rated TV" value="6" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Trending />
          </TabPanel>
          <TabPanel value="2">
            <GetMovie type="popular" />
          </TabPanel>
          <TabPanel value="3">
            <GetMovie type="top_rated" />
          </TabPanel>
          <TabPanel value="4">
            <GetTV type="trending" />
          </TabPanel>
          <TabPanel value="5">
            <GetTV type="popular" />
          </TabPanel>
          <TabPanel value="6">
            <GetTV type="top_rated" />
          </TabPanel>
        </TabConText>
      </Box>
    </>
  );
};

export default Home;
