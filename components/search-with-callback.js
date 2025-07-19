'use client'
 
import { Search } from 'nextra/components'
 
export function SearchWithCallback() {
  return (
    <Search
      onSearch={query => {
        console.log('Search query:', query)
      }}
      placeholder="Search the Prologue..."
    />
  )
}