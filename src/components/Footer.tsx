"use client";

import React from 'react';
import Link from 'next/link';
import { FiHome, FiCalendar, FiUser } from "react-icons/fi";
import { usePathname } from 'next/navigation';

interface LinkProps {
    id: number;
    name: string;
    url: string;
    icon: React.ReactNode;
}

const links: LinkProps[] = [
    {
        id: 1,
        name: "Home",
        url: "/",
        icon: <FiHome />
    },
    {
        id: 2,
        name: "Event",
        url: "/event",
        icon: <FiCalendar />
    },
    {
        id: 3,
        name: "Profile",
        url: "/profile",
        icon: <FiUser />
    },
]

export default function Footer() {
    const pathname = usePathname()

    const isActive = (url: string) => {
        if (url === '/') {
            return pathname === url;
        }
        return pathname.startsWith(url);
    }

    return (
        <div className='w-fit fixed bottom-5 inset-x-0 gap-3 mx-auto rounded-full p-2 bg-[#1f2937]/60 backdrop-blur flex mt-10'>
            {links.map(link => (
                <Link 
                    key={link.id} 
                    href={link.url}
                    className={`py-3 px-5 text-white rounded-full flex items-center gap-2 transition-colors ${isActive(link.url) ? "bg-[#1e40af]" : "hover:bg-gray-700"}`}
                >
                    {link.icon}
                    {link.name}
                </Link>
            ))}
        </div>
    )
}

