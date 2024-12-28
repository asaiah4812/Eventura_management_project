import React from "react";

interface TextInputProps {
  type: "text" | "number" | "email";
  holder: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  holder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      placeholder={holder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  );
};

export default TextInput;
