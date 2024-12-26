import Link from 'next/link';
import React from 'react'

interface ButProps {
    url: string;
    text: string;
    icon?: React.ReactNode;
}

const Button = ({url, icon, text}:ButProps) => {
  return (
    <>
    <Link href={url}
     className='py-3 px-16 md:px-10 rounded-lg text-white bg-blue-700 inline-flex gap-x-1 text-sm items-center hover:bg-blue-800'
     >{icon}{text}</Link>
    </>
  )
}

export default Button