import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 font-semibold mb-1 block pl-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full bg-white border-b-2 border-gray-300 focus:border-black focus:bg-gray-50 transition-all duration-150 outline-none px-3 py-2 text-[15px] rounded-t-md shadow-sm"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-primary"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="text-slate-400"
                onClick={toggleShowPassword}
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
