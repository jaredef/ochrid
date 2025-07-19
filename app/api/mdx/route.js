import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const month = searchParams.get('month')
    const day = searchParams.get('day')

    if (!month || !day) {
      return NextResponse.json(
        { error: 'Month and day parameters are required' },
        { status: 400 }
      )
    }

    // Construct the file path
    const filePath = join(process.cwd(), 'content', month, `${day}.mdx`)
    
    try {
      // Read the MDX file
      let mdxContent = await readFile(filePath, 'utf-8')
      
      // Remove import statements since components are provided via MDXRemote
      mdxContent = mdxContent.replace(/^import\s+.*$/gm, '')
      
      // Clean up any empty lines left by removed imports
      mdxContent = mdxContent.replace(/^\s*\n/gm, '')
      
      return new Response(mdxContent, {
        headers: {
          'Content-Type': 'text/plain',
        },
      })
    } catch (fileError) {
      return NextResponse.json(
        { error: `MDX file not found: ${month}/${day}.mdx` },
        { status: 404 }
      )
    }
  } catch (error) {
    console.error('Error in MDX API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 