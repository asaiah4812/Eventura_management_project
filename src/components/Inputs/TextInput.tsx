"use client";

import React from "react";

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  multiline?: boolean;
}

export default function TextInput({
  label,
  multiline,
  className,
  ...props
}: TextInputProps) {
  const inputClasses = `
    w-full
    px-4
    py-2
    bg-gray-900
    border
    border-gray-700
    rounded-md
    text-white
    placeholder-gray-400
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-transparent
    disabled:opacity-50
    disabled:cursor-not-allowed
    ${className || ""}
  `;

  if (multiline) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={inputClasses}
          rows={4}
        />
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <input
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        className={inputClasses}
      />
    </div>
  );
}
