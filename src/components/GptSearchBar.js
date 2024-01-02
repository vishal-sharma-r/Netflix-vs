import React, { useRef } from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    const gptQuery = "Act as a Movie Recommendation System and suggest some movie for the query : " + searchText.current.value + ". only give me names of 5 movies, comma seperated like the expample result ahead.Example Result: 3idiot, 12th fail, Sholay, Gadar, Don , Golmaal,Koi Mil Gaya";
    //make api call to gpt api
    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    console.log(gptResult.choices);
  };
  return (
    <div className="pt-[10%] flex  justify-center">
      <form
        className="w-1/2  bg-black grid grid-cols-12"
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
