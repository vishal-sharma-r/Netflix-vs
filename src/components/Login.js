import React, { useRef, useState } from "react";
import Header from "./Header";

import { checkValidData } from "../utils/validate";
const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage,setErrorMessage]  = useState();
  const toggleSignForm = () => {
    setIsSignForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    
    const msg = checkValidData(email.current.value, password.current.value);
    setErrorMessage(msg); 

    // Sign Up and Sign in  
    
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/15feb590-3d73-45e9-9e4a-2eb334c83921/IN-en-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="NetflixImageLogin"
          className=""
        />
      </div>

      <form
        className="w-3/12 absolute p-12 my-36 bg-black mx-auto right-0 left-0 text-white  rounded-sm bg-opacity-65"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="font-bold py-4 text-3xl">
          {isSignInForm ? "Sign In " : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="password"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-600 rounded-sm"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 my-4 w-full bg-gray-600 rounded-sm"
        />
        <input
          ref={password}
          type="password"
          placeholder="Enter password"
          className="p-4 my-4 w-full bg-gray-600 rounded-sm"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 w-full bg-red-800  rounded-md font-bold"
          onClick={() => handleButtonClick()}
        >
          {isSignInForm ? "Sign In " : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={() => toggleSignForm()}>
          {isSignInForm
            ? "New to Netflix? Sign up Now "
            : "Already Registered? Sign In now "}
        </p>
      </form>
    </div>
  );
};

export default Login;
