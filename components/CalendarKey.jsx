'use client'

import React, { useState, useEffect } from 'react';
import { TOGGLE_EVENT, calendarName, getIsNewCalendar } from './calendarStyle';

// Key under a calendar: which cell is the reading (and on which calendar), which is today, which are feasts.
const CalendarKey = () => {
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

    return (
        <div className="calendar-key">
            <span className="calendar-key-item"><span className="calendar-key-swatch is-reading" />Reading · {calendarName(isNewCalendar)}</span>
            <span className="calendar-key-item"><span className="calendar-key-swatch is-today" />Today</span>
            <span className="calendar-key-item"><span className="calendar-key-swatch is-feast" />Feast</span>
        </div>
    );
};

export default CalendarKey;
