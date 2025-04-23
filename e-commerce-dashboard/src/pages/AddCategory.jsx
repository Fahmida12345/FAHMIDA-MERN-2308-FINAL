import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Cookies from "js-cookie";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

const AddCategory = () => {
  const token = Cookies.get("token");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const handelUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/category/createnew",
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="w-10/12 h-screenm p-2">
      <h2 className="text-2xl font-bold text-black"> Add Category</h2>
      <form onSubmit={handelUpload} action="" className="mt-10">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Category name"
          className=" mb-5 border-border border-b outline-none px-4 w-full 1024px:w-[80%] py-3 focus:border-primary transition-colors duration-300"
        />
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
    </main>
  );
};

export default AddCategory;
