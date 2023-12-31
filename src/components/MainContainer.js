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
    <div>
      <VideoTile title={original_title} overview={overview} />
      <VideoBackground movieId = {id}/>
    </div>
  );
};

export default MainContainer;
