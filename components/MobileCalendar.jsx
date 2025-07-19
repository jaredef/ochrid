'use client'

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { startOfDay, subDays, format, getYear, eachDayOfInterval } from 'date-fns';
import { useRouter, usePathname } from 'next/navigation';

const MobileCalendar = () => {
    const router = useRouter();
    const pathname = usePathname();

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
        const formattedDate = format(date, 'MMMM/do').toLowerCase();
        router.push(`/${formattedDate}`);
    };

    return (
        <div className="mobile-calendar-sidebar">
            <style jsx global>{`
                /* Mobile calendar in sidebar - only show on mobile */
                .mobile-calendar-sidebar {
                    display: none;
                }

                @media (max-width: 768px) {
                    .mobile-calendar-sidebar {
                        display: flex;
                        justify-content: center;
                        width: 100%;
                        max-width: 100%;
                        padding: 0.75rem;
                        margin: 0.5rem 0;
                        background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        border: 1px solid #e5e7eb;
                        overflow: hidden;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar {
                        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                        border: 1px solid #333;
                    }

                    .mobile-calendar-sidebar .react-datepicker {
                        background-color: #ffffff !important;
                        border: none !important;
                        border-radius: 6px !important;
                        font-family: var(--font-pt-serif-caption-regular), serif;
                        width: auto !important;
                        max-width: none !important;
                        box-shadow: none !important;
                        font-size: 0.875rem !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker {
                        background-color: #1a1a1a !important;
                        border: none !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__header {
                        background-color: #f8fafc !important;
                        border-bottom: 1px solid #e2e8f0 !important;
                        border-radius: 6px 6px 0 0 !important;
                        padding: 0.5rem 0.75rem !important;
                        width: 100% !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__header {
                        background-color: #2d2d2d !important;
                        border-bottom: 1px solid #404040 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__current-month {
                        color: #1e293b !important;
                        font-size: 0.95rem !important;
                        font-weight: 600 !important;
                        margin-bottom: 0.5rem !important;
                        padding: 0 !important;
                        text-align: center !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__current-month {
                        color: #f1f5f9 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day-names {
                        display: grid !important;
                        grid-template-columns: repeat(7, 2rem) !important;
                        gap: 2px !important;
                        margin-bottom: 4px !important;
                        padding: 0 4px !important;
                        justify-content: center !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day-name {
                        color: #64748b !important;
                        font-weight: 600 !important;
                        font-size: 0.75rem !important;
                        text-transform: uppercase !important;
                        letter-spacing: 0.025em !important;
                        text-align: center !important;
                        padding: 4px 2px !important;
                        margin: 0 !important;
                        width: 2rem !important;
                        height: auto !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__day-name {
                        color: #94a3b8 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__month {
                        margin: 0 !important;
                        padding: 4px !important;
                        display: flex !important;
                        flex-direction: column !important;
                        align-items: center !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__week {
                        display: grid !important;
                        grid-template-columns: repeat(7, 2rem) !important;
                        gap: 2px !important;
                        margin-bottom: 2px !important;
                        justify-content: center !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day {
                        background-color: transparent !important;
                        border: 1px solid transparent !important;
                        border-radius: 6px !important;
                        color: #334155 !important;
                        font-size: 0.8rem !important;
                        font-weight: 500 !important;
                        height: 2rem !important;
                        width: 2rem !important;
                        line-height: 1 !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        transition: all 0.15s ease !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        cursor: pointer !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__day {
                        color: #e2e8f0 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day:hover {
                        background-color: #f1f5f9 !important;
                        border-color: #cbd5e1 !important;
                        color: #0f172a !important;
                        transform: scale(1.05) !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__day:hover {
                        background-color: #374151 !important;
                        border-color: #4b5563 !important;
                        color: #ffffff !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day--selected {
                        background-color: #9d0000 !important;
                        border-color: #9d0000 !important;
                        color: #ffffff !important;
                        font-weight: 600 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day--keyboard-selected {
                        background-color: #9d0000 !important;
                        border-color: #9d0000 !important;
                        color: #ffffff !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day--highlighted {
                        background-color: #fef3c7 !important;
                        border-color: #f59e0b !important;
                        color: #92400e !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__day--highlighted {
                        background-color: #451a03 !important;
                        border-color: #92400e !important;
                        color: #fbbf24 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day--today {
                        background-color: #f1f5f9 !important;
                        border-color: #9d0000 !important;
                        color: #0f172a !important;
                        font-weight: 600 !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__day--today {
                        background-color: #374151 !important;
                        border-color: #9d0000 !important;
                        color: #ffffff !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day--outside-month {
                        color: #94a3b8 !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__day--outside-month {
                        color: #64748b !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day--disabled {
                        color: #cbd5e1 !important;
                        cursor: not-allowed !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__day--disabled {
                        color: #475569 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__navigation {
                        background-color: #f8fafc !important;
                        border: 1px solid #cbd5e1 !important;
                        border-radius: 4px !important;
                        color: #475569 !important;
                        height: 1.5rem !important;
                        width: 1.5rem !important;
                        top: 0.75rem !important;
                        transition: all 0.15s ease !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__navigation {
                        background-color: #374151 !important;
                        border: 1px solid #4b5563 !important;
                        color: #e5e7eb !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__navigation:hover {
                        background-color: #e2e8f0 !important;
                        border-color: #94a3b8 !important;
                        transform: scale(1.05) !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__navigation:hover {
                        background-color: #4b5563 !important;
                        border-color: #6b7280 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__navigation--previous {
                        left: 0.75rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__navigation--next {
                        right: 0.75rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__navigation-icon::before {
                        border-color: #475569 !important;
                        border-width: 2px 2px 0 0 !important;
                        height: 5px !important;
                        width: 5px !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__navigation-icon::before {
                        border-color: #e5e7eb !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day--holidays {
                        background-color: #fef3c7 !important;
                        border-color: #f59e0b !important;
                        color: #92400e !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__day--holidays {
                        background-color: #451a03 !important;
                        border-color: #92400e !important;
                        color: #fbbf24 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day--holidays:hover {
                        background-color: #fde68a !important;
                        border-color: #d97706 !important;
                        color: #78350f !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__day--holidays:hover {
                        background-color: #78350f !important;
                        border-color: #d97706 !important;
                        color: #fcd34d !important;
                    }

                    /* Month/Year dropdowns */
                    .mobile-calendar-sidebar .react-datepicker__month-dropdown,
                    .mobile-calendar-sidebar .react-datepicker__year-dropdown {
                        background-color: #ffffff !important;
                        border: 1px solid #d1d5db !important;
                        border-radius: 6px !important;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
                        font-size: 0.875rem !important;
                        max-height: 150px !important;
                        overflow-y: auto !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__month-dropdown,
                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__year-dropdown {
                        background-color: #1f2937 !important;
                        border: 1px solid #374151 !important;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3) !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__month-option,
                    .mobile-calendar-sidebar .react-datepicker__year-option {
                        padding: 0.375rem 0.75rem !important;
                        color: #374151 !important;
                        cursor: pointer !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__month-option,
                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__year-option {
                        color: #e5e7eb !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__month-option:hover,
                    .mobile-calendar-sidebar .react-datepicker__year-option:hover {
                        background-color: #f3f4f6 !important;
                        color: #111827 !important;
                    }

                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__month-option:hover,
                    :is(html[class~=dark]) .mobile-calendar-sidebar .react-datepicker__year-option:hover {
                        background-color: #374151 !important;
                        color: #ffffff !important;
                    }
                }

                /* Smaller mobile devices */
                @media (max-width: 480px) {
                    .mobile-calendar-sidebar {
                        padding: 0.5rem !important;
                        margin: 0.25rem 0 !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__header {
                        padding: 0.375rem 0.5rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__current-month {
                        font-size: 0.9rem !important;
                        margin-bottom: 0.375rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day-names {
                        grid-template-columns: repeat(7, 1.75rem) !important;
                        padding: 0 2px !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day-name {
                        font-size: 0.7rem !important;
                        padding: 3px 1px !important;
                        width: 1.75rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__week {
                        grid-template-columns: repeat(7, 1.75rem) !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day {
                        height: 1.75rem !important;
                        width: 1.75rem !important;
                        font-size: 0.75rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__navigation {
                        height: 1.25rem !important;
                        width: 1.25rem !important;
                        top: 0.625rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__navigation--previous {
                        left: 0.5rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__navigation--next {
                        right: 0.5rem !important;
                    }
                }

                /* Very small devices */
                @media (max-width: 360px) {
                    .mobile-calendar-sidebar {
                        padding: 0.375rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day-names {
                        grid-template-columns: repeat(7, 1.5rem) !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day-name {
                        font-size: 0.65rem !important;
                        padding: 2px 1px !important;
                        width: 1.5rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__week {
                        grid-template-columns: repeat(7, 1.5rem) !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__day {
                        height: 1.5rem !important;
                        width: 1.5rem !important;
                        font-size: 0.7rem !important;
                    }

                    .mobile-calendar-sidebar .react-datepicker__current-month {
                        font-size: 0.85rem !important;
                    }
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
    );
};

export default MobileCalendar; 