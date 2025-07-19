'use client'

import { Navbar } from 'nextra-theme-docs'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { subDays, format } from 'date-fns'
import NsToggle from './datePicker-header'

const CustomNavbar = () => {
  const router = useRouter()
  const pathname = usePathname()

  // Calculate today's date and the date 13 days ago
  const today = new Date()
  const thirteenDaysAgo = subDays(today, 13)

  // Format the dates using date-fns
  const Ns = format(today, 'MMMM/do').toLowerCase()
  const Os = format(thirteenDaysAgo, 'MMMM/do').toLowerCase()

  // Check if the current URL matches either today's date or 13 days ago
  const shouldShowNsToggle = pathname === `/${Ns}` || pathname === `/${Os}` || pathname === `/` || pathname === `/index` || pathname === `/prologue/`

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
      {shouldShowNsToggle && <NsToggle />}
    </Navbar>
    </div>
  )
}

export default CustomNavbar 