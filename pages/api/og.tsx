import { ImageResponse } from '@vercel/og';
import type { VercelRequest } from '@vercel/node';
 
export const config = {
  runtime: 'edge',
};
 
export default async function handler(request: VercelRequest) {
  const fontData = await fetch(
    new URL('../../assets/Merriweather-BoldItalic.ttf', import.meta.url),

  ).then((res) => res.arrayBuffer());
  try {
    const { searchParams } = new URL(request.url);
 
    // ?title=<title>
    const hasTitle = searchParams.has('title');
    let title = hasTitle
      ? searchParams.get('title')?.slice(0, 150)
      : 'Prologue — The Orthodox Christian Devotional';
    
    // Check if the sliced string's length is 150 characters
    if (title && title.length === 150) {
      // If yes, append '...' to the string
      title += '...';
    }    
 
    return new ImageResponse(
      (
          <div
            style={{
              backgroundColor: '#a20020',
              color: 'white',
              height: '100%',
              width: '100%',
              fontSize: 70,
              lineHeight: 1.4,
              fontFamily: 'Merriweather-BoldItalic',
              padding: '20px 40px 0 70px',
            }}
          >
            {title}
          </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Merriweather-BoldItalic',
            data: fontData,
            style: 'normal',
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}