import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
// react icons
import { RxCross1 } from "react-icons/rx";
const AllProducts = () => {
  let token = Cookies.get("token");
  const [allProducts, setAllProducts] = useState([]);
  const [targetProduct, setTargetProduct] = useState({
    id: "",
    name: "",
    description: "",
    sellingPrice: "",
    discountPrice: "",
    stock: "",
    images: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fatchProducts = async () => {
    let res = await axios.get("http://localhost:5000/api/v1/product/all/");
    setAllProducts(res.data.data);
  };

  const deleteProduct = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:5000/api/v1/product/delete/${id}`,
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
      console.log(error);
    }
  };
  // handle open modal
  const handleModal = (item) => {
    setIsModalOpen(true);
    setTargetProduct({
      id: item?._id,
      name: item?.name,
      description: item?.description,
      sellingPrice: item?.sellingPrice,
      discountPrice: item?.discountPrice,
      stock: item?.stock,
      images: item?.images,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", targetProduct.name);
    formData.append("description", targetProduct.description);
    formData.append("sellingPrice", targetProduct.sellingPrice);
    formData.append("discountPrice", targetProduct.discountPrice);
    formData.append("stock", targetProduct.stock);
    if (targetProduct.images) {
      for (let i = 0; i < targetProduct.images.length; i++) {
        formData.append("images", targetProduct.images[i]);
      }
    }

    try {
      let res = await axios.patch(
        `http://localhost:5000/api/v1/product/update/${targetProduct.id}`,
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
      setTimeout(() => {
        location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    fatchProducts();
  }, []);

  return (
    <main className=" w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Selling Price
            </th>
            <th scope="col" className="px-6 py-3">
              Discount Price
            </th>
            <th scope="col" className="px-6 py-3">
              Stock
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {allProducts.map((item, i) => (
            <tr
              key={i}
              className="odd:bg-white  even:bg-gray-50 border-b  border-gray-200"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                <img src={item?.images[0]} className="w-10 h-10" alt="" />
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {item?.name}
              </th>

              <td className="px-6 py-4">{item?.description}</td>
              <td className="px-6 py-4">{item?.sellingPrice}</td>
              <td className="px-6 py-4">{item?.discountPrice}</td>
              <td className="px-6 py-4">{item?.stock}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleModal(item)}
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(item._id)}
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
            <h1 className="text-[1.5rem] font-bold">Update Product</h1>
            <RxCross1
              className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </div>

          <form onSubmit={handleUpdate} className="flex flex-col gap-5 p-4">
            <div>
              <label
                htmlFor="name"
                className="text-[1rem] font-[500] text-[#464646]"
              >
                Product Name
              </label>
              <input
                value={targetProduct.name}
                onChange={(e) =>
                  setTargetProduct({
                    ...targetProduct,
                    name: e.target.value,
                  })
                }
                type="text"
                name="name"
                id="name"
                placeholder="Product Name"
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
                value={targetProduct.description}
                onChange={(e) =>
                  setTargetProduct({
                    ...targetProduct,
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
            <div>
              <label
                htmlFor="des"
                className="text-[1rem] font-[500] text-[#464646]"
              >
                Selling Price
              </label>
              <input
                value={targetProduct.sellingPrice}
                onChange={(e) =>
                  setTargetProduct({
                    ...targetProduct,
                    sellingPrice: e.target.value,
                  })
                }
                type="text"
                name="des"
                id="des"
                placeholder=" Selling Price"
                className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
              />
            </div>
            <div>
              <label
                htmlFor="des"
                className="text-[1rem] font-[500] text-[#464646]"
              >
                Discount Price
              </label>
              <input
                value={targetProduct.discountPrice}
                onChange={(e) =>
                  setTargetProduct({
                    ...targetProduct,
                    discountPrice: e.target.value,
                  })
                }
                type="text"
                name="des"
                id="des"
                placeholder="  Discount Price"
                className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
              />
            </div>
            <div>
              <label
                htmlFor="des"
                className="text-[1rem] font-[500] text-[#464646]"
              >
                Stock
              </label>
              <input
                value={targetProduct.stock}
                onChange={(e) =>
                  setTargetProduct({
                    ...targetProduct,
                    stock: e.target.value,
                  })
                }
                type="text"
                name="des"
                id="des"
                placeholder="Stock"
                className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
              />
            </div>

            <input
              onChange={(e) =>
                setTargetProduct({
                  ...targetProduct,
                  images: e.target.files,
                })
              }
              type="file"
              name=""
              id=""
              accept="image/*"
              multiple
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
    </main>
  );
};

export default AllProducts;
