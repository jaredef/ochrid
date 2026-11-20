'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
    CALENDAR_NAMES,
    TOGGLE_EVENT,
    getIsNewCalendar,
    setCalendarMode,
    readingDateFromPath,
    autoSelectCalendarFor,
} from './calendarStyle';

// Navbar control showing which calendar the reader is following.
// The highlighted segment is always the calendar in use, never the one you would switch to.
const CalendarStyleControl = ({ className = '' }) => {
    const [isNewCalendar, setIsNewCalendar] = useState(false);
    const pathname = usePathname();

    // Load the saved choice and stay in sync with changes made elsewhere (calendars, notices, other tabs).
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

    // On a day page, follow the calendar on which that entry is closer to today.
    useEffect(() => {
        autoSelectCalendarFor(readingDateFromPath(pathname));
    }, [pathname]);

    const choose = (nextIsNewCalendar) => {
        if (nextIsNewCalendar === isNewCalendar) return;
        setIsNewCalendar(nextIsNewCalendar);
        setCalendarMode(nextIsNewCalendar, { source: 'manual' });
    };

    return (
        <div className={`calendar-style-control ${className}`.trim()} role="radiogroup" aria-label="Calendar">
            <button
                type="button"
                role="radio"
                aria-checked={!isNewCalendar}
                className={`calendar-style-option${!isNewCalendar ? ' is-active' : ''}`}
                onClick={() => choose(false)}
                title="Julian calendar: readings follow the church calendar, 13 days behind the civil date"
            >
                {CALENDAR_NAMES.julian}
            </button>
            <button
                type="button"
                role="radio"
                aria-checked={isNewCalendar}
                className={`calendar-style-option${isNewCalendar ? ' is-active' : ''}`}
                onClick={() => choose(true)}
                title="New Calendar: readings follow the civil date"
            >
                {CALENDAR_NAMES.newCalendar}
            </button>
        </div>
    );
};

export default CalendarStyleControl;
