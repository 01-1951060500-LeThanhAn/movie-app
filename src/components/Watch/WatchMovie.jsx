import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimilarMovie from "../Similar/SimilarMovie";
import Comment from "../Comment/Comment";
import Helmet from "../Helmet/Helmet";
import axios from "axios";
import apiConfig from "../../config/config";
const WatchMovie = () => {
  const { id } = useParams();
  const [info, setInfo] = useState([]);

  const fetchInfo = async () => {
    const res = await axios.get(
      `${apiConfig.baseUrl}movie/${id}?api_key=${apiConfig.apikey}&language=en-US`
    );

    setInfo(res.data);
  };

  useEffect(() => {
    fetchInfo();
  }, [id]);

  return (
    <>
      <Helmet title={`${info.name || info.title}-Watch`} />
      <div className="pt-[120px] px-4 w-full 2xl:w-full">
        <div className=" 2xl:px-32">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-5/6">
              <div className="w-full h-[300px] lg:w-[5/6] 2xl:h-[500px] lg:h-[450px]">
                <iframe
                  width="100%"
                  height={"100%"}
                  src={`https://www.2embed.cc/embed/${id}`}
                  title="Movie player"
                  allowFullScreen
                />
              </div>

              <div className="watch_info">
                <h1 className="watch_name text-3xl font-fold mt-5">
                  {info.title}
                </h1>
                <p className="watch_overview">{info.overview}</p>
                <p className="watch_release_date">
                  Release date: {info.release_date}
                </p>
              </div>

              <Comment id={id} />
            </div>

            <div className="similarMovie">
              <SimilarMovie />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchMovie;
