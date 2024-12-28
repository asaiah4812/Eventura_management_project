import React from 'react'
import Image from "next/image"
import { MapPin } from 'lucide-react'
import Map from '@/components/Map'
import FileInput from '@/components/Inputs/FileInput'
import TextInput from '@/components/Inputs/TextInput'
import { DatePicker } from '@/components/Inputs/DateInput'

const CreateEvent = () => {
  return (
    <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto pt-16">
      <div className='bg-[#1f2937]/20 p-5 rounded-md'>
        <div className='relative w-full p-4 rounded-md overflow-hidden'>
            <FileInput/>
        </div>
        <div className='flex flex-col gap-3'>
            <TextInput type='text' holder='Event Name'/>
            <DatePicker/>
        </div>
        <div className='py-4'>
          <h2 className='font-medium text-lg'>About Event</h2>
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

export default CreateEvent;