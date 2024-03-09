import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  // search
  const searchMovieTMDB = async(movie) =>{
    const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie +"&include_adult=false&language=en-US&page=1",API_OPTIONS);
    const json = await data.json();
    // console.log(json)
    return json.results;
  }

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    const gptQuery = "Act as a Movie Recommendation System and suggest some movie for the query : " + searchText.current.value + ". only give me names of 5 movies, comma seperated like the expample result ahead.Example Result: 3idiot, 12th fail, Sholay, Gadar, Don , Golmaal,Koi Mil Gaya";
    //make api call to gpt api
    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if(!gptResult.choices)
    {
      // To do error handling
    }
    console.log(gptResult?.choices[0]?.message?.content);
    const gptMovies = gptResult?.choices[0]?.message?.content.split(",");
    // for each movie find out the result of each .

    const promiseArray = gptMovies?.map(movie=>searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}))

  };
  return (
    <div className="flex  justify-center pt-[35%] md:pt-[10%] ">
      <form
        className="w-full md:w-1/2  bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className="p-4 m-4 col-span-9 rounded-md border border-red-900 outline-none"
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 rounded-md text-white"
          onClick={() => handleGptSearchClick()}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
