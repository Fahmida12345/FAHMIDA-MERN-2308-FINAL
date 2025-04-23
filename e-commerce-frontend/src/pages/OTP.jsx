import axios from "axios";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.key);

  const [autoOtp, setAutoOtp] = useState("");
  const navigationInputs = useRef([]);

  const length = 6;

  const onChange = (value) => {
    setAutoOtp(value);
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...navigationInputs.current.map((input) => input.value)];

    // Ensure only a single digit is entered per box
    if (/^[0-9]$/.test(value) && value.length === 1) {
      newOtp[index] = value;
      onChange(newOtp.join(""));

      if (index < length - 1) {
        navigationInputs.current[index + 1].focus();
      }
    } else if (value === "") {
      newOtp[index] = "";
      onChange(newOtp.join(""));
    } else {
      e.target.value = value.slice(0, 1);
    }
  };

  const handleKeydown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !navigationInputs.current[index].value &&
      index > 0
    ) {
      navigationInputs.current[index - 1].focus();
    }
  };

  const verifyOTP = async () => {
    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/auth/otpEmailVerify",
        {
          email: location.state.key,
          otp: autoOtp,
        }
      );

      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className=" py-[250px] flex items-center justify-center flex-col">
      <h1 className=" text-3xl font-bold mb-10">OTP</h1>
      <div className="  grid grid-cols-6 gap-[10px] w-full md:w-[50%]">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (navigationInputs.current[index] = el)}
            className="p-3 text-center border border-[#bcbcbc] rounded-md outline-none focus:border-[#3B9DF8]"
            placeholder="0"
            max="1"
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeydown(e, index)}
            type="number"
          />
        ))}
      </div>

      <button
        onClick={verifyOTP}
        className=" cursor-pointer mt-10 py-3 px-6 rounded-full bg-[#3B9DF8] text-white"
      >
        Verify OTP
      </button>
    </main>
  );
};

export default OTP;
