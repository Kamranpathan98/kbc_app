import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import Avatar from "../assets/img/avatar.png";
import Logo from "../assets/img/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{user}, dispatch] = useStateValue()

  const handleUserClick = async () => {
    const {user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0]
    })
  };
  console.log(user ? user.photoURL : Avatar);
  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      {/* Desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p
            style={{ color: "var(--heading-color)" }}
            className="text-xl font-bold"
          >
            KBC
          </p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li
              style={{ color: "var(--text-color)" }}
              className="text-base duration-100 transition-all ease-in-out cursor-pointer"
            >
              Home
            </li>
            <li
              style={{ color: "var(--text-color)" }}
              className="text-base duration-100 transition-all ease-in-out cursor-pointer"
            >
              Menu
            </li>
            <li
              style={{ color: "var(--text-color)" }}
              className="text-base duration-100 transition-all ease-in-out cursor-pointer"
            >
              About Us
            </li>
            <li
              style={{ color: "var(--text-color)" }}
              className="text-base duration-100 transition-all ease-in-out cursor-pointer"
            >
              Service
            </li>
          </ul>
          <div className="relative flex items-center justify-center">
            <MdShoppingBasket
              style={{ color: "var(--text-color)" }}
              className="text-2xl cursor-pointer"
            />
            <div
              className="absolute  -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--cart-num-bg)" }}
            >
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="profile"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              onClick={handleUserClick}
            />
          </div>
        </div>
      </div>
      {/* Mobile view */}
      <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
};

export default Header;
