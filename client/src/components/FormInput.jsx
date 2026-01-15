import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const FormInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error = "",
  options = [], // for select
  icon: Icon = null, // lucide icon component
  disabled = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const hasError = Boolean(error);

  return (
    <div className="w-full mb-4">
      {/* INPUT CONTAINER */}
      <div
        className={`
          flex items-center gap-2 px-5 py-3 rounded-full border transition bg-[#F5F5F5]
          ${hasError ? "border-red-500" : "border-gray-300"}
          focus-within:ring-2
          ${hasError ? "focus-within:ring-red-400" : "focus-within:ring-secondary"}
          ${disabled ? "bg-gray-100" : "bg-white"}
        `}
      >
        {/* LEFT ICON */}
        {Icon && (
          <Icon
            size={18}
            className={hasError ? "text-red-500" : "text-gray-400"}
          />
        )}

        {/* SELECT */}
        {type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className="w-full bg-transparent outline-none text-sm"
          >
            <option value="">{placeholder}</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          /* INPUT */
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className="w-full bg-transparent outline-none text-md"
          />
        )}

        {/* PASSWORD TOGGLE */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 hover:text-secondary"
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {hasError && (
        <div className="flex items-center gap-1 mt-1 text-xs text-red-500">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormInput;
