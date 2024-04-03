import { ImageResponse } from '@vercel/og';
import type { VercelRequest } from '@vercel/node';
import { url } from 'inspector';
 
export const config = {
  runtime: 'edge',
};
 
export default function handler(request: VercelRequest) {
  try {
    const { searchParams } = new URL(request.url);
 
    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Prologue';

    const hasDescription = searchParams.has('description');
    const description = hasDescription
    ? searchParams.get('description')?.slice(0, 100)
    : 'Lives of Saints, Hymns, Reflections and Homilies for Every Day of the Year';
 
    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: 'crimson',
            backgroundSize: '1280px 628px',
            backgroundImage: 'url("/twitter-card.png")',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontStyle: 'normal',
              letterSpacing: '-0.025em',
              color: 'white',
              marginTop: 30,
              padding: '0 120px',
              lineHeight: 1.4,
              whiteSpace: 'pre-wrap',
            }}
          >
            {title}
            <br />
            {description}
          </div>
        </div>
      ),
      {
        width: 1280,
        height: 628,
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}