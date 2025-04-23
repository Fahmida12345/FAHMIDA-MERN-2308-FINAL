import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Cookies from "js-cookie";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import AllCategory from "./AllCategory";

const AddProduct = () => {
  const [allCategories, setAllCategories] = useState([]);
  const token = Cookies.get("token");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState(null);

  const handelUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("sellingPrice", sellingPrice);
    formData.append("discountPrice", discountPrice);
    formData.append("stock", stock);
    formData.append("category", category);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/product/add",
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

  // fetch all categories
  const fetchCategories = async () => {
    let res = await axios.get("http://localhost:5000/api/v1/category/all/");
    setAllCategories(res.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main className="w-10/12 h-screen p-2">
      <h2 className="text-2xl font-bold text-black"> Add Product</h2>
      <form onSubmit={handelUpload} action="" className="mt-10">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          name="name"
          id="name"
          placeholder="Product name"
          className=" mb-5 border-border border-b outline-none px-4 w-full 1024px:w-[80%] py-3 focus:border-primary transition-colors duration-300"
        />
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          type="text"
          name="description"
          id="name"
          placeholder="Product Description"
          className=" mb-5 border-border border-b outline-none px-4 w-full 1024px:w-[80%] py-3 focus:border-primary transition-colors duration-300"
        />
        <input
          onChange={(e) => setSellingPrice(e.target.value)}
          value={sellingPrice}
          type="text"
          name="sellingPrice"
          id="sellingPrice"
          placeholder="Selling Price"
          className=" mb-5 border-border border-b outline-none px-4 w-full 1024px:w-[80%] py-3 focus:border-primary transition-colors duration-300"
        />
        <input
          onChange={(e) => setDiscountPrice(e.target.value)}
          value={discountPrice}
          type="text"
          name=" discountPrice"
          id="discountPrice"
          placeholder=" Discount Price"
          className=" mb-5 border-border border-b outline-none px-4 w-full 1024px:w-[80%] py-3 focus:border-primary transition-colors duration-300"
        />
        <input
          onChange={(e) => setStock(e.target.value)}
          value={stock}
          type="text"
          name=" stock"
          id="stock"
          placeholder="Stock"
          className=" mb-5 border-border border-b outline-none px-4 w-full 1024px:w-[80%] py-3 focus:border-primary transition-colors duration-300"
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          id=""
          className="w-full border p-2"
        >
          {allCategories.map((cat, i) => (
            <option className="p-2" key={cat?._id} value={cat?._id}>
              {cat?.name}
            </option>
          ))}
        </select>
        <input
          onChange={(e) => setImages(e.target.files)}
          type="file"
          name="image"
          placeholder="Category Image"
          id=""
          accept="image/*"
          multiple
        />
        <button className="bg-[#3B9DF8] w-[40px] h-[40px] rounded-full flex items-center justify-center text-white">
          <FaPlus />
        </button>
      </form>
    </main>
  );
};

export default AddProduct;
