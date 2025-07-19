'use client'

import React, { useState, useEffect } from 'react'
import { format, subDays } from 'date-fns'
import { importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../mdx-components'

const DynamicMDXContent = ({ onRouteChange = null }) => {
  const [mdxContent, setMdxContent] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isNSActive, setIsNSActive] = useState(false)

  console.log('DynamicMDXContent component rendered')

  // Get MDX components
  const { wrapper: Wrapper, ...components } = getMDXComponents()

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
        
        // Create the MDX path - this should match your content directory structure
        const mdxPath = [month, day]
        
        // Create the route string that matches the audio file routes
        const routeString = `/${month}/${day}`
        
        console.log('Fetching MDX for:', { targetDate, formattedDate, mdxPath, routeString, isNSActive })
        
        // Notify parent component of the route change
        if (onRouteChange) {
          onRouteChange(routeString)
        }
        
        // Import the page using Nextra's importPage function
        const result = await importPage(mdxPath)
        
        console.log('ImportPage result:', result)
        
        if (result) {
          setMdxContent(result)
        } else {
          setError(`Content not found for ${month}/${day}`)
        }
      } catch (err) {
        console.error('Error fetching MDX content:', err)
        setError(`Failed to load content: ${err.message}`)
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
        setIsNSActive(storedValue === 'true')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events when the toggle is clicked on the same page
    const handleToggleChange = () => {
      if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem('newCalendar')
        setIsNSActive(storedValue === 'true')
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
        <p>Loading today's content...</p>
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

  if (!mdxContent) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>No content available for this date.</p>
      </div>
    )
  }

  const { default: MDXContent, toc, metadata } = mdxContent

  return (
    <div style={{ marginTop: '2rem' }}>
      {Wrapper ? (
        <Wrapper toc={toc} metadata={metadata}>
          <MDXContent />
        </Wrapper>
      ) : (
        <MDXContent />
      )}
    </div>
  )
}

export default DynamicMDXContent 