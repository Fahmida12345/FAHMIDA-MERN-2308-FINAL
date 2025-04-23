import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify/unstyled";
import { FaPlus } from "react-icons/fa6";
const BannerPage = () => {
  const token = Cookies.get("token");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [allBanners, setAllBanners] = useState([]);
  const handelUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image);
      let res = await axios.post(
        "http://localhost:5000/api/v1/banner/add",
        formData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Cookie: `token=${token}`,
          },
        }
      );
      console.log(res.data);
      toast.success(res.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };

  const fetchAllBanners = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/v1/banner/all", {
        withCredentials: true,
      });
      console.log(res.data.data);
      setAllBanners(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllBanners();
  }, []);

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:5000/api/v1/banner/delete/${id}`,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${token}`,
          },
        }
      );

      console.log(res);
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className=" w-full px-3">
      <h2 className="text-2xl font-bold text-black"> Banner Settings</h2>
      <form onSubmit={handelUpload} action="" className="mt-10">
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          name="description"
          id="name"
          placeholder="Category Description"
          className=" mb-5 border-border border-b outline-none px-4 w-full 1024px:w-[80%] py-3 focus:border-primary transition-colors duration-300"
        />
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="image"
          placeholder="Category Image"
          id=""
          accept="image/*"
        />
        <button className="bg-[#3B9DF8] w-[40px] h-[40px] rounded-full flex items-center justify-center text-white">
          <FaPlus />
        </button>
      </form>
      <section className="mt-10">
        <div className="flex flex-wrap gap-5">
          {allBanners.map((banner) => (
            <div
              className="w-3/12 rounded-lg overflow-hidden relative "
              key={banner._id}
            >
              <button
                onClick={() => handleDelete(banner._id)}
                className="absolute top-2 right-2 rounded-lg bg-red-600 cursor-pointer text-white p-1 "
              >
                Delete
              </button>
              <img src={banner.image} alt={banner.description} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default BannerPage;
