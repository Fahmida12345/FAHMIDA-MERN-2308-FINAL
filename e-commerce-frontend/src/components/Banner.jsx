import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [banner, setBanners] = useState([]);

  const fetchBanner = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/v1/banner/all");
      setBanners(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banner.length);
    }, 1500);

    return () => clearInterval(autoSlide);
  }, [banner.length]);

  useEffect(() => {
    fetchBanner();
  }, []);
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banner.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banner.length) % banner.length);
  };

  return (
    <div className="relative flex items-center justify-center w-full  rounded-lg">
      <FiChevronLeft
        className="absolute left-5 text-secondary text-[1.8rem] cursor-pointer"
        onClick={prevSlide}
      />
      <div className="text-[1.3rem] text-secondary font-[600]">
        {<img src={banner[currentSlide]?.image} alt="" />}
      </div>
      <FiChevronRight
        className="absolute right-5 text-secondary text-[1.8rem] cursor-pointer"
        onClick={nextSlide}
      />
    </div>
  );
};

export default Banner;
