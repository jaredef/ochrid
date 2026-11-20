'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { setMenu, useMenu, useTheme } from 'nextra-theme-docs';
import CalendarStyleControl from './datePicker-header';
import MobileCalendar from './MobileCalendar';
import { SearchWithCallback } from './search-with-callback';
import {
    TOGGLE_EVENT,
    calendarName,
    getIsNewCalendar,
    todaysReadingDate,
} from './calendarStyle';

// Track the reader's calendar choice so the header chip and "Today's reading" stay current.
const useIsNewCalendar = () => {
    const [isNewCalendar, setIsNewCalendar] = useState(false);
    useEffect(() => {
        const sync = () => setIsNewCalendar(getIsNewCalendar());
        sync();
        window.addEventListener(TOGGLE_EVENT, sync);
        window.addEventListener('storage', sync);
        return () => {
            window.removeEventListener(TOGGLE_EVENT, sync);
            window.removeEventListener('storage', sync);
        };
    }, []);
    return isNewCalendar;
};

const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const MenuIcon = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);
const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M11.7 11.7L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
);
const Chevron = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const openMenu = (focusSearch = false) => {
    setMenu(true);
    if (focusSearch) {
        // Wait for the panel to render, then put the cursor in the search field.
        setTimeout(() => document.querySelector('.mobile-menu-search input')?.focus(), 50);
    }
};

// Shown in the navbar below the md breakpoint: calendar chip, search and menu buttons.
export const MobileHeaderActions = () => {
    const isNewCalendar = useIsNewCalendar();
    return (
        <div className="mobile-header-actions">
            <button type="button" className="mobile-calendar-chip" onClick={() => openMenu()} aria-label={`Calendar: ${calendarName(isNewCalendar)}. Open menu`}>
                {calendarName(isNewCalendar)}
            </button>
            <button type="button" className="mobile-header-icon" onClick={() => openMenu(true)} aria-label="Search the Prologue">
                <SearchIcon />
            </button>
            <button type="button" className="mobile-header-icon" onClick={() => openMenu()} aria-label="Open menu">
                <MenuIcon />
            </button>
        </div>
    );
};

const THEMES = [
    {
        value: 'light', label: 'Matins',
        icon: (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.5 4.5M11.5 11.5L12.6 12.6M3.4 12.6L4.5 11.5M11.5 4.5L12.6 3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        value: 'dark', label: 'Vespers',
        icon: (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5A5.5 5.5 0 1 0 13.5 9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        value: 'system', label: 'Current Hour',
        icon: (
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 4.5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

const ThemeChoice = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const current = mounted ? theme : null;
    return (
        <div className="mobile-menu-segmented mobile-menu-theme" role="radiogroup" aria-label="Appearance">
            {THEMES.map(({ value, label, icon }) => (
                <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={current === value}
                    className={`mobile-menu-segment${current === value ? ' is-active' : ''}`}
                    onClick={() => setTheme(value)}
                >
                    {icon}{label}
                </button>
            ))}
        </div>
    );
};

// Full-screen menu below the md breakpoint. Replaces Nextra's built-in mobile menu (hidden in globals.css)
// but uses its open/close state, so the page scroll lock and route handling stay Nextra's.
export const MobileMenuPanel = () => {
    const isOpen = useMenu();
    const pathname = usePathname();
    const isNewCalendar = useIsNewCalendar();

    // Close after navigating anywhere (a date, today's reading, a page link).
    useEffect(() => { setMenu(false); }, [pathname]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (event) => { if (event.key === 'Escape') setMenu(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen]);

    if (!isOpen) return null;

    const reading = todaysReadingDate(isNewCalendar);
    const readingHref = `/${format(reading, 'MMMM/do').toLowerCase()}`;

    return (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="mobile-menu-header">
                <Link href="/prologue" aria-label="The Prologue from Ochrid">
                    <Image src="/prologue.png" height={27} width={130} alt="The Prologue from Ochrid" />
                </Link>
                <button type="button" className="mobile-header-icon" onClick={() => setMenu(false)} aria-label="Close menu">
                    <CloseIcon />
                </button>
            </div>

            <div className="mobile-menu-body">
                <Link href={readingHref} className="mobile-menu-today">
                    <span className="mobile-menu-today-text">
                        <span className="mobile-menu-today-date">
                            {format(reading, 'MMMM')}
                            <Image src="/four-dot.png" alt="" height={12} width={12} />
                            {format(reading, 'd')}
                        </span>
                        <span className="mobile-menu-today-label">Today's reading</span>
                    </span>
                    <Chevron />
                </Link>

                <CalendarStyleControl className="calendar-style-control--menu" />

                <div className="mobile-menu-search">
                    <SearchWithCallback />
                </div>

                <MobileCalendar />

                <nav className="mobile-menu-pages" aria-label="Pages">
                    <Link href="/prologue">The Prologue from Ochrid <Chevron /></Link>
                    <Link href="/homilies">Homilies of St. Nikolai <Chevron /></Link>
                </nav>

                <ThemeChoice />
            </div>
        </div>
    );
};
