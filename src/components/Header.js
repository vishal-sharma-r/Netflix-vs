import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { LOGO } from "../utils/constants";
import { RiArrowDropDownLine } from "react-icons/ri";
import { toggleGptSearchView } from "../utils/gptSlice";
const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
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
  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between items-center">
      <img src={LOGO} alt="logo" className="w-44" />
      {user && (
        <div className="p-2 flex items-center">
          <button
            className="py-2 mx-4 my-2 px-4 bg-purple-600 text-white rounded-lg"
            onClick={() => handleGptSearchClick()}
          >
            GPT Search
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
