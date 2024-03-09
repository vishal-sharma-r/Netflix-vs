import React from "react";
import { useSelector } from "react-redux";
import VideoTile from "./VideoTile";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (movies === null) return;
  const mainMovie = movies[0];
  // console.log("mainMovie->", mainMovie);
  // console.log(mainMovie);
  const { original_title, overview ,id} = mainMovie;
  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTile title={original_title} overview={overview} />
      <VideoBackground movieId = {id}/>
    </div>
  );
};

export default MainContainer;
