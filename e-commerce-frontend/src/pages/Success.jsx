import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-green-50 py-40">
      <div className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-xl">
        <FaCheckCircle className="mb-4 h-20 w-20 text-green-500" />
        <h1 className="text-2xl font-bold text-gray-800">
          Payment Successful!
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <button
          className="mt-6 rounded-lg bg-green-500 px-6 py-2 font-semibold text-white transition duration-200 hover:bg-green-600"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
