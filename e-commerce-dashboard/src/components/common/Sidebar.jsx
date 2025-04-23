import React, { useState } from "react";

// react icons
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { FaDisplay, FaPlus } from "react-icons/fa6";
import {
  IoFolderOpenOutline,
  IoNewspaperOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { PiShoppingBagLight } from "react-icons/pi";
import { FiFlag } from "react-icons/fi";
import { RiTeamLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";
import Cookies from "js-cookie";
const Sidebar = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const handleLogout = () => {
    Cookies.remove("token");
    location.reload();
  };
  return (
    <aside
      className={`${
        isCollapse ? "py-[20px] px-[30px]" : "py-[15px] px-[10px]"
      }  boxShadow transition-all duration-300 ease  bg-white h-full w-2/12 border-r-[1px] border-black`}
    >
      {isCollapse ? (
        <img
          src="https://i.ibb.co/ZHYQ04D/footer-logo.png"
          alt="logo"
          className="w-[130px] cursor-pointer"
          onClick={() => setIsCollapse(!isCollapse)}
        />
      ) : (
        <img
          src="https://i.ibb.co/0BZfPq6/darklogo.png"
          alt="logo"
          className="w-[50px] mx-auto cursor-pointer"
          onClick={() => setIsCollapse(!isCollapse)}
        />
      )}

      {/* general section */}
      <div className="mt-6">
        <p
          className={`${
            isCollapse ? "text-[1rem]" : "text-[0.9rem] text-center"
          } text-gray-500 font-[400]`}
        >
          General
        </p>

        <div className="mt-3 flex flex-col gap-[5px]">
          <Link to="/">
            <div
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-[8px]">
                <FaHome className="text-[1.3rem] text-gray-800" />
                <p
                  className={`${
                    isCollapse ? "inline" : "hidden"
                  } text-[1.1rem] font-[400] text-gray-800}`}
                >
                  Dashboard
                </p>
              </div>
            </div>
          </Link>
          <Link to="/add-product">
            <div
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-[8px]">
                <MdOutlineAnalytics className="text-[1.3rem] text-gray-800" />
                <p
                  className={`${
                    isCollapse ? "inline" : "hidden"
                  } text-[1.1rem] font-[400] text-gray-800}`}
                >
                  Add Product
                </p>
              </div>
            </div>
          </Link>
          <Link to="/all-products">
            <div
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-[8px]">
                <IoNewspaperOutline className="text-[1.3rem] text-gray-800" />
                <p
                  className={`${
                    isCollapse ? "inline" : "hidden"
                  } text-[1.1rem] font-[400] text-gray-800}`}
                >
                  All products
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-76px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                  News
                </p>
              </div>
            </div>
          </Link>
          <Link to="/add-category">
            <div
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-[8px]">
                <PiShoppingBagLight className="text-[1.3rem] text-gray-800" />
                <p
                  className={`${
                    isCollapse ? "inline" : "hidden"
                  } text-[1.1rem] font-[400] text-gray-800}`}
                >
                  Add Category
                </p>
              </div>

              {/* tooltip */}
              <div
                className={`${
                  isCollapse ? "hidden" : "inline"
                } absolute top-0 right-[-118px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}
              >
                <p className="text-[0.9rem] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                  Recruitment
                </p>
              </div>
            </div>
          </Link>

          <Link to="/all-category">
            <div
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-[8px]">
                <IoFolderOpenOutline className="text-[1.3rem] text-gray-800" />
                <p
                  className={`${
                    isCollapse ? "inline" : "hidden"
                  } text-[1.1rem] font-[400] text-gray-800}`}
                >
                  All Category
                </p>
              </div>
            </div>
          </Link>

          <Link to="/all-banners">
            <div
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-[8px]">
                <FaDisplay className="text-[1.3rem] text-gray-800" />
                <p
                  className={`${
                    isCollapse ? "inline" : "hidden"
                  } text-[1.1rem] font-[400] text-gray-800}`}
                >
                  Banners Setting
                </p>
              </div>
            </div>
          </Link>
          <button onClick={handleLogout}>
            <div
              className={`${
                isCollapse ? "justify-between" : "justify-center"
              } flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group`}
            >
              <div className="flex items-center gap-[8px]">
                <MdLogout className="text-[1.3rem] text-gray-800" />
                <p
                  className={`${
                    isCollapse ? "inline" : "hidden"
                  } text-[1.1rem] font-[400] text-gray-800}`}
                >
                  Logout
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
