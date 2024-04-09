import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import NsToggle from '/components/datePicker-header';
import Calendar from '/components/datePicker';
import Image from 'next/image';
import Link from 'next/link';
import { subDays, format } from 'date-fns';


export default {
  useNextSeoProps() {
    const { asPath, locale } = useRouter();
    if (asPath === '/prologue') {
        return {
            titleTemplate: '%s'
        };
    }
    if ( locale === 'sr') {
        return {
            titleTemplate: '%s - Охридског пролога'
        };
    }
    if ( locale === 'en') {
      return {
        titleTemplate: '%s - Prologue'
      }
    }
    return {
        titleTemplate: '%s – Prologue'
    };
  },
  head: () => {
        const { asPath, defaultLocale, locale } = useRouter()
        const { frontMatter } = useConfig()
        const url =
          'https://ochrid.org' +
          (defaultLocale === locale ? asPath : `/${locale}${asPath}`)
          
        const ogImageUrl = 'https://ochrid.vercel.app/api/og?'
        + 'title=' + encodeURIComponent(frontMatter.title)
        + '&' + 'description=' + encodeURIComponent(frontMatter.description)
     
        return (
          <>
            <meta property="og:url" content={url} />
            <meta property="og:title" content={frontMatter.title || 'Prologue — The Orthodox Christian Devotional'} />
            <meta
              property="og:description"
              content={frontMatter.description || 'Lives of Saints, Hymns, Reflections and Homilies for Every Day of the Year'}
            />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="twitter:image" content={ogImageUrl} />
            <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
          </>
        )
      },
    banner : {
        dismissible : false,
        text : (<>
                  <div className="presented" style={{display: 'block', backgroundColor: 'darkgreen', minHeight: '2rem'}} ><Link style={{display: 'block', color: 'white', paddingTop: '.3rem'}} href="https://rocor.org.au/" rel="noopener noreferrer" target="_blank">Diocese of Australia and New Zealand — ROCOR.org.au</Link></div>
                  <div className="westsrbdio"><Link href="https://westsrbdio.org/" rel="noopener noreferrer" target="_blank"><Image style={{display:"inline-block"}} src="/wsrbdio.png" alt="Serbian Orthodox Diocesse of Western America" height={30} width={40} /> Serbian Orthodox Diocese <i>of</i> Western America</Link></div>
                </>
                )
    },
    logo: /*<Link href="/prologue">*/<Image src="/prologue.png" height={31} width={150} alt="The Prologue from Ochrid" />/*</Link>*/,
    search : {
        placeholder: "Search the Prologue"
    },
    navbar: {
      extraContent: () => {
        const { asPath } = useRouter();
        if (!asPath) return null; // Return early if asPath is undefined (e.g., during server-side rendering)
    
        // Calculate today's date and the date 13 days ago
        const today = new Date();
        const thirteenDaysAgo = subDays(today, 13);
    
        // Format the dates using date-fns
        const Ns = format(today, 'MMMM/do').toLowerCase();
        const Os = format(thirteenDaysAgo, 'MMMM/do').toLowerCase();
    
        // Check if the current URL matches either today's date or 13 days ago
        if (asPath === `/${Ns}` || asPath === `/${Os}`) {
          return <NsToggle />;
        }
    
        return null;
      }
    },  
    toc : {
        title : null,
        extraContent: () => {return <Calendar />}
    },
    primaryHue: 360,
    primarySaturation: 100,
    project : {
        link : 'https://sebastianpress.org/',
        icon : (<Image src="/sp-logo.png" height={60} width={60} alt="Sebastian Press" />)
    },
    editLink: {
        component: null
    },
    feedback : {
        content: null
    },
    sidebar: {
        autoCollapse: true,
        defaultMenuCollapseLevel : 1
    },
    gitTimestamp: null,
    i18n: [
      { locale: 'en', text: 'English' },
      { locale: 'sr', text: 'српски' },
      /*{ locale: 'en-US', text: 'English - Trans' },*/
    ],
    footer: {
        text: () => {
            return (
        <div id="footer-wrapper">
          <div id="footer-serb">
          <div id="copyright">
            English trans. © 1999 {' '}
            <a href="https://westsrbdio.org/" target="_blank">
            Serbian Orthodox Diocese of Western America
            </a>
          </div>
           <div id='footer-links'>
            <div id='footer-facebook'><a href="https://www.facebook.com/americanwesterndiocese" rel="noopener" target="_blank"><img src="/social-fb-m.svg" /></a></div>
            <div id='footer-youtube'><a href="https://www.youtube.com/channel/UC3LM5WgukjEctfRE4GsVnjA" rel="noopener" target="_blank"><img src="/social-youtube-m.svg" /></a></div>
            <div id='footer-linkedin'><a href="https://www.linkedin.com/in/westernamericandiocese/" rel="noopener" target="_blank"><img src="/social-linkedin-m.svg" /></a></div>
            <div id='footer-insta'><a href="https://www.instagram.com/westsrbdio/" rel="noopener" target="_blank"><img src="/social-insta-m.svg" /></a></div>
           </div>
         </div>
         <div id="rocor-au">Contents displayed as presented by <Link href="https://www.rocor.org.au/?page_id=925">rocor.org.au</Link></div>
       </div>
            )
      }
    }
  };