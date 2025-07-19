'use client'

import React, { useState, forwardRef, useEffect } from 'react';
import { eachDayOfInterval, startOfDay, subDays, format, differenceInDays } from 'date-fns';
import { useRouter, usePathname } from 'next/navigation';

const ToggleSwitch = ({ label, onChange, isChecked }) => {
    return (
        <div className="toggle-container">
            {label}{" "}
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                    name={label} id={label} onChange={onChange} checked={isChecked} />
                <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
};

const NsToggle = () => {
    const [startDate, setStartDate] = useState(subDays(new Date(), 13));
    const [isNSActive, setIsNSActive] = useState(false); // State to track if "N.S" is active
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedValue = localStorage.getItem('newCalendar');
            setIsNSActive(storedValue === 'true');
        }
    }, []);
    
    // Update toggle state based on current route (only if user hasn't manually set it recently)
    useEffect(() => {
        // Don't auto-update on special pages
        if (pathname === '/prologue' || pathname === '/' || pathname === '/index') {
            return;
        }
        
        // Check if user has manually set the toggle recently (within last 5 seconds)
        const lastManualChange = localStorage.getItem('lastManualToggleChange');
        const now = Date.now();
        const isRecentManualChange = lastManualChange && (now - parseInt(lastManualChange)) < 5000; // 5 seconds
        
        // Only auto-update if no recent manual change
        if (!isRecentManualChange) {
            // Extract date from current path and determine if it's NS or OS
            const pathParts = pathname.split('/').filter(segment => segment);
            const monthFromPath = pathParts[0]?.toLowerCase();
            const dayFromPath = pathParts[1]?.replace(/\D/g, '');
            
            const validMonthPaths = [
                'january', 'february', 'march', 'april', 'may', 'june', 
                'july', 'august', 'september', 'october', 'november', 'december'
            ];
            
            if (validMonthPaths.includes(monthFromPath) && dayFromPath) {
                const currentYear = new Date().getFullYear();
                const selectedDate = new Date(`${monthFromPath} ${dayFromPath}, ${currentYear}`);
                const today = new Date();
                const osDate = subDays(today, 13);
                
                // Calculate difference in days between selected date and both NS/OS dates
                const diffFromToday = Math.abs(differenceInDays(selectedDate, today));
                const diffFromOS = Math.abs(differenceInDays(selectedDate, osDate));
                
                // Determine which date (NS or OS) the selected date is closer to
                const shouldBeNS = diffFromToday <= diffFromOS;
                
                // Update toggle state if it doesn't match what it should be
                if (shouldBeNS !== isNSActive) {
                    setIsNSActive(shouldBeNS);
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
        }
    }, [pathname, isNSActive]);

    const handleToggleSwitchClick = () => {
        setIsNSActive(prevIsNSActive => {
            const newIsNSActive = !prevIsNSActive;
            if (typeof window !== 'undefined') {
                localStorage.setItem('newCalendar', newIsNSActive ? 'true' : 'false');
                // Mark this as a manual change with timestamp
                localStorage.setItem('lastManualToggleChange', Date.now().toString());
                // Defer event dispatch to avoid React render cycle conflicts
                setTimeout(() => {
                    // Dispatch custom event to notify other components
                    window.dispatchEvent(new CustomEvent('calendarToggleChange'));
                }, 0);
            }
            return newIsNSActive;
        });
    };

    const handleNSButtonClick = () => {
        setStartDate(new Date());
        const formattedDate = format(new Date(), 'MMMM/do').toLowerCase();
        router.push(`/${formattedDate}`);
    };

    const handleOSButtonClick = () => {
        setStartDate(subDays(new Date(), 13));
        const formattedDate = format(subDays(new Date(), 13), 'MMMM/do').toLowerCase();
        router.push(`/${formattedDate}`);
    };

    return (
        <div className="calendar-wrapper">
            <ToggleSwitch label=" " onChange={handleToggleSwitchClick} isChecked={isNSActive} />
        </div>
    );
};

export default NsToggle;