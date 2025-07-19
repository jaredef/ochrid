import React from 'react'
import Image from 'next/image';
import YouGotScraped from '/components/scrapedFrom';
import Purchase from '/components/purchase';
import { PaginatorTop, PaginatorBottom } from '/components/paginator';
import Calendar from '/components/datePicker';
import { DocsThemeConfig } from 'nextra-theme-docs'

const config = {

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
        defaultOpen: false,
        toggleButton: false,
        autoCollapse: true,
        defaultMenuCollapseLevel: 1
    },
    gitTimestamp: null,
    footer: {
        text: () => {
            return null
        }
    }
};

export default config;