import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../mdx-components'
import ProloguePlayer from '../../components/ProloguePlayer'
 
export const generateStaticParams = generateStaticParamsFor('mdxPath')
 
export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath)
  
  // Get the current path for the URL
  const path = params.mdxPath ? params.mdxPath.join('/') : ''
  const url = `https://ochrid.org/${path}`
  
  // Create dynamic OG image URL based on page title
  const ogImageUrl = `https://ochrid.vercel.app/api/og?title=${encodeURIComponent(metadata.title || 'Prologue')}`
  
  // Determine the title and description based on page metadata
  const title = metadata.title || 'Prologue — The Orthodox Christian Devotional'
  const description = metadata.description || 'Lives of Saints, Hymns, Reflections and Homilies for Every Day of the Year'
  
  // Create the full title for pages with descriptions
  const fullTitle = metadata.description 
    ? `${metadata.description}, Prologue — The Orthodox Christian Devotional`
    : 'Prologue — The Orthodox Christian Devotional'
  
  return {
    title: fullTitle,
    description: title,
    openGraph: {
      title: fullTitle,
      description: title,
      url: url,
      siteName: 'Prologue',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: title,
      images: [ogImageUrl],
    },
    icons: {
      icon: 'https://ochrid.org/favicon.ico',
      apple: 'https://ochrid.org/prologue.png',
    },
    manifest: '/manifest.json',
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    themeColor: '#9d0000',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Prologue',
    },
    formatDetection: {
      telephone: false,
    },
    other: {
      'apple-itunes-app': 'app-argument=audio-playback',
      'msapplication-TileColor': '#9d0000',
      'msapplication-TileImage': '/prologue.png',
      'jesus-is-lord': `
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
      `,
    },
  }
}
 
const Wrapper = getMDXComponents().wrapper
 
export default async function Page(props) {
  const params = await props.params
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata } = result
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <ProloguePlayer />
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}