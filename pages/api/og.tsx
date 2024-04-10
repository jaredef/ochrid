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
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 150)
      : 'Prologue — The Orthodox Christian Devotional';
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom, crimson, #7c0000)',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'left',
            alignItems: 'left',
            justifyContent: 'left',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
            <div
              style={{
                color: 'white',
                height: '100%',
                width: '100%',
                fontSize: 60,
                fontFamily: 'Merriweather-BoldItalic',
                paddingTop: '100px',
                paddingLeft: '50px',
                paddingRight: '50px',
              }}
            >
            {title}
          </div>
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