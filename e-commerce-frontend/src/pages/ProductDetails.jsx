import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Cookies from "js-cookie";

// react icons
import { FaStar } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const ProductDetails = () => {
  const token = Cookies.get("token");
  const user = useSelector((state) => state.account.account);
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [isFavorite, setIsFavorite] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 5,
  });
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Fetches all products from the backend and sets the state
   * @return {Promise<void>}
   */
  /*******  5fb8b928-5f68-4169-abc5-7fb47f796d27  *******/
  const fetchSingleProduct = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/v1/product/single/${id}`
      );
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % products.images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + products.images.length) % products.images.length
    );
  };

  const formatNumber = (number) => number.toString().padStart(2, "0");

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  const addToCart = async () => {
    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/cart/add",
        {
          userId: user.id,
          product: id,
        },
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
      toast.success("Product added to cart");
      console.log(res);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <div className="mx-auto md:px-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Left side - Image gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            {/* NEW and SALE tags */}
            <div className="absolute top-4 left-4 z-10 space-y-2">
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white">
                NEW
              </span>
              <div className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-500 text-white">
                -50%
              </div>
            </div>

            {/* Main image with navigation arrows */}
            <div className="relative h-full">
              <img
                src={products?.images?.[currentImageIndex]}
                alt={`Product view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"
                aria-label="Previous image"
              >
                <BiChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-lg hover:bg-[#0FABCA] hover:text-white"
                aria-label="Next image"
              >
                <BiChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Thumbnail images */}
          <div className="flex gap-4 justify-between">
            {products?.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative transition-all duration-300 w-[8rem] aspect-square ${
                  currentImageIndex === index
                    ? "ring-2 ring-[#0FABCA]"
                    : "hover:ring-2 hover:ring-[#0FABCA]"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="w-4 h-4 fill-black" />
              ))}
            </div>
            <span className="text-sm text-gray-600">11 Reviews</span>
          </div>

          <h1 className="text-[1.6rem] md:text-[1.9rem] text-gray-800 font-semibold">
            {products?.name}
          </h1>

          <p className="text-gray-600 text-[0.9rem]">{products?.description}</p>

          <div className="flex items-center gap-3">
            <span className="text-[1.5rem] text-gray-800 font-medium">
              ${products?.discountPrice}
            </span>
            <span className="text-lg text-gray-500 line-through">
              ${products.sellingPrice}
            </span>
          </div>

          <div className="pb-2">
            <p className="font-medium text-[0.9rem] text-gray-600">
              Offer expires in:
            </p>
            <div className="flex items-center gap-[10px] mt-2">
              <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 bg-gray-100 text-[1.9rem] font-semibold">
                  {formatNumber(timeLeft.days)}
                </h5>
                <span className="text-[0.7rem]">Days</span>
              </div>
              <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 bg-gray-100 text-[1.9rem] font-semibold">
                  {formatNumber(timeLeft.hours)}
                </h5>
                <span className="text-[0.7rem]">Hours</span>
              </div>
              <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 bg-gray-100 text-[1.9rem] font-semibold">
                  {formatNumber(timeLeft.minutes)}
                </h5>
                <span className="text-[0.7rem]">Minutes</span>
              </div>
              <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 bg-gray-100 text-[1.9rem] font-semibold">
                  {formatNumber(timeLeft.seconds)}
                </h5>
                <span className="text-[0.7rem]">Seconds</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center pt-6">
            <div className="flex items-center bg-gray-100 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-[0.560rem] text-[1.3rem] font-[300] hover:bg-gray-100 rounded-l-md"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-10 font-medium outline-none text-[0.9rem] bg-transparent text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-[0.560rem] text-[1.3rem] font-[300] hover:bg-gray-100 rounded-r-md"
              >
                +
              </button>
            </div>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="py-3 border border-gray-200 rounded-md flex items-center justify-center gap-[10px] grow hover:bg-gray-50"
            >
              {isFavorite ? (
                <FaHeart className="w-5 h-5 text-red-500" />
              ) : (
                <FaRegHeart className="w-5 h-5 text-gray-800" />
              )}
              Wishlist
            </button>
          </div>

          <button
            onClick={addToCart}
            className="w-full px-6 py-3 bg-[#0FABCA] text-white rounded-md hover:bg-[#0FABCA]/90"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
