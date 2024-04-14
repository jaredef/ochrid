import React, { useState, forwardRef, useEffect } from 'react';
import { eachDayOfInterval, startOfDay, subDays, format } from 'date-fns';
import { useRouter } from 'next/router';

const ToggleSwitch = ({ label, onClick, isChecked }) => {
    return (
        <div className="toggle-container">
            {label}{" "}
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                    name={label} id={label} onClick={onClick} checked={isChecked} />
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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedValue = localStorage.getItem('newCalendar');
            setIsNSActive(storedValue === 'true');
        }
    }, []);
    
    useEffect(() => {
        if (!isNSActive) {
            handleOSButtonClick();
        }
        if (isNSActive) {
            handleNSButtonClick(); // Trigger handleNSButtonClick when the component mounts
        }
    }, [isNSActive]);

    const handleToggleSwitchClick = () => {
        setIsNSActive(prevIsNSActive => {
            const newIsNSActive = !prevIsNSActive;
            if (typeof window !== 'undefined') {
                localStorage.setItem('newCalendar', newIsNSActive ? 'true' : 'false');
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
            <ToggleSwitch label=" " onClick={handleToggleSwitchClick} isChecked={isNSActive} />
        </div>
    );
};

export default NsToggle;