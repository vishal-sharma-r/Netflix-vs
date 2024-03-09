import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const showGptSerach = useSelector((store) => store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        // navigate to error page
        navigate("/error");
      });
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, uid, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full justify-between flex flex-col items-center md:flex-row">
      <img src={LOGO} alt="logo" className="w-44 mx-auto md:mx-0" />
      {user && (
        <div className="p-2 flex items-center">
          {showGptSerach && (
            <select
              className="p-2 m-2 bg-gray-900 text-white outline-none border border-white rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 mx-4 my-2 px-4 bg-purple-600 text-white rounded-lg"
            onClick={() => handleGptSearchClick()}
          >
            {showGptSerach ? "Homepage" : "GPT Search"}
          </button>
          <img
            src={user?.photoURL}
            alt="userImage"
            className="w-10 h-10 rounded-full hidden md:inline-block"
          />
          <div className="flex flex-row">
          {!dropDown && (
            <RiArrowDropDownLine
              size={40}
              color="white"
              onClick={() => setDropDown(!dropDown)}
            />)}
          {dropDown && (
            <RiArrowDropUpLine
              size={40}
              color="white"
              onClick={() => setDropDown(!dropDown)}
            />)}
          
          
            {dropDown && (
               <div className="absolute md:top-[4.2rem] md:right-5 bg-white border rounded-md md:p-2 mt-10 md:mt-0">
               <button
                 className="font-bold text-black p-2 md:p-0"
                 onClick={() => handleSignOut()}
               >
                 Sign out
               </button>
             </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
