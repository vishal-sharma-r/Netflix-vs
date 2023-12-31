import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
const VideoBackground = ({ movieId }) => {
  // fetch trailer
  const trailerVideo = useSelector((store) => store.movies.trailerVideo);
  useMovieTrailer(movieId);
  return (
    <div className="max-w-screen">
      <iframe 
      className="w-full aspect-video"
        src={"https://www.youtube.com/embed/" + trailerVideo?.key+ `?&amp;autoplay=1&amp;mute=1&amp;controls=0&amp;loop=1&amp;playlist=UGc5Tzz19UY`}
        title="YouTube video player"
        
        vq="hd720"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share "
        
      ></iframe>
      
    </div>
  );
};

export default VideoBackground;
