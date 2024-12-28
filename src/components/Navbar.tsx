import React from 'react'
import WalletConnection from './WalletConnection'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-4 px-5 bg-transparent fixed top-0 inset-x-0 backdrop-blur-md z-40'>
        <Link href={'/'} 
        className='flex items-center space-x-2 text-blue-700'>
        <Calendar/> <span>Eventura</span>
        </Link>
        <WalletConnection/>
    </div>
  )
}

export default Navbar