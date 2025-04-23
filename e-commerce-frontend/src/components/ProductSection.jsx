import React, { useEffect, useState } from "react";
import Container from "./Container";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductSection = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/v1/product/all");
      console.log(res.data.data);

      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section className=" my-10">
      <Container>
        <h2 className="text-2xl font-bold">Products</h2>

        <div className=" mt-5 flex flex-wrap gap-5">
          {products.map((p, i) => (
            <ProductCard
              className=" w-full md:w-1/3 lg:w-[23%]"
              data={p}
              key={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ProductSection;
