import Calendar from '/components/datePicker';
import Image from 'next/image';
import Link from 'next/link';

export default {
    banner : {
        dismissible : false,
        text : (<><Link href="https://westsrbdio.org/" rel="noopener noreferrer" target="_blank"><Image style={{display:"inline-block"}} src="/wsrbdio.png" alt="Serbian Orthodox Diocesse of Western America" height={40} width={53} /> Serbian Orthodox Diocese <i>of</i> Western America</Link></>)
    },
    logo: <><Image src="/prologue.png" height={31} width={150} alt="The Prologue from Ochrid" /></>,
    search : {
        placeholder: "Search the Prologue"
    },
    toc : {
        title : null,
        extraContent: () => {return <Calendar />;}
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
    footer: {
        text: () => {
            return (
        <>
          <div id="copyright">
            {new Date().getFullYear()} ©{' '}
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
       </>
            )
      }
    }
  };