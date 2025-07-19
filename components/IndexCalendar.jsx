'use client'

import React, { useState, forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval, startOfDay, subDays, format, getYear, differenceInDays } from 'date-fns';
import { useRouter, usePathname } from 'next/navigation';

// Utility function to update NS toggle based on selected date
const updateNSToggleBasedOnDate = (selectedDate) => {
    // Check if user has manually set the toggle recently (within last 5 seconds)
    const lastManualChange = localStorage.getItem('lastManualToggleChange');
    const now = Date.now();
    const isRecentManualChange = lastManualChange && (now - parseInt(lastManualChange)) < 5000; // 5 seconds
    
    // Only auto-update if no recent manual change
    if (!isRecentManualChange) {
        const today = new Date();
        const osDate = subDays(today, 13);
        
        // Calculate difference in days between selected date and both NS/OS dates
        const diffFromToday = Math.abs(differenceInDays(selectedDate, today));
        const diffFromOS = Math.abs(differenceInDays(selectedDate, osDate));
        
        // Determine which date (NS or OS) the selected date is closer to
        const shouldBeNS = diffFromToday <= diffFromOS;
        
        // Check current toggle state
        const currentToggleState = localStorage.getItem('newCalendar') === 'true';
        
        // Only update if the toggle state should change
        if (shouldBeNS !== currentToggleState) {
            // Update localStorage and dispatch event
            if (typeof window !== 'undefined') {
                localStorage.setItem('newCalendar', shouldBeNS ? 'true' : 'false');
                // Mark this as an automatic change (not manual)
                localStorage.setItem('lastAutoToggleChange', now.toString());
                // Defer event dispatch to avoid React render cycle conflicts
                setTimeout(() => {
                    // Dispatch custom event to notify other components
                    window.dispatchEvent(new CustomEvent('calendarToggleChange'));
                }, 0);
            }
        }
    }
    
    return true; // Always allow navigation
};

