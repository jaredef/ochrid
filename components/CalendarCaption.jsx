'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import {
    TOGGLE_EVENT,
    calendarName,
    civilDateFor,
    getIsNewCalendar,
    readingDateFromPath,
    todaysReadingDate,
} from './calendarStyle';

// One line under the date title naming the calendar in use and the civil day this entry is read on,
// e.g. "Julian reading for Friday, November 20".
const CalendarCaption = () => {
    const pathname = usePathname();
    const [isNewCalendar, setIsNewCalendar] = useState(null);

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

    // Wait for the saved preference so the caption never flashes the wrong calendar.
    if (isNewCalendar === null) return null;

    const readingDate = pathname === '/'
        ? todaysReadingDate(isNewCalendar)
        : readingDateFromPath(pathname);
    if (!readingDate) return null;

    const civilDate = civilDateFor(readingDate, isNewCalendar);

    return (
        <p className="calendar-caption">
            <span className="calendar-caption-name">{calendarName(isNewCalendar)}</span>
            {' '}reading for {format(civilDate, 'EEEE, MMMM d')}
        </p>
    );
};

export default CalendarCaption;
