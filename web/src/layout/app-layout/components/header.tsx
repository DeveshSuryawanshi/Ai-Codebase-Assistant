'use client';

import React from 'react'
import dynamic from 'next/dynamic';
const ThemeSwitch = dynamic(() => import("./theme-switch"),{ ssr: false });
import Link from 'next/link'

function Header() {
  return (
    <header className='flex justify-between items-center my-8 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-40'>
      <div>
        <Link href='/'>
          <h1 className='text-3xl font-bold'>Repozy</h1>
        </Link>
      </div>
      <div>
        <ThemeSwitch />
      </div>
    </header>
  )
}

export default Header