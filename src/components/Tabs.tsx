"use client"
import Image from 'next/image';
import Link from 'next/link';
import { TabsBtn, TabsContent, TabsProvider } from '@/components/core/tab';
import { CalendarClock } from 'lucide-react';



function Tab() {
    
  return (
    <div className='bg-[#1f2937]/20 backdrop-blur-sm rounded-md p-4  relative'>
      <TabsProvider defaultValue={'design'}>
        <div className='flex justify-center mt-2'>
          <div className='flex items-center w-fit bg-[#1f2937] p-1 text-[#d1d5d8] rounded-md'>
            <TabsBtn value='design'>
              <span className='relative z-[2] uppercase text-sm md:text-md'>All event</span>
            </TabsBtn>
            <TabsBtn value='collaborate'>
              <span className='relative z-[2] uppercase text-sm md:text-md'>Upcoming</span>
            </TabsBtn>
            <TabsBtn value='share'>
              <span className='relative z-[2] uppercase text-sm md:text-md'>Past event</span>
            </TabsBtn>
          </div>
        </div>

        <TabsContent value='design'>
          <div className='w-full'>
            <div className='relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] mx-auto mt-10 mb-4'>
            <Image src={'/calendar.png'} fill={true} alt='Calendar'/>
            </div>
            <div className='text-center'>
                <h2 className='font-bold'>No Event</h2>
                <p className='font-light text-sm'>You have no upcoming events. <br /> Why not host one?</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='collaborate'>
          <div className='w-full mt-5'>
            <div className='p-4 rounded-md ring-1 ring-slate-600 mb-4 bg-[#111827] space-y-3'>
                <h2 className='font-bold text-lg'>Decentralized Tech Meetup 2024</h2>
                <h3 className='font-light  gap-x-2 text-slate-300 inline-flex'>Status: <span className='text-white font-medium inline-flex gap-x-2 items-center'><div className='w-2 h-2 rounded-full bg-blue-700'></div> upcomming</span></h3>
                <div className='flex items-center text-xs gap-x-2 text-slate-300'>
                <CalendarClock width={16}/>
                <span>March 10, 2024 | 3:00PM</span>
                </div>
                <hr className='border border-solid' />
                <div className='flex items-center justify-between'>
                <div className='inline-flex items-center'>
                <h2 className='font-bold text-xl sm:text-2xl lg:text-4xl'>$50</h2>
                    <span className='text-sm ms-2 text-gray-400'> Ticket Price</span>
                </div>
                <Link href={'#'} className='px-5 py-3 rounded-md text-white bg-blue-700 text-sm hover:bg-blue-800'>View Details</Link>
            </div>
            </div>
            <div className='p-4 rounded-md ring-1 ring-slate-600 mb-4 bg-[#111827] space-y-3'>
                <h2 className='font-bold text-lg'>Event title</h2>
                <h3 className='font-light  gap-x-2 text-slate-300 inline-flex'>Status: <span className='text-white font-medium inline-flex gap-x-2 items-center'><div className='w-2 h-2 rounded-full bg-blue-700'></div> upcomming</span></h3>
                <div className='flex items-center text-xs gap-x-2 text-slate-300'>
                <CalendarClock width={16}/>
                <span>March 10, 2024 | 3:00PM</span>
                </div>
                <hr className='border border-solid' />
                <div className='flex items-center justify-between'>
                <div className='inline-flex items-center'>
                <h2 className='font-bold text-xl sm:text-2xl lg:text-4xl'>$50</h2>
                    <span className='text-sm ms-2 text-gray-400'> Ticket Price</span>
                </div>
                <Link href={'#'} className='px-5 py-3 rounded-md text-white bg-blue-700 text-sm hover:bg-blue-800'>View Details</Link>
            </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='share'>
          <div className='w-full'>
            <Image
              src={
                'https://images.unsplash.com/photo-1665470909901-162912ec16f7?q=80&w=1000&auto=format&fit=crop'
              }
              width={1000}
              height={1000}
              alt='preview_img'
              className='w-[850px] object-cover h-full mx-auto rounded-md'
            />
          </div>
        </TabsContent>
      </TabsProvider>
       
    </div>
  );
}

export default Tab;