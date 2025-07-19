import { Layout } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import Link from 'next/link'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../../public/globals.css'
import Image from 'next/image'
import { SearchWithCallback } from '../../components/search-with-callback'
import localFont from 'next/font/local'
import CustomNavbar from '../../components/CustomNavbar'
import { CustomFooter } from '../../components/footer'
import Purchase from '../../components/purchase'
import Calendar from '../../components/datePicker'

const merriweatherBoldItalic = localFont({
  src: '../../assets/Merriweather-BoldItalic.ttf',
  variable: '--font-merriweather-bold-italic',
  display: 'swap',
})

const ptSerifCaptionRegular = localFont({
  src: '../../assets/PTSerifCaption-Regular.ttf',
  variable: '--font-pt-serif-caption-regular',
  display: 'swap',
})

// Static metadata for fallback (when no page-specific metadata is available)
const StaticMetadataHead = () => {
  return (
    <>
      {/* Basic meta tags */}
      <title>Prologue — The Orthodox Christian Devotional</title>
      <meta name="description" content="Lives of Saints, Hymns, Reflections and Homilies for Every Day of the Year" />
      
      {/* OpenGraph meta tags */}
      <meta property="og:title" content="Prologue — The Orthodox Christian Devotional" />
      <meta property="og:description" content="Lives of Saints, Hymns, Reflections and Homilies for Every Day of the Year" />
      <meta property="og:url" content="https://ochrid.org" />
      <meta property="og:site_name" content="Prologue" />
      <meta property="og:image" content="https://ochrid.vercel.app/api/og?title=Prologue" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Prologue — The Orthodox Christian Devotional" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      
      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Prologue — The Orthodox Christian Devotional" />
      <meta name="twitter:description" content="Lives of Saints, Hymns, Reflections and Homilies for Every Day of the Year" />
      <meta name="twitter:image" content="https://ochrid.vercel.app/api/og?title=Prologue" />
      
      {/* Icons */}
      <link rel="icon" type="image/x-icon" href="https://ochrid.org/favicon.ico" />
      <link rel="apple-touch-icon" href="https://ochrid.org/prologue.png" />
      
      {/* PWA and mobile support */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#9d0000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Prologue" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="apple-itunes-app" content="app-argument=audio-playback" />
      <meta name="msapplication-TileColor" content="#9d0000" />
      <meta name="msapplication-TileImage" content="/prologue.png" />
      
      {/* Custom meta tag */}
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
        May the Holy Trinity be Blessed FOR EVER AND EVER AMEN.
      " />
    </>
  )
}
 
const banner = <Banner storageKey="banner-ochrid" dismissible={false}>
  <>
    <div className="westsrbdio"><Link href="https://westsrbdio.org/" rel="noopener noreferrer" target="_blank"><Image style={{display:"inline-block"}} src="/wsrbdio.png" alt="Serbian Orthodox Diocesse of Western America" height={30} width={40} /> Serbian Orthodox Diocese <i>of</i> Western America</Link></div>
  </>
</Banner>

const footer = <CustomFooter key="custom-footer" />
 
export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
      className={`${merriweatherBoldItalic.variable} ${ptSerifCaptionRegular.variable}`}
    >
      <Head>
        <StaticMetadataHead />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={<CustomNavbar key="custom-navbar" />}
          pageMap={await getPageMap()}
          search={<SearchWithCallback />}
          toc={{
            title: null,
            extraContent: <Calendar key="toc-calendar" />
          }}
          feedback={{content: null}}
          editLink={null}
          themeSwitch={{
            dark: 'Vespers',
            light: 'Matins',
            system: 'Current Hour'
          }}
          // ... Your additional layout options
        >
          {children}
        </Layout>
        <Purchase key="purchase" />
        <CustomFooter key="footer" />
      </body>
    </html>
  )
}