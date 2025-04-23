import React, { useState } from "react";

// react icons
import { IoEyeOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const ProductCard = ({ data, className }) => {
  const [wishlistVisible, setWishlistVisible] = useState(false);
  const [compareVisible, setCompareVisible] = useState(false);
  const [quickViewVisible, setQuickViewVisible] = useState(false);

  const [rating, setRating] = useState(5);

  return (
    <div
      className={`border border-gray-300 ${className} relative rounded-2xl mb-5 overflow-hidden`}
    >
      {/* badge */}
      <span className="bg-red-500 rounded-sm px-3 py-1 z-10 text-[0.9rem] text-white absolute top-3 right-3">
        HOT
      </span>

      {/* product image */}
      <div className="group relative overflow-hidden cursor-pointer">
        <img
          alt="product/image"
          src={data?.images[0]}
          className="w-[240px] mx-auto mt-5"
        />

        {/* action buttons */}
        <div className="absolute bg-[rgb(0,0,0,0.3)] z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-0 left-0 flex items-center justify-center w-full h-full">
          <div className="flex items-center gap-[15px] justify-center">
            <div
              onMouseOver={() => setWishlistVisible(true)}
              onMouseOut={() => setWishlistVisible(false)}
              className="relative w-max group-hover:translate-y-0 translate-y-[50px] transition-all opacity-0 group-hover:opacity-100 duration-300"
            >
              <p className="rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer">
                <IoMdHeartEmpty className="text-[1.3rem]" />
              </p>

              {/* tooltip */}
              <p
                className={`${
                  wishlistVisible
                    ? "opacity-100 z-[100] translate-y-0"
                    : "opacity-0 z-[-1] translate-y-[20px]"
                } absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}
              >
                Wishlist
                {/* arrow */}
                <span className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
              </p>
            </div>

            <div
              onMouseOver={() => setCompareVisible(true)}
              onMouseOut={() => setCompareVisible(false)}
              className="relative w-max group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-[80px]"
            >
              <p className="rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer">
                <HiArrowsUpDown className="text-[1.3rem]" />
              </p>

              {/* tooltip */}
              <p
                className={`${
                  compareVisible
                    ? "opacity-100 z-[100] translate-y-0"
                    : "opacity-0 z-[-1] translate-y-[20px]"
                } absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}
              >
                Compare
                {/* arrow */}
                <span className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
              </p>
            </div>

            <div
              onMouseOver={() => setQuickViewVisible(true)}
              onMouseOut={() => setQuickViewVisible(false)}
              className="relative w-max group-hover:translate-y-0 transition-all duration-700 opacity-0 group-hover:opacity-100 translate-y-[110px]"
            >
              <p className="rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer">
                <IoEyeOutline className="text-[1.3rem]" />
              </p>

              {/* tooltip */}
              <p
                className={`${
                  quickViewVisible
                    ? "opacity-100 z-[100] translate-y-0"
                    : "opacity-0 z-[-1] translate-y-[20px]"
                } absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}
              >
                Quick View
                {/* arrow */}
                <span className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* product details */}
      <div className="p-4 pt-6">
        {/* review area */}
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
              const starRating = index + 1;
              return (
                <FaStar
                  key={starRating}
                  className={`cursor-pointer ${
                    starRating <= rating ? "text-[#FA8232]" : "text-gray-300"
                  }`}
                  size={15}
                  onClick={() => setRating(starRating)}
                />
              );
            })}
          </div>
          <span className="text-[0.8rem] text-gray-500">(738)</span>
        </div>

        <Link
          to={`/product/${data?._id}`}
          className="text-[1.1rem] text-gray-900 font-medium mb-2 mt-2"
        >
          {data?.name}
        </Link>
        <p className="text-[1.150rem] font-medium text-[#0FABCA] mt-1">
          BDT {data?.discountPrice}{" "}
          <del className=" text-xs ml-3">{data?.sellingPrice}</del>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
