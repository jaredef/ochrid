'use client'

import React, { useState, useEffect } from 'react'
import { format, subDays } from 'date-fns'
import { compileMdx } from 'nextra/compile'
import { MDXRemote } from 'nextra/mdx-remote'
import { useMDXComponents as getMDXComponents } from '../mdx-components'

const DynamicMDXContent = ({ onRouteChange = null }) => {
  const [compiledMdx, setCompiledMdx] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isNSActive, setIsNSActive] = useState(false)

  console.log('DynamicMDXContent component rendered')

  // Get MDX components
  const mdxComponents = getMDXComponents()

  useEffect(() => {
    // Load the calendar preference from localStorage
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('newCalendar')
      setIsNSActive(storedValue === 'true')
    }
  }, [])

  useEffect(() => {
    const fetchMDXContent = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Calculate the target date based on toggle state
        const targetDate = isNSActive ? new Date() : subDays(new Date(), 13)
        
        // Format the date to match your file structure
        const formattedDate = format(targetDate, 'MMMM/do').toLowerCase()
        const [month, day] = formattedDate.split('/')
        
        // Create the route string that matches the audio file routes
        const routeString = `/${month}/${day}`
        
        console.log('Fetching MDX for:', { targetDate, formattedDate, month, day, routeString, isNSActive })
        
        // Notify parent component of the route change
        if (onRouteChange) {
          onRouteChange(routeString)
        }
        
        // Fetch the raw MDX content from the API route
        const apiUrl = `/api/mdx?month=${encodeURIComponent(month)}&day=${encodeURIComponent(day)}`
        const response = await fetch(apiUrl)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null)
          throw new Error(errorData?.error || `Failed to fetch MDX: ${response.status} ${response.statusText}`)
        }
        
        const mdxSource = await response.text()
        
        // Compile the MDX using Nextra's compileMdx
        const compiled = await compileMdx(mdxSource, {
          // You can pass additional options here if needed
          development: process.env.NODE_ENV === 'development'
        })
        
        console.log('Compiled MDX result:', compiled)
        
        setCompiledMdx(compiled)
      } catch (err) {
        console.error('Error fetching MDX content:', err)
        setError(`Failed to load content for ${month}/${day}: ${err.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMDXContent()
  }, [isNSActive, onRouteChange])

  // Listen for localStorage changes (when toggle is clicked)
  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem('newCalendar')
        // Defer state update to avoid updating during render cycle
        setTimeout(() => {
          setIsNSActive(storedValue === 'true')
        }, 0)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events when the toggle is clicked on the same page
    const handleToggleChange = () => {
      if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem('newCalendar')
        // Defer state update to avoid updating during render cycle
        setTimeout(() => {
          setIsNSActive(storedValue === 'true')
        }, 0)
      }
    }

    window.addEventListener('calendarToggleChange', handleToggleChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('calendarToggleChange', handleToggleChange)
    }
  }, [])

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Turning to today's entry...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!compiledMdx) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>No content available for this date.</p>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <MDXRemote 
        compiledSource={compiledMdx}
        components={mdxComponents}
      />
    </div>
  )
}

export default DynamicMDXContent 