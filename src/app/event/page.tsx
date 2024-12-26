import React from 'react'
import Image from "next/image"

const Events = () => {
  return (
    <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto">
        <div className='relative w-full h-[200px] md:h-[300px] lg:h-[500px] mt-24 p-4 rounded-md overflow-hidden'>
            <Image src={'/sandlip.jpeg'} alt='even photo' fill={true}/>
        </div>
        <h2 className="font-medium text-xl text-slate-400 py-2">Event Name</h2>
        <div className='flex flex-col gap-2'>

        </div>
    </div>
  )
}

export default Events