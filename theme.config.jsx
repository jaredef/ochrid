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
        title : null
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
        defaultMenuCollapseLevel : 1,
        titleComponent: ({ type, title }) => {
            if (title === 'Calendar') {
                return <Calendar />;
            }
            return <>{title}</>
        }
    },
    gitTimestamp: null
  };