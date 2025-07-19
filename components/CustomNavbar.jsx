'use client'

import { Navbar } from 'nextra-theme-docs'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import NsToggle from './datePicker-header'

const CustomNavbar = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="navbar-wrapper">
    <Navbar 
      logo={<Image src="/prologue.png" height={31} width={150} alt="The Prologue from Ochrid" />}
      logoLink="/prologue"
      projectLink="https://sebastianpress.org/"
      projectIcon={
        <Image 
          src="/sp-logo.png" 
          height={40} 
          width={40} 
          alt="Sebastian Press" 
          style={{ borderRadius: '50%' }}
        />
      }
    >
      <NsToggle />
    </Navbar>
    </div>
  )
}

export default CustomNavbar 