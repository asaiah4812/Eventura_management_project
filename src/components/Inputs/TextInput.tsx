import React from 'react'

interface TextProps {
    type: string;
    holder: string;
}

const TextInput = ({type, holder}:TextProps) => {
  return (
    <div>
        <input type={type} className="bg-transparent p-4 w-full placeholder:md:text-xl  outline-none"  placeholder={holder} />
    </div>
  )
}

export default TextInput