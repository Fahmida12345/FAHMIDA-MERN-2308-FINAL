import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
// for react icons
import { RxCross1 } from "react-icons/rx";

const AllCategory = () => {
  let token = Cookies.get("token");
  const [categories, setCategories] = useState([]);
  const [targetCategory, setTargetCategory] = useState({
    id: "",
    name: "",
    description: "",
    image: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // fetch all categories
  const fetchCategories = async () => {
    let res = await axios.get("http://localhost:5000/api/v1/category/all/");
    setCategories(res.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //  delete category
  const handlecategoryDelete = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:5000/api/v1/category/delete/${id}`,
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
      toast.success(res.data.msg);

      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
    }
  };

  // handle open modal
  const handleModal = (cat) => {
    setIsModalOpen(true);
    setTargetCategory({
      id: cat?._id,
      name: cat?.name,
      description: cat?.description,
      image: cat?.image,
    });
  };

  // handle update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", targetCategory.name);
    formData.append("description", targetCategory.description);
    if (targetCategory.image) {
      formData.append("image", targetCategory.image);
    }

    try {
      let res = await axios.patch(
        `http://localhost:5000/api/v1/category/update/${targetCategory.id}`,
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

      console.log(res);
      toast.success(res.data.msg);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <main className=" w-full">
      <div className="relative overflow-x-auto shadow-md ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Category name
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, i) => (
              <tr
                key={i}
                className="odd:bg-white  even:bg-gray-50 border-b  border-gray-200"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  <img src={item?.image} className="w-10 h-10" alt="" />
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {item?.name}
                </th>

                <td className="px-6 py-4">{item?.products?.length}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleModal(item)}
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handlecategoryDelete(item._id)}
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-5"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className={`${
            isModalOpen ? " visible" : " invisible"
          } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
        >
          <div
            className={`${
              isModalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
            } w-[90%] sm:w-[80%] md:w-[35%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
          >
            <div className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
              <h1 className="text-[1.5rem] font-bold">Update Category</h1>
              <RxCross1
                className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            S
            <form onSubmit={handleUpdate} className="flex flex-col gap-5 p-4">
              <div>
                <label
                  htmlFor="name"
                  className="text-[1rem] font-[500] text-[#464646]"
                >
                  Category Name
                </label>
                <input
                  value={targetCategory.name}
                  onChange={(e) =>
                    setTargetCategory({
                      ...targetCategory,
                      name: e.target.value,
                    })
                  }
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Category Name"
                  className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                />
              </div>

              <div>
                <label
                  htmlFor="des"
                  className="text-[1rem] font-[500] text-[#464646]"
                >
                  Description
                </label>
                <input
                  value={targetCategory.description}
                  onChange={(e) =>
                    setTargetCategory({
                      ...targetCategory,
                      description: e.target.value,
                    })
                  }
                  type="text"
                  name="des"
                  id="des"
                  placeholder="Description"
                  className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                />
              </div>

              <input
                onChange={(e) =>
                  setTargetCategory({
                    ...targetCategory,
                    image: e.target.files[0],
                  })
                }
                type="file"
                name=""
                id=""
                accept="image/*"
              />

              <button
                type="submit"
                className="py-2 px-4 w-full bg-[#3B9DF8] text-[#fff] rounded-md"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AllCategory;
