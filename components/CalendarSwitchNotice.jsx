'use client'

import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { AUTO_SWITCH_EVENT, calendarName, setCalendarMode } from './calendarStyle';

const VISIBLE_MS = 6000;

// When the site changes calendars on its own (after a date is picked or a day is opened),
// say so, and offer to keep the calendar the reader had.
const CalendarSwitchNotice = () => {
    const [notice, setNotice] = useState(null);
    const timer = useRef(null);

    useEffect(() => {
        const show = (event) => {
            const { isNewCalendar, previous, readingDate } = event.detail || {};
            setNotice({ isNewCalendar, previous, readingDate });
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setNotice(null), VISIBLE_MS);
        };
        window.addEventListener(AUTO_SWITCH_EVENT, show);
        return () => {
            window.removeEventListener(AUTO_SWITCH_EVENT, show);
            clearTimeout(timer.current);
        };
    }, []);

    if (!notice) return null;

    const keepPrevious = () => {
        clearTimeout(timer.current);
        setCalendarMode(notice.previous, { source: 'manual' });
        setNotice(null);
    };

    return (
        <div className="calendar-switch-notice" role="status" aria-live="polite">
            <span>
                Switched to <strong>{calendarName(notice.isNewCalendar)}</strong>
                {notice.readingDate ? ` for ${format(notice.readingDate, 'MMMM d')}` : ''}
            </span>
            <button type="button" onClick={keepPrevious}>
                Keep {calendarName(notice.previous)}
            </button>
        </div>
    );
};

export default CalendarSwitchNotice;
