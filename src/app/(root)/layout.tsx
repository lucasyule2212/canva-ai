import MobileNav from '@/components/shared/sidebar/mobile-nav'
import Sidebar from '@/components/shared/sidebar/sidebar'
import { Toaster } from '@/components/ui/toaster'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='root'>
      <Sidebar/>
      <MobileNav/>
      <div className='root-container'>
        <div className='wrapper'>
        {children}
        </div>
      </div>
      <Toaster/>
    </main>
  )
}

export default RootLayout