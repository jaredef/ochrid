import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { PT_Serif, Merriweather } from 'next/font/google';
import './global.css';

// If loading a variable font, you don't need to specify the font weight
const merriweather = Merriweather({
  weight: '700',
  subsets: ['latin'],
  style: ['italic','normal'],
  variable: '--font-merriweather',
  display: 'swap',
});

const ptSerif = PT_Serif({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
  variable: '--font-ptSerif',
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppProps) {
  // Conditionally import BrowserRouter only in the browser
  const Router = typeof window !== 'undefined' ? require('react-router-dom').BrowserRouter : null;

  return (
    <>
      {Router && (
        <Router>
          <div className={`${merriweather.variable} ${ptSerif.variable}`}>
            <Component {...pageProps} />
          </div>
        </Router>
      )}
      {!Router && <Component {...pageProps} />} {/* Render Component directly if not in the browser */}
      <Analytics />
    </>
  );
}

export default MyApp;
