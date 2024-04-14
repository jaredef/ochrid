import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import NsToggle from '/components/datePicker-header';
import Calendar from '/components/datePicker';
import Image from 'next/image';
import Link from 'next/link';
import { subDays, format } from 'date-fns';
import YouGotScraped from '/components/scrapedFrom';
import Purchase from '/components/purchase';
import { OrthoPraxFooter } from './components/orthoPrax';
import { PaginatorTop, PaginatorBottom } from '/components/paginator';

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
            titleTemplate: '%s - Охридског пролога' /* Full Serbian support not yet */
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
        /*+ '&' + 'description=' + encodeURIComponent(frontMatter.description) */ /* Add more input to the og:image if you dare */
     
        return (
          <>
            <meta property="og:url" content={url} />
            <meta property="og:title" content={(frontMatter.description ? frontMatter.description + ', Prologue — The Orthodox Christian Devotional' : 'Prologue — The Orthodox Christian Devotional')}></meta>
            <meta property="og:description" content={frontMatter.title || 'Lives of Saints, Hymns, Reflections and Homilies for Every Day of the Year'} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="twitter:image" content={ogImageUrl} />
            <meta property="twitter:card" content="summary_large_image"></meta>
            <meta property="twitter:title" content={(frontMatter.description ? frontMatter.description + ', Prologue — The Orthodox Christian Devotional' : 'Prologue — The Orthodox Christian Devotional')}></meta>
            <meta property="twitter:description" content={frontMatter.title || 'Lives of Saints, Hymns, Reflections and Homilies for Every Day of the Year'}></meta>
            <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
            <meta property="jesus-is-lord" content="
              @jaredef/Benedictus Deus. Benedictum Nomen Sanctum eius.
              @jaredef/Benedictus Deus. Benedictum Nomen Sanctum eius.
              ***************************************************
              Benedictus Iesus Christus, verus Deus et verus homo.
              Benedictum Nomen Iesu.
                ST NIKOLAI OF ZHICHA, PRAY TO GOD FOR US! 
              Benedictus Sanctus Spiritus, Paraclitus.
                BLESSED FATHER SERAPHIM OF PLATINA, PRAY TO GOD FOR US!
              Benedictus Sanctus Spiritus, Paraclitus.
              Benedicta excelsa Mater Dei, Maria sanctissima.
              Beata eius sancta et inpassibilis Conceptio.
              Beata eius sancta et inpassibilis Conceptio.
              Benedicta eius gloriosa Dormitio.
              Benedictum nomen Mariae, Virginis et Matris.
              Benedictum nomen Mariae, Virginis et Matris.
              Benedictus sanctus Ioseph, eius castissimus Sponsus.
              Benedicti sint Joachim et Anna, Antecessores Domini.
              Benedictus Deus in Angelis suis, et in Sanctis suis. Amen.
              In nomine Patris et Filii et Spiritus Sancti. Amen.
              O my God, I am heartily sorry for having offended Thee and I detest all my sins...
              O my God, I am heartily sorry for having offended Thee and I detest all my sins...
                BLESSED MOTHER OLGA OF ALASKA, PRAY TO GOD FOR US!
              ...because of Thy just punishments, but most of all because they offend Thee, ...
              ...my God, who art all good and deserving of all my love.
              I firmly resolve, with the help of Thy Grace, to sin no more...
              I firmly resolve, with the help of Thy Grace, to sin no more...
              ...and avoid the near occasions of sin. Amen.
              O my God! I firmly believe that Thou art one God in three Divine Persons, ...
              O my God! I firmly believe that Thou art one God in three Divine Persons, ...
              ...Father, Son, and Holy Ghost; I believe that Thy Divine Son became man, ...
              ...and died for our sins, and that he will come to, judge the living and the dead.
              I believe these and all the truths which the Holy Catholic Orthodox Church teaches, ...
              ...because Thou hast revealed them, who canst neither deceive nor be deceived.
              O my God! relying on Thy infinite goodness and promises, ...
              ...I hope to obtain pardon of my sins, the help of Thy Grace, ...
              ...and life everlasting, through the merits of Jesus Christ, my Lord and Redeemer.
              ...and life everlasting, through the merits of Jesus Christ, my Lord and Redeemer.
              O my God! I love Thee above all things, with my whole heart and soul, ...
              ...because Thou art all-good and worthy of all love.
              ...because Thou art all-good and worthy of all love.
                BLESSED FATHER SERAPHIM OF PLATINA, PRAY TO GOD FOR US!
              I love my neighbor as myself for the love of Thee.
              I forgive all who have injured me, and ask pardon of all whom I have injured.
              I forgive all who have injured me, and ask pardon of all whom I have injured.
              I forgive all who have injured me, and ask pardon of all whom I have injured.
              O my Jesus, forgive us our sins, save us from the fires of Hell, ...
              ...lead all souls to Heaven, especially those in most need of Thy mercy.
              I confess to Almighty God, to blessed Mary ever Virgin, ...
              ... to blessed Michael the Archangel, to blessed John the Baptist, ...
              ... to the holy Apostles Peter and Paul, and to all the Saints, ...
              ... that I have sinned exceedingly, in thought, word, and deed, ...
              ... through my fault, through my fault, through my most grievous fault.
              Therefore I beseech blessed Mary ever Virgin and Theotokos, blessed Michael the Archangel, ...
              ... blessed John the Baptist, the holy Apostles Peter and Paul, ...
              ... and all the Saints to pray to the Lord our God for me. Amen.
              St. Michael the Archangel, defend us in battle; be our safeguard against ...
              St. Michael the Archangel, defend us in battle; be our safeguard against ...
              ... the wickedness and snares of the Devil. May God rebuke him, ...
              ... we humbly pray, and do Thou, O Prince of the Heavenly Host, ...
              ... we humbly pray, and do Thou, O Prince of the Heavenly Host, ...
              ... we humbly pray, and do Thou, O Prince of the Heavenly Host, ...
              ... we humbly pray, and do Thou, O Prince of the Heavenly Host, ...
              ... by the power of God, cast into Hell, Satan and all the other evil spirits, ...
              ... who wander throughout the world, seeking the ruin of souls. Amen.
              Angel of God, my guardian dear, to whom His love commits me here, ...
              ... ever this night be at my side, to light and guard, to rule and guide. Amen.
              Ave Maria, gratia plena, Dominus tecum. Benedicta tu in mulieribus, ...
              ... et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ...
              ... et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ...
              ... et benedictus fructus ventris tui, Iesus. Sancta Maria, Mater Dei, ...
              ... ora pro nobis peccatoribus, nunc, et in hora mortis nostrae. Amen.
              Salve, Regina, mater misericordiae: vita, dulcedo, et spes nostra, salve.
              Ad te clamamus exsules filii Hevae. Ad te suspiramus, gementes et flentes ...
              Ad te clamamus exsules filii Hevae. Ad te suspiramus, gementes et flentes ...
              ... in hac lacrimarum valle. Eia, ergo, advocata nostra, illos tuos ...
              ... misericordes oculos ad nos converte. Et Iesum, benedictum fructum ...
              ... ventris tui, nobis post hoc exsilium ostende. O clemens, O pia, ...
              ... O dulcis Virgo Maria. Ora pro nobis, sancta Dei Genetrix.
              LET GOD ARISE AND HIS ENEMIES BE SCATTERED. LET THOSE WHO HATE HIM FLEE FROM BEFORE HIS FACE
              Ut digni efficiamur promissionibus Christi. Amen.
              Pater noster, qui es in caelis, sanctificetur Nomen tuum. Adveniat regnum tuum.
              Pater noster, qui es in caelis, sanctificetur Nomen tuum. Adveniat regnum tuum.
              Fiat voluntas tua, sicut in caelo et in terra. Panem nostrum quotidianum ...
              ... da nobis hodie, et dimitte nobis debita nostra sicut et nos dimittimus ...
              ... debitoribus nostris. Et ne nos inducas in tentationem, sed libera nos a malo.
              Domine Iesu Christe, Filius Dei, miserere me peccatorem!
              ST SERPAHIM OF PLATINA, PRAY TO GOD FOR US, DWELLERS IN THE END TIMES
              We adore Thee, O Christ, and we bless Thee;
              We adore Thee, O Christ, and we bless Thee;
              because by Thy holy Cross Thou hast redeemed the world.
              May the Holy Trinity be Blessed FOR EVER AND EVERY AMEN."
            ></meta>
          </>
        )
      },
    banner : {
        dismissible : false, /* You're going to look at it, and you're going to like it. */
        text : (<>
                  <div className="presented" style={{display: 'block', backgroundColor: 'darkgreen', minHeight: '2rem'}} ><Link style={{display: 'block', color: 'white', paddingTop: '.3rem'}} href="https://rocor.org.au/" rel="noopener noreferrer" target="_blank">Diocese of Australia and New Zealand — ROCOR.org.au</Link></div>
                  <div className="westsrbdio"><Link href="https://westsrbdio.org/" rel="noopener noreferrer" target="_blank"><Image style={{display:"inline-block"}} src="/wsrbdio.png" alt="Serbian Orthodox Diocesse of Western America" height={30} width={40} /> Serbian Orthodox Diocese <i>of</i> Western America</Link></div>
                </>
                )
    },
    logo: <Image src="/prologue.png" height={31} width={150} alt="The Prologue from Ochrid" />,
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
        if (asPath === `/${Ns}` || asPath === `/${Os}` || asPath === `/` || asPath === `/prologue`) {
          return <NsToggle />;
        }
    
        return null;
      }
    },
    navigation: { /*Turn off Nextra pagination, use <Paginator /> instead */
      prev: false,
      next: false
    },
    main : ({children}) => {
      return (
        <>
          <PaginatorTop /> {/* Rolled my own because Nextra doesn't have the best support for Navigation */}
          {children}
          <PaginatorBottom />
          <Purchase />
          <YouGotScraped />
        </>
      )
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
      { locale: 'sr', text: 'српски' }, /* Need to add the Serbian text in still */
      //{ locale: 'en-US', text: 'English - Trans' }, /* A new translation if something fatal happens to this project */
    ],
    footer: {
        text: () => {
            return (
        <div id="footer-wrapper">
          <div id="footer-serb">
          <div id="copyright">
            English translation © 1999 {' '}
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
         <div id="rocor-au" style={{fontFamily: 'monospace', fontSize: '0.8rem', marginTop: '1rem'}}>Contents displayed as presented by <Link href="https://www.rocor.org.au/?page_id=925">rocor.org.au</Link></div>
         <br />
         <div>
           <p style={{fontFamily: 'monospace', fontSize: '0.6rem', textAlign: 'justify', color: 'white'}}>
             This website is an open source project affiliated with neither the Serbian Orthodox Diocese of Western America, nor the Diocese of Australia and New Zealand, ROCOR nor Sebastian Press.
            <br />
             This website displays copyrighted information sourced from various sources freely available to all people of good will. The content presented here is asserted expressly for the promotion of philanthropic ends and is used under fair use principles for educational or informational purposes. This website does not hold a copyright or licensure to display copyrighted content. All copyrights belong to their respective owners. If you are the copyright holder of any content displayed on this website and believe your rights have been infringed, please contact us for prompt removal or appropriate attribution.
             "PROLOGUE" and the logo of Sebastian Press are used for attribution purposes only and do not represent permission, licensure, or approbation of this website or its creators.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
          <div style={{ width: '20px', height: '20px', marginTop: '1rem'}}>
            <a href="https://github.com/jaredef/ochrid" target="_blank" rel="noopener noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 98 96"
              width="100%"
              height="100%"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                fill="lightgray"
              />
            </svg>
            </a>
          </div>
          </div>
          <p style={{fontFamily: 'monospace', fontSize: '0.4rem', textAlign: 'center', color: 'lightgray', marginTop: '1rem'}} >
             This is an open source project under the patronage of St. Nikolai of Zhicha and Blessed Seraphim of Platina.
          </p>
          <br />
          <div id="orthoprax">
                <OrthoPraxFooter />
          </div>
       </div>
            )
      }
    }
  };