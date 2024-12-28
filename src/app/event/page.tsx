import React from 'react'
import Image from "next/image"
import { MapPin } from 'lucide-react'
import Map from '@/components/Map'

const Events = () => {
  return (
    <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto pt-16">
      <div className='bg-[#1f2937]/20 p-5 rounded-md'>
        <div className='relative w-full h-[180px] sm:h-[300px] lg:h-[500px]  p-4 rounded-md overflow-hidden'>
            <Image src={'/sandlip.jpeg'} alt='even photo' fill={true}/>
        </div>
        <h2 className="font-bold text-2xl text-slate-200 py-4">Abstract meetup</h2>
        <div className='flex flex-col gap-3'>
            <div className='flex gap-x-4 p-3 rounded-md bg-[#111827]'>
              <div className='flex flex-col'>
                <div className='rounded-t-md bg-slate-600 text-slate-200 text-xs px-4 py-0.5'>
                  Sat
                </div>
                <div className='rounded-b-md bg-slate-800 text-white font-bold px-4 py-0.5 text-center'>
                  13
                </div>
              </div>
              <div>
                <h2>Saturday 21 December</h2>
                <span className='text-slate-400 text-sm'>12:00 - 14:GMT +1</span>
              </div>
            </div>
            <div className='flex gap-x-4 p-3 rounded-md bg-[#111827]'>
              <div className='flex bg-slate-700 hover:bg-slate-800 items-center justify-center rounded-md px-3 py-3'>
                <MapPin/>               
              </div>
              <div>
                <h2>Saturday 21 December</h2>
                <span className='text-slate-400 text-sm'>12:00 - 14:GMT +1</span>
              </div>
            </div>
        </div>
        <div className='py-4'>
          <h2 className='font-medium text-lg'>About Event</h2>

          <p className='text-sm md:text-md text-justify'>
          Join us for the Blockchain Summit 2024, where technology meets innovation! This event brings together leading experts, developers, and enthusiasts to discuss the latest trends in blockchain technology, decentralized systems, and their real-world applications.

            Explore insightful talks, interactive workshops, and networking opportunities designed to help you stay ahead in the ever-evolving world of blockchain. Whether you're an experienced professional or just getting started, there's something for everyone.

            Don’t miss the chance to connect, learn, and innovate!Join us for the Blockchain Summit 2024, where technology meets innovation! This event brings together leading experts, developers, and enthusiasts to discuss the latest trends in blockchain technology, decentralized systems, and their real-world applications.

            Explore insightful talks, interactive workshops, and networking opportunities designed to help you stay ahead in the ever-evolving world of blockchain. Whether you're an experienced professional or just getting started, there's something for everyone.

            Don’t miss the chance to connect, learn, and innovate!
          </p>

          <div className='py-4'>
            <div className='inline-flex items-center gap-3'>
            <div className='p-3 bg-slate-800 rounded-md flex justify-center items-start w-fit'>
              <MapPin width={20} height={20} />
            </div>
              <span>Location</span>
            </div>
            <div>
              <div className='py-5'>

              <Map/>       
              </div>
              <div className='p-4 rounded-md bg-[#111827] mb-4'>
                <h2 className='font-medium text-lg text-slate-100 py-2'>Hosted by</h2>
                <div className='flex gap-x-4 py-3 items-center'>
                  <div className='rounded-full relative overflow-hidden w-10 md:w-12 h-10 md:h-12'>
                    <Image src={'/profile.jpg'} fill={true} alt='profile'/>
                  </div>
                  <span>John Emeka</span>
                </div>
              </div>
              <div className='p-4 rounded-md bg-[#111827] mb-4'>
                <h2 className='font-medium text-lg text-slate-100 py-2'>Attendee</h2>
                <div className='flex py-3 gap-3 items-center'>
                  <div className="flex items-center">
                  <div className='rounded-full relative overflow-hidden w-10 md:w-12 h-10 md:h-12'>
                    <Image src={'/profile.jpg'} fill={true} alt='profile'/>
                  </div>
                  <div className='rounded-full relative overflow-hidden w-10 md:w-12 h-10 md:h-12 -m-5'>
                    <Image src={'/profile.jpg'} fill={true} alt='profile'/>
                  </div>
                  <div className='rounded-full relative overflow-hidden w-10 md:w-12 h-10 md:h-12 -m-1'>
                    <Image src={'/profile.jpg'} fill={true} alt='profile'/>
                  </div>
                  </div>
                  <span className='text-sm text-slate-300'>Joe, Maurine, Matthew</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events