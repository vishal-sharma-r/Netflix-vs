import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { BackgroundImage } from "../utils/constants";
const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          src={BackgroundImage}
          alt="NetflixImageLogin"
          className="brightness-[.5] h-screen md:h-full object-cover"

        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};

export default GptSearch;
