'use client'

import { addDays, subDays, differenceInDays } from 'date-fns';

// The two calendars a reader can follow. The Julian calendar runs 13 days
// behind the civil (New Calendar) date, so on the Julian calendar today's
// reading is the entry for the civil date 13 days ago.
export const JULIAN_OFFSET_DAYS = 13;
export const CALENDAR_NAMES = { julian: 'Julian', newCalendar: 'New Calendar' };

// Fired on every mode change (manual or automatic); detail: { isNewCalendar, source }.
export const TOGGLE_EVENT = 'calendarToggleChange';
// Fired only when the site changes the mode on its own; detail: { isNewCalendar, previous, readingDate }.
export const AUTO_SWITCH_EVENT = 'calendarAutoSwitch';

const MANUAL_GRACE_MS = 5000;
const MONTHS = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
];

export const calendarName = (isNewCalendar) =>
    isNewCalendar ? CALENDAR_NAMES.newCalendar : CALENDAR_NAMES.julian;

// The stored preference keeps its original key ("newCalendar") so readers' saved choices carry over.
export const getIsNewCalendar = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('newCalendar') === 'true';
};

export const setCalendarMode = (isNewCalendar, { source = 'manual', readingDate = null } = {}) => {
    if (typeof window === 'undefined') return;
    const previous = getIsNewCalendar();
    const now = Date.now().toString();
    localStorage.setItem('newCalendar', isNewCalendar ? 'true' : 'false');
    localStorage.setItem(source === 'manual' ? 'lastManualToggleChange' : 'lastAutoToggleChange', now);
    // Defer dispatch so listeners never update state during another component's render.
    setTimeout(() => {
        window.dispatchEvent(new CustomEvent(TOGGLE_EVENT, { detail: { isNewCalendar, source } }));
        if (source === 'auto' && previous !== isNewCalendar) {
            window.dispatchEvent(new CustomEvent(AUTO_SWITCH_EVENT, {
                detail: { isNewCalendar, previous, readingDate }
            }));
        }
    }, 0);
};

// The entry a reader on the given calendar reads today.
export const todaysReadingDate = (isNewCalendar, today = new Date()) =>
    isNewCalendar ? today : subDays(today, JULIAN_OFFSET_DAYS);

// The civil date on which the given entry is read under the given calendar.
export const civilDateFor = (readingDate, isNewCalendar) =>
    isNewCalendar ? readingDate : addDays(readingDate, JULIAN_OFFSET_DAYS);

// Parse "/november/7th" into a Date in the current year; null for non-day pages.
export const readingDateFromPath = (pathname) => {
    const [month, day] = (pathname || '').split('/').filter(Boolean);
    const monthIndex = MONTHS.indexOf(month?.toLowerCase());
    const dayNumber = parseInt(day?.replace(/\D/g, ''), 10);
    if (monthIndex < 0 || !dayNumber) return null;
    return new Date(new Date().getFullYear(), monthIndex, dayNumber);
};

// When a reader opens an entry, follow the calendar on which that entry is closer to today,
// unless they chose a calendar themselves in the last few seconds.
export const autoSelectCalendarFor = (readingDate) => {
    if (typeof window === 'undefined' || !readingDate) return;
    const lastManual = parseInt(localStorage.getItem('lastManualToggleChange') || '0', 10);
    if (Date.now() - lastManual < MANUAL_GRACE_MS) return;

    const today = new Date();
    const fromNew = Math.abs(differenceInDays(readingDate, today));
    const fromJulian = Math.abs(differenceInDays(readingDate, subDays(today, JULIAN_OFFSET_DAYS)));
    const shouldBeNew = fromNew <= fromJulian;

    if (shouldBeNew !== getIsNewCalendar()) {
        setCalendarMode(shouldBeNew, { source: 'auto', readingDate });
    }
};