const IndexCalendar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    // Only show on index page
    if (pathname !== '/') {
        return null;
    }

    // Simulate loading time for CSS to apply
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100); // Small delay to ensure CSS is loaded

        return () => clearTimeout(timer);
    }, []);

    // Holiday data for all years from 2025 to 2035
    const holidaysByYear = {
        2025: [
            { date: startOfDay(new Date(2025, 0, 1)), holidayName: "N.S." }, // January 1, 2025
            { date: startOfDay(subDays(new Date(2025, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2024
            { date: startOfDay(new Date(2025, 0, 6)), holidayName: "Theophany" }, // January 6, 2025
            { date: startOfDay(new Date(2025, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2025
            { date: startOfDay(new Date(2025, 2, 25)), holidayName: "Annunciation" }, // March 25, 2025
            { date: startOfDay(new Date(2025, 3, 13)), holidayName: "Palm Sunday" }, // April 13, 2025
            { date: startOfDay(new Date(2025, 3, 20)), holidayName: "Great and Holy Pascha" }, // April 20, 2025
            { date: startOfDay(new Date(2025, 4, 29)), holidayName: "Ascension" }, // May 29, 2025
            { date: startOfDay(new Date(2025, 5, 8)), holidayName: "Pentecost" }, // June 8, 2025
            { date: startOfDay(new Date(2025, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2025
            { date: startOfDay(new Date(2025, 7, 15)), holidayName: "Dormition" }, // August 15, 2025
            { date: startOfDay(new Date(2025, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2025
            { date: startOfDay(new Date(2025, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2025
            { date: startOfDay(new Date(2025, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2025
            { date: startOfDay(new Date(2025, 11, 25)), holidayName: "Christmas" } // December 25, 2025
        ],
        2026: [
            { date: startOfDay(new Date(2026, 0, 1)), holidayName: "N.S." }, // January 1, 2026
            { date: startOfDay(subDays(new Date(2026, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2025
            { date: startOfDay(new Date(2026, 0, 6)), holidayName: "Theophany" }, // January 6, 2026
            { date: startOfDay(new Date(2026, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2026
            { date: startOfDay(new Date(2026, 2, 25)), holidayName: "Annunciation" }, // March 25, 2026
            { date: startOfDay(new Date(2026, 3, 5)), holidayName: "Palm Sunday" }, // April 5, 2026
            { date: startOfDay(new Date(2026, 3, 12)), holidayName: "Great and Holy Pascha" }, // April 12, 2026
            { date: startOfDay(new Date(2026, 4, 21)), holidayName: "Ascension" }, // May 21, 2026
            { date: startOfDay(new Date(2026, 4, 31)), holidayName: "Pentecost" }, // May 31, 2026
            { date: startOfDay(new Date(2026, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2026
            { date: startOfDay(new Date(2026, 7, 15)), holidayName: "Dormition" }, // August 15, 2026
            { date: startOfDay(new Date(2026, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2026
            { date: startOfDay(new Date(2026, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2026
            { date: startOfDay(new Date(2026, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2026
            { date: startOfDay(new Date(2026, 11, 25)), holidayName: "Christmas" } // December 25, 2026
        ],
        2027: [
            { date: startOfDay(new Date(2027, 0, 1)), holidayName: "N.S." }, // January 1, 2027
            { date: startOfDay(subDays(new Date(2027, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2026
            { date: startOfDay(new Date(2027, 0, 6)), holidayName: "Theophany" }, // January 6, 2027
            { date: startOfDay(new Date(2027, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2027
            { date: startOfDay(new Date(2027, 2, 25)), holidayName: "Annunciation" }, // March 25, 2027
            { date: startOfDay(new Date(2027, 3, 25)), holidayName: "Palm Sunday" }, // April 25, 2027
            { date: startOfDay(new Date(2027, 4, 2)), holidayName: "Great and Holy Pascha" }, // May 2, 2027
            { date: startOfDay(new Date(2027, 5, 10)), holidayName: "Ascension" }, // June 10, 2027
            { date: startOfDay(new Date(2027, 5, 20)), holidayName: "Pentecost" }, // June 20, 2027
            { date: startOfDay(new Date(2027, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2027
            { date: startOfDay(new Date(2027, 7, 15)), holidayName: "Dormition" }, // August 15, 2027
            { date: startOfDay(new Date(2027, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2027
            { date: startOfDay(new Date(2027, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2027
            { date: startOfDay(new Date(2027, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2027
            { date: startOfDay(new Date(2027, 11, 25)), holidayName: "Christmas" } // December 25, 2027
        ],
        2028: [
            { date: startOfDay(new Date(2028, 0, 1)), holidayName: "N.S." }, // January 1, 2028
            { date: startOfDay(subDays(new Date(2028, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2027
            { date: startOfDay(new Date(2028, 0, 6)), holidayName: "Theophany" }, // January 6, 2028
            { date: startOfDay(new Date(2028, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2028
            { date: startOfDay(new Date(2028, 2, 25)), holidayName: "Annunciation" }, // March 25, 2028
            { date: startOfDay(new Date(2028, 3, 9)), holidayName: "Palm Sunday" }, // April 9, 2028
            { date: startOfDay(new Date(2028, 3, 16)), holidayName: "Great and Holy Pascha" }, // April 16, 2028
            { date: startOfDay(new Date(2028, 4, 25)), holidayName: "Ascension" }, // May 25, 2028
            { date: startOfDay(new Date(2028, 5, 4)), holidayName: "Pentecost" }, // June 4, 2028
            { date: startOfDay(new Date(2028, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2028
            { date: startOfDay(new Date(2028, 7, 15)), holidayName: "Dormition" }, // August 15, 2028
            { date: startOfDay(new Date(2028, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2028
            { date: startOfDay(new Date(2028, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2028
            { date: startOfDay(new Date(2028, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2028
            { date: startOfDay(new Date(2028, 11, 25)), holidayName: "Christmas" } // December 25, 2028
        ],
        2029: [
            { date: startOfDay(new Date(2029, 0, 1)), holidayName: "N.S." }, // January 1, 2029
            { date: startOfDay(subDays(new Date(2029, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2028
            { date: startOfDay(new Date(2029, 0, 6)), holidayName: "Theophany" }, // January 6, 2029
            { date: startOfDay(new Date(2029, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2029
            { date: startOfDay(new Date(2029, 2, 25)), holidayName: "Annunciation" }, // March 25, 2029
            { date: startOfDay(new Date(2029, 3, 1)), holidayName: "Palm Sunday" }, // April 1, 2029
            { date: startOfDay(new Date(2029, 3, 8)), holidayName: "Great and Holy Pascha" }, // April 8, 2029
            { date: startOfDay(new Date(2029, 4, 17)), holidayName: "Ascension" }, // May 17, 2029
            { date: startOfDay(new Date(2029, 4, 27)), holidayName: "Pentecost" }, // May 27, 2029
            { date: startOfDay(new Date(2029, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2029
            { date: startOfDay(new Date(2029, 7, 15)), holidayName: "Dormition" }, // August 15, 2029
            { date: startOfDay(new Date(2029, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2029
            { date: startOfDay(new Date(2029, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2029
            { date: startOfDay(new Date(2029, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2029
            { date: startOfDay(new Date(2029, 11, 25)), holidayName: "Christmas" } // December 25, 2029
        ],
        2030: [
            { date: startOfDay(new Date(2030, 0, 1)), holidayName: "N.S." }, // January 1, 2030
            { date: startOfDay(subDays(new Date(2030, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2029
            { date: startOfDay(new Date(2030, 0, 6)), holidayName: "Theophany" }, // January 6, 2030
            { date: startOfDay(new Date(2030, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2030
            { date: startOfDay(new Date(2030, 2, 25)), holidayName: "Annunciation" }, // March 25, 2030
            { date: startOfDay(new Date(2030, 3, 21)), holidayName: "Palm Sunday" }, // April 21, 2030
            { date: startOfDay(new Date(2030, 3, 28)), holidayName: "Great and Holy Pascha" }, // April 28, 2030
            { date: startOfDay(new Date(2030, 5, 6)), holidayName: "Ascension" }, // June 6, 2030
            { date: startOfDay(new Date(2030, 5, 16)), holidayName: "Pentecost" }, // June 16, 2030
            { date: startOfDay(new Date(2030, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2030
            { date: startOfDay(new Date(2030, 7, 15)), holidayName: "Dormition" }, // August 15, 2030
            { date: startOfDay(new Date(2030, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2030
            { date: startOfDay(new Date(2030, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2030
            { date: startOfDay(new Date(2030, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2030
            { date: startOfDay(new Date(2030, 11, 25)), holidayName: "Christmas" } // December 25, 2030
        ],
        2031: [
            { date: startOfDay(new Date(2031, 0, 1)), holidayName: "N.S." }, // January 1, 2031
            { date: startOfDay(subDays(new Date(2031, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2030
            { date: startOfDay(new Date(2031, 0, 6)), holidayName: "Theophany" }, // January 6, 2031
            { date: startOfDay(new Date(2031, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2031
            { date: startOfDay(new Date(2031, 2, 25)), holidayName: "Annunciation" }, // March 25, 2031
            { date: startOfDay(new Date(2031, 3, 6)), holidayName: "Palm Sunday" }, // April 6, 2031
            { date: startOfDay(new Date(2031, 3, 13)), holidayName: "Great and Holy Pascha" }, // April 13, 2031
            { date: startOfDay(new Date(2031, 4, 22)), holidayName: "Ascension" }, // May 22, 2031
            { date: startOfDay(new Date(2031, 5, 1)), holidayName: "Pentecost" }, // June 1, 2031
            { date: startOfDay(new Date(2031, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2031
            { date: startOfDay(new Date(2031, 7, 15)), holidayName: "Dormition" }, // August 15, 2031
            { date: startOfDay(new Date(2031, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2031
            { date: startOfDay(new Date(2031, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2031
            { date: startOfDay(new Date(2031, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2031
            { date: startOfDay(new Date(2031, 11, 25)), holidayName: "Christmas" } // December 25, 2031
        ],
        2032: [
            { date: startOfDay(new Date(2032, 0, 1)), holidayName: "N.S." }, // January 1, 2032
            { date: startOfDay(subDays(new Date(2032, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2031
            { date: startOfDay(new Date(2032, 0, 6)), holidayName: "Theophany" }, // January 6, 2032
            { date: startOfDay(new Date(2032, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2032
            { date: startOfDay(new Date(2032, 2, 25)), holidayName: "Annunciation" }, // March 25, 2032
            { date: startOfDay(new Date(2032, 3, 25)), holidayName: "Palm Sunday" }, // April 25, 2032
            { date: startOfDay(new Date(2032, 4, 2)), holidayName: "Great and Holy Pascha" }, // May 2, 2032
            { date: startOfDay(new Date(2032, 5, 10)), holidayName: "Ascension" }, // June 10, 2032
            { date: startOfDay(new Date(2032, 5, 20)), holidayName: "Pentecost" }, // June 20, 2032
            { date: startOfDay(new Date(2032, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2032
            { date: startOfDay(new Date(2032, 7, 15)), holidayName: "Dormition" }, // August 15, 2032
            { date: startOfDay(new Date(2032, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2032
            { date: startOfDay(new Date(2032, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2032
            { date: startOfDay(new Date(2032, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2032
            { date: startOfDay(new Date(2032, 11, 25)), holidayName: "Christmas" } // December 25, 2032
        ],
        2033: [
            { date: startOfDay(new Date(2033, 0, 1)), holidayName: "N.S." }, // January 1, 2033
            { date: startOfDay(subDays(new Date(2033, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2032
            { date: startOfDay(new Date(2033, 0, 6)), holidayName: "Theophany" }, // January 6, 2033
            { date: startOfDay(new Date(2033, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2033
            { date: startOfDay(new Date(2033, 2, 25)), holidayName: "Annunciation" }, // March 25, 2033
            { date: startOfDay(new Date(2033, 3, 17)), holidayName: "Palm Sunday" }, // April 17, 2033
            { date: startOfDay(new Date(2033, 3, 24)), holidayName: "Great and Holy Pascha" }, // April 24, 2033
            { date: startOfDay(new Date(2033, 5, 2)), holidayName: "Ascension" }, // June 2, 2033
            { date: startOfDay(new Date(2033, 5, 12)), holidayName: "Pentecost" }, // June 12, 2033
            { date: startOfDay(new Date(2033, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2033
            { date: startOfDay(new Date(2033, 7, 15)), holidayName: "Dormition" }, // August 15, 2033
            { date: startOfDay(new Date(2033, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2033
            { date: startOfDay(new Date(2033, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2033
            { date: startOfDay(new Date(2033, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2033
            { date: startOfDay(new Date(2033, 11, 25)), holidayName: "Christmas" } // December 25, 2033
        ],
        2034: [
            { date: startOfDay(new Date(2034, 0, 1)), holidayName: "N.S." }, // January 1, 2034
            { date: startOfDay(subDays(new Date(2034, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2033
            { date: startOfDay(new Date(2034, 0, 6)), holidayName: "Theophany" }, // January 6, 2034
            { date: startOfDay(new Date(2034, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2034
            { date: startOfDay(new Date(2034, 2, 25)), holidayName: "Annunciation" }, // March 25, 2034
            { date: startOfDay(new Date(2034, 3, 2)), holidayName: "Palm Sunday" }, // April 2, 2034
            { date: startOfDay(new Date(2034, 3, 9)), holidayName: "Great and Holy Pascha" }, // April 9, 2034
            { date: startOfDay(new Date(2034, 4, 18)), holidayName: "Ascension" }, // May 18, 2034
            { date: startOfDay(new Date(2034, 4, 28)), holidayName: "Pentecost" }, // May 28, 2034
            { date: startOfDay(new Date(2034, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2034
            { date: startOfDay(new Date(2034, 7, 15)), holidayName: "Dormition" }, // August 15, 2034
            { date: startOfDay(new Date(2034, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2034
            { date: startOfDay(new Date(2034, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2034
            { date: startOfDay(new Date(2034, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2034
            { date: startOfDay(new Date(2034, 11, 25)), holidayName: "Christmas" } // December 25, 2034
        ],
        2035: [
            { date: startOfDay(new Date(2035, 0, 1)), holidayName: "N.S." }, // January 1, 2035
            { date: startOfDay(subDays(new Date(2035, 0, 1), 13)), holidayName: "O.S." }, // December 19, 2034
            { date: startOfDay(new Date(2035, 0, 6)), holidayName: "Theophany" }, // January 6, 2035
            { date: startOfDay(new Date(2035, 1, 2)), holidayName: "Meeting of our Lord" }, // February 2, 2035
            { date: startOfDay(new Date(2035, 2, 25)), holidayName: "Annunciation" }, // March 25, 2035
            { date: startOfDay(new Date(2035, 3, 22)), holidayName: "Palm Sunday" }, // April 22, 2035
            { date: startOfDay(new Date(2035, 3, 29)), holidayName: "Great and Holy Pascha" }, // April 29, 2035
            { date: startOfDay(new Date(2035, 5, 7)), holidayName: "Ascension" }, // June 7, 2035
            { date: startOfDay(new Date(2035, 5, 17)), holidayName: "Pentecost" }, // June 17, 2035
            { date: startOfDay(new Date(2035, 7, 6)), holidayName: "Transfiguration" }, // August 6, 2035
            { date: startOfDay(new Date(2035, 7, 15)), holidayName: "Dormition" }, // August 15, 2035
            { date: startOfDay(new Date(2035, 8, 8)), holidayName: "Nativity of the Theotokos" }, // September 8, 2035
            { date: startOfDay(new Date(2035, 8, 14)), holidayName: "Elevation of the Cross" }, // September 14, 2035
            { date: startOfDay(new Date(2035, 10, 21)), holidayName: "Entrance of the Theotokos" }, // November 21, 2035
            { date: startOfDay(new Date(2035, 11, 25)), holidayName: "Christmas" } // December 25, 2035
        ]
    };

    // Get current year and determine which holidays to use
    const currentYear = getYear(new Date());
    const currentHolidays = holidaysByYear[currentYear] || holidaysByYear[2025]; // Default to 2025 if year not found

    // Generate date intervals for current year
    const currentYearDates = eachDayOfInterval({
        start: new Date(currentYear, 0, 1),
        end: new Date(currentYear, 11, 31)
    });

    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(segment => segment);
        const monthFromPath = pathSegments[0]?.toLowerCase();
        const dayFromPath = pathSegments[1]?.replace(/\D/g, '');
    
        const validMonthPaths = [
            'january', 'february', 'march', 'april', 'may', 'june', 
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
    
        if (validMonthPaths.includes(monthFromPath)) {
            const month = monthFromPath.toUpperCase();
            const day = dayFromPath || new Date().getDate();
            const selectedDate = new Date(`${month} ${day}, ${currentYear}`);
            setStartDate(selectedDate);
        }
    }, [pathname, currentYear]);

    const handleDateChange = (date) => {
        setStartDate(date);
        
        // Update NS toggle based on selected date
        updateNSToggleBasedOnDate(date);
        
        const formattedDate = format(date, 'MMMM/do').toLowerCase();
        router.push(`/${formattedDate}`);
    };

    return (
        <>
            {/* Loading state */}
            {isLoading && (
                <div className="index-calendar-wrapper desktop-only">
                    <div className="calendar-loading">
                        <svg className="loading-spinner" width="40" height="40" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="113.097" strokeDashoffset="113.097">
                                <animate attributeName="stroke-dashoffset" dur="1s" values="113.097;0;113.097" repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>
                </div>
            )}

            {/* Desktop version - hidden on mobile */}
            {!isLoading && (
                <div className="index-calendar-wrapper desktop-only">
                <style jsx global>{`
                    /* Light mode styles */
                    .index-calendar-wrapper {
                        width: 100%;
                        max-width: 500px;
                        margin: 1rem auto;
                        padding: 1rem;
                        background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
                        border-radius: 12px;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                        border: 1px solid #e5e7eb;
                    }

                    .index-calendar-wrapper .react-datepicker {
                        background-color: #ffffff !important;
                        border: 2px solid #e5e7eb !important;
                        border-radius: 12px !important;
                        font-family: var(--font-pt-serif-caption-regular), serif;
                        width: 100% !important;
                        max-width: none !important;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
                    }

                    .index-calendar-wrapper .react-datepicker__header {
                        background-color: #f9fafb !important;
                        border-bottom: 2px solid #e5e7eb !important;
                        border-radius: 10px 10px 0 0 !important;
                        padding: 0.5rem !important;
                    }

                    .index-calendar-wrapper .react-datepicker__current-month {
                        color: #374151 !important;
                        font-size: 1.2rem !important;
                        font-weight: bold !important;
                        margin-bottom: 0.5rem !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day-names {
                        display: grid !important;
                        grid-template-columns: repeat(7, 1fr) !important;
                        gap: 0.25rem !important;
                        margin-bottom: 0.25rem !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day-name {
                        color: #6b7280 !important;
                        font-weight: bold !important;
                        font-size: 0.9rem !important;
                        text-transform: uppercase !important;
                        letter-spacing: 1px !important;
                    }

                    .index-calendar-wrapper .react-datepicker__month {
                        margin: 0 !important;
                        padding: 0.5rem !important;
                    }

                    .index-calendar-wrapper .react-datepicker__month-container {
                        width: 100% !important;
                    }

                    .index-calendar-wrapper .react-datepicker__week {
                        display: grid !important;
                        grid-template-columns: repeat(7, 1fr) !important;
                        gap: 0.25rem !important;
                        margin-bottom: 0.25rem !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day {
                        background-color: transparent !important;
                        border: 2px solid transparent !important;
                        border-radius: 6px !important;
                        color: #374151 !important;
                        font-size: 0.9rem !important;
                        font-weight: 500 !important;
                        height: 1.5rem !important;
                        line-height: 1.25rem !important;
                        margin: 0 !important;
                        transition: all 0.2s ease !important;
                        width: 100% !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day:hover {
                        background-color: #f3f4f6 !important;
                        border-color: #d1d5db !important;
                        color: #111827 !important;
                        transform: scale(1.05) !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day--selected {
                        background-color: #9d0000 !important;
                        border-color: #9d0000 !important;
                        color: #fff !important;
                        font-weight: bold !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day--keyboard-selected {
                        background-color: #9d0000 !important;
                        border-color: #9d0000 !important;
                        color: #fff !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day--highlighted {
                        background-color: #fef3c7 !important;
                        border-color: #f59e0b !important;
                        color: #92400e !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day--today {
                        background-color: #f3f4f6 !important;
                        border-color: #9d0000 !important;
                        color: #111827 !important;
                        font-weight: bold !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day--outside-month {
                        color: #9ca3af !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day--disabled {
                        color: #d1d5db !important;
                        cursor: not-allowed !important;
                    }

                    .index-calendar-wrapper .react-datepicker__navigation {
                        background-color: #f9fafb !important;
                        border: 1px solid #d1d5db !important;
                        border-radius: 6px !important;
                        color: #374151 !important;
                        height: 1.5rem !important;
                        width: 1.5rem !important;
                        top: 1rem !important;
                    }

                    .index-calendar-wrapper .react-datepicker__navigation:hover {
                        background-color: #f3f4f6 !important;
                        border-color: #9ca3af !important;
                    }

                    .index-calendar-wrapper .react-datepicker__navigation--previous {
                        left: 1rem !important;
                    }

                    .index-calendar-wrapper .react-datepicker__navigation--next {
                        right: 1rem !important;
                    }

                    .index-calendar-wrapper .react-datepicker__navigation-icon::before {
                        border-color: #374151 !important;
                        border-width: 2px 2px 0 0 !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day--holidays {
                        background-color: #fef3c7 !important;
                        border-color: #f59e0b !important;
                        color: #92400e !important;
                    }

                    .index-calendar-wrapper .react-datepicker__day--holidays:hover {
                        background-color: #fde68a !important;
                        border-color: #f59e0b !important;
                        color: #78350f !important;
                    }

                    /* Dark mode styles */
                    :is(html[class~=dark]) .index-calendar-wrapper {
                        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                        border: 1px solid #333;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker {
                        background-color: #1a1a1a !important;
                        border: 2px solid #444 !important;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2) !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__header {
                        background-color: #2d2d2d !important;
                        border-bottom: 2px solid #444 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__current-month {
                        color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__day-name {
                        color: #888 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__day {
                        color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__day:hover {
                        background-color: #444 !important;
                        border-color: #666 !important;
                        color: #fff !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__day--highlighted {
                        background-color: #333 !important;
                        border-color: #555 !important;
                        color: #fff !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__day--today {
                        background-color: #444 !important;
                        border-color: #9d0000 !important;
                        color: #fff !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__day--outside-month {
                        color: #555 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__day--disabled {
                        color: #444 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__navigation {
                        background-color: #333 !important;
                        border: 1px solid #555 !important;
                        color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__navigation:hover {
                        background-color: #444 !important;
                        border-color: #666 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__navigation-icon::before {
                        border-color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__day--holidays {
                        background-color: #2d2d2d !important;
                        border-color: #666 !important;
                        color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .index-calendar-wrapper .react-datepicker__day--holidays:hover {
                        background-color: #444 !important;
                        border-color: #888 !important;
                        color: #fff !important;
                    }

                    /* Mobile menu calendar styles */
                    .nextra-menu-mobile .mobile-calendar {
                        width: 100%;
                        max-width: 100%;
                        margin: 1rem 0;
                        padding: 0.75rem;
                        background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
                        border-radius: 8px;
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                        border: 1px solid #e5e7eb;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker {
                        background-color: #ffffff !important;
                        border: 1px solid #e5e7eb !important;
                        border-radius: 8px !important;
                        font-family: var(--font-pt-serif-caption-regular), serif;
                        width: 100% !important;
                        max-width: none !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__header {
                        background-color: #f9fafb !important;
                        border-bottom: 1px solid #e5e7eb !important;
                        border-radius: 7px 7px 0 0 !important;
                        padding: 0.25rem !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__current-month {
                        color: #374151 !important;
                        font-size: 1rem !important;
                        font-weight: bold !important;
                        margin-bottom: 0.25rem !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day-names {
                        display: grid !important;
                        grid-template-columns: repeat(7, 1fr) !important;
                        gap: 0.125rem !important;
                        margin-bottom: 0.125rem !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day-name {
                        color: #6b7280 !important;
                        font-weight: bold !important;
                        font-size: 0.75rem !important;
                        text-transform: uppercase !important;
                        letter-spacing: 0.5px !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__month {
                        margin: 0 !important;
                        padding: 0.25rem !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__week {
                        display: grid !important;
                        grid-template-columns: repeat(7, 1fr) !important;
                        gap: 0.125rem !important;
                        margin-bottom: 0.125rem !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day {
                        background-color: transparent !important;
                        border: 1px solid transparent !important;
                        border-radius: 4px !important;
                        color: #374151 !important;
                        font-size: 0.75rem !important;
                        font-weight: 500 !important;
                        height: 1.25rem !important;
                        line-height: 1rem !important;
                        margin: 0 !important;
                        transition: all 0.2s ease !important;
                        width: 100% !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day:hover {
                        background-color: #f3f4f6 !important;
                        border-color: #d1d5db !important;
                        color: #111827 !important;
                        transform: scale(1.05) !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day--selected {
                        background-color: #9d0000 !important;
                        border-color: #9d0000 !important;
                        color: #fff !important;
                        font-weight: bold !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day--keyboard-selected {
                        background-color: #9d0000 !important;
                        border-color: #9d0000 !important;
                        color: #fff !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day--highlighted {
                        background-color: #fef3c7 !important;
                        border-color: #f59e0b !important;
                        color: #92400e !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day--today {
                        background-color: #f3f4f6 !important;
                        border-color: #9d0000 !important;
                        color: #111827 !important;
                        font-weight: bold !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day--outside-month {
                        color: #9ca3af !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day--disabled {
                        color: #d1d5db !important;
                        cursor: not-allowed !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__navigation {
                        background-color: #f9fafb !important;
                        border: 1px solid #d1d5db !important;
                        border-radius: 4px !important;
                        color: #374151 !important;
                        height: 1.25rem !important;
                        width: 1.25rem !important;
                        top: 0.75rem !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__navigation:hover {
                        background-color: #f3f4f6 !important;
                        border-color: #9ca3af !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__navigation--previous {
                        left: 0.75rem !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__navigation--next {
                        right: 0.75rem !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__navigation-icon::before {
                        border-color: #374151 !important;
                        border-width: 1px 1px 0 0 !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day--holidays {
                        background-color: #fef3c7 !important;
                        border-color: #f59e0b !important;
                        color: #92400e !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker__day--holidays:hover {
                        background-color: #fde68a !important;
                        border-color: #f59e0b !important;
                        color: #78350f !important;
                    }

                    /* Dark mode mobile menu calendar */
                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar {
                        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
                        border: 1px solid #333;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker {
                        background-color: #1a1a1a !important;
                        border: 1px solid #444 !important;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__header {
                        background-color: #2d2d2d !important;
                        border-bottom: 1px solid #444 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__current-month {
                        color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__day-name {
                        color: #888 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__day {
                        color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__day:hover {
                        background-color: #444 !important;
                        border-color: #666 !important;
                        color: #fff !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__day--highlighted {
                        background-color: #333 !important;
                        border-color: #555 !important;
                        color: #fff !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__day--today {
                        background-color: #444 !important;
                        border-color: #9d0000 !important;
                        color: #fff !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__day--outside-month {
                        color: #555 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__day--disabled {
                        color: #444 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__navigation {
                        background-color: #333 !important;
                        border: 1px solid #555 !important;
                        color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__navigation:hover {
                        background-color: #444 !important;
                        border-color: #666 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__navigation-icon::before {
                        border-color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__day--holidays {
                        background-color: #2d2d2d !important;
                        border-color: #666 !important;
                        color: #e5e5e5 !important;
                    }

                    :is(html[class~=dark]) .nextra-menu-mobile .mobile-calendar .react-datepicker__day--holidays:hover {
                        background-color: #444 !important;
                        border-color: #888 !important;
                        color: #fff !important;
                    }

                    /* Hide desktop calendar on mobile */
                    @media (max-width: 768px) {
                        .desktop-only {
                            display: none !important;
                        }
                        
                        .index-calendar-wrapper {
                            display: none !important;
                        }
                    }

                    /* Override the rule that hides calendar in mobile menu */
                    .nextra-menu-mobile .mobile-calendar-wrapper .react-datepicker {
                        display: block !important;
                    }

                    .nextra-menu-mobile .mobile-calendar .react-datepicker {
                        display: block !important;
                    }

                    /* Ensure mobile calendar is visible */
                    .mobile-calendar-wrapper {
                        display: block !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                        z-index: 9999 !important;
                        position: relative !important;
                    }

                    /* Responsive design for desktop */
                    @media (max-width: 768px) {
                        .index-calendar-wrapper {
                            padding: 1rem;
                            margin: 1rem auto;
                            max-width: 450px;
                        }

                        .index-calendar-wrapper .react-datepicker__day {
                            height: 2.5rem;
                            line-height: 2rem;
                            font-size: 0.9rem;
                        }

                        .index-calendar-wrapper .react-datepicker__current-month {
                            font-size: 1.2rem;
                        }
                    }

                    @media (max-width: 480px) {
                        .index-calendar-wrapper {
                            max-width: 400px;
                            padding: 0.75rem;
                        }

                        .index-calendar-wrapper .react-datepicker__day {
                            height: 2rem;
                            line-height: 1.5rem;
                            font-size: 0.8rem;
                        }

                        .index-calendar-wrapper .react-datepicker__current-month {
                            font-size: 1rem;
                        }
                    }
                    /* Loading state styles */
                    .calendar-loading {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        padding: 2rem;
                        min-height: 200px;
                        color: var(--nx-colors-gray-600);
                    }

                    .loading-spinner {
                        animation: spin 1s linear infinite;
                        margin-bottom: 1rem;
                    }

                    @keyframes spin {
                        from { transform: rotate(0deg); }
                        to { transform: rotate(360deg); }
                    }

                    .calendar-loading p {
                        font-family: var(--font-pt-serif-caption-regular), serif;
                        font-size: 0.9rem;
                        margin: 0;
                        color: var(--nx-colors-gray-500);
                    }

                    /* Dark mode loading styles */
                    :is(html[class~=dark]) .calendar-loading {
                        color: var(--nx-colors-gray-400);
                    }

                    :is(html[class~=dark]) .calendar-loading p {
                        color: var(--nx-colors-gray-400);
                    }
                `}</style>
                
                <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    inline
                    highlightDates={currentHolidays.map(holiday => holiday.date)}
                    holidays={currentHolidays}
                    minDate={new Date(currentYear, 0, 1)}
                    maxDate={new Date(currentYear, 11, 31)}
                />
            </div>
            )}


        </>
    );
};

export default IndexCalendar; 