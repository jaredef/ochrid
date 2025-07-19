'use client'
 
import Link from 'next/link'
import { OrthoPraxFooter } from './orthoPrax'
 
export function CustomFooter() {
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
   <div id="rocor-au">Contents displayed as presented by <Link href="https://www.rocor.org.au/?page_id=925">rocor.org.au</Link></div>
   <br />
   <div>
     <p style={{fontFamily: 'monospace', fontSize: '0.5rem', textAlign: 'justify', color: 'white', maxWidth: '500px', margin: '0 auto'}}>
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
    <p>
       This is an open source project under the patronage of St. Nikolai of Zhicha and Blessed Seraphim of Platina.
    </p>
    <br />
    <div id="orthoprax">
          <OrthoPraxFooter />
    </div>
 </div>
  )
}