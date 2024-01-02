import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { RiArrowDropDownLine } from "react-icons/ri";
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
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
      <img src={LOGO} alt="logo" className="w-44" />
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
            className="w-10 h-10 rounded-full"
          />
          <div className="">
            <RiArrowDropDownLine
              size={40}
              color="white"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown && (
              <button
                className="font-bold text-white ml-2"
                onClick={() => handleSignOut()}
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
