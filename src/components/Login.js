import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BackgroundImage, userAvtar } from "../utils/constants";
const Login = () => {
  const [isSignInForm, setIsSignForm] = useState(true);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState();
  const toggleSignForm = () => {
    setIsSignForm(!isSignInForm);
  };
  const handleButtonClick = () => {
    const msg = checkValidData(email.current.value, password.current.value);
    setErrorMessage(msg);
    if (msg) return;
    // Sign Up and Sign in

    if (!isSignInForm) {
      // Sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            photoURL:
            userAvtar+name.current.value,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { email, uid, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // sign in code
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user; 
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BackgroundImage}
          alt="NetflixImageLogin"
          className="brightness-[.5]"
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
            ref={name}
            type="text"
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
