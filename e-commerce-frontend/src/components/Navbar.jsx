import React, { useEffect, useState } from "react";

// react icons
import { IoIosSearch } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import Container from "../components/Container";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { AccountReducer } from "../redux/slices/AuthSlice";
import axios from "axios";

const Navbar = () => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const user = useSelector((state) => state.account.account);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(AccountReducer(""));
    location.reload();
  };

  const fetchCart = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/v1/cart/single/${user.id}`,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: `token:${token}`,
          },
        }
      );
      console.log(res);
      setCart(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  });

  return (
    <nav className=" bg-white rounded-full px-[10px] py-[8px]">
      <Container>
        <div className="flex items-center justify-between relative">
          <img
            src="https://i.ibb.co/0BZfPq6/darklogo.png"
            alt="logo"
            className="w-[55px] "
          />

          {/* nav links */}
          <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
            <Link
              to="/"
              className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize"
            >
              home
            </Link>

            <Link
              to="/cart"
              className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize"
            >
              Cart ({cart?.length})
            </Link>

            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
              blogs
            </li>

            <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
              shop
            </li>
          </ul>

          {/* action buttons */}

          {user ? (
            <div className=" flex items-center justify-end gap-5">
              <span className=" font-bold capitalize text-xl">{user.name}</span>

              <button
                onClick={handleLogout}
                className=" cursor-pointer py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="items-center gap-[10px] flex">
              <Link
                to="/login"
                className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize hover:text-[#3B9DF8] transition-all duration-300 sm:flex hidden"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="py-[7px] text-[1rem] px-[16px] rounded-full capitalize bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden"
              >
                Sign up
              </Link>

              <CiMenuFries
                className="text-[1.8rem] mr-1 text-[#424242]c cursor-pointer md:hidden flex"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              />
            </div>
          )}

          {/* mobile sidebar */}
          <aside
            className={` ${
              mobileSidebarOpen
                ? " left-0 opacity-1000 z-20"
                : " left-[-100%] opacity-0 z-[-1]"
            } md:hidden bg-white p-4 text-center absolute top-[65px] right-0 w-full sm:w-[50%] rounded-md transition-all duration-300`}
          >
            <div className="relative mb-5">
              <input
                className="py-1.5 pr-4 w-full pl-10 rounded-full border border-gray-200 outline-none focus:border-[#3B9DF8]"
                placeholder="Search..."
              />
              <IoIosSearch className="absolute top-[8px] left-3 text-gray-500 text-[1.3rem]" />
            </div>
            <ul className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col">
              <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
                home
              </li>

              <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
                features
              </li>

              <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
                blogs
              </li>

              <li className="before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize">
                shop
              </li>
            </ul>
          </aside>
        </div>
      </Container>
      {/* logo */}
    </nav>
  );
};

export default Navbar;
