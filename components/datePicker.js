import React, { useState, forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval, startOfDay, subDays, format } from 'date-fns';
import { useRouter } from 'next/router';

const ToggleSwitch = ({ label, onClick }) => {
    return (
        <div className="toggle-container">
            {label}{" "}
            <div className="toggle-switch">
                <input type="checkbox" className="checkbox"
                    name={label} id={label} onClick={onClick} />
                <label className="label" htmlFor={label}>
                    <span className="inner" />
                    <span className="switch" />
                </label>
            </div>
        </div>
    );
};

const Calendar = () => {

    const holidays2024 = [
        { date: startOfDay(new Date()), holidayName: "N.S." },
        { date: startOfDay(subDays(new Date(), 13)), holidayName: "O.S." },
        { date: startOfDay(new Date(2024, 0, 6)), holidayName: "Theophany" },
        { date: startOfDay(new Date(2024, 1, 2)), holidayName: "Meeting of our Lord" },
        { date: startOfDay(new Date(2024, 2, 25)), holidayName: "Annunciation" },
        { date: startOfDay(new Date(2024, 3, 28)), holidayName: "Palm Sunday" },
        { date: startOfDay(new Date(2024, 4, 5)), holidayName: "Great and Holy Pascha" },
        { date: startOfDay(new Date(2024, 5, 13)), holidayName: "Ascension" },
        { date: startOfDay(new Date(2024, 5, 23)), holidayName: "Pentecost" },
        { date: startOfDay(new Date(2024, 7, 6)), holidayName: "Transfiguration" },
        { date: startOfDay(new Date(2024, 7, 15)), holidayName: "Dormition" },
        { date: startOfDay(new Date(2024, 8, 8)), holidayName: "Nativity of the Theotokos" },
        { date: startOfDay(new Date(2024, 8, 14)), holidayName: "Elevation of the Cross" },
        { date: startOfDay(new Date(2024, 10, 21)), holidayName: "Entrance of the Theotokos" },
        { date: startOfDay(new Date(2024, 11, 25)), holidayName: "Christmas" }
    ];

    const [startDate, setStartDate] = useState(new Date());
    const [isNSActive, setIsNSActive] = useState(false); // State to track if "N.S" is active
    const router = useRouter();

    useEffect(() => {
        const pathSegments = router.pathname.split('/');
        const monthFromPath = pathSegments[1]?.toLowerCase(); // Convert to lowercase for comparison
        const dayFromPath = pathSegments[2]?.replace(/\D/g, '');
    
        // Array of valid month paths
        const validMonthPaths = [
            'january', 'february', 'march', 'april', 'may', 'june', 
            'july', 'august', 'september', 'october', 'november', 'december'
        ];
    
        // Check if the path begins with any of the valid month paths
        if (validMonthPaths.includes(monthFromPath)) {
            const month = monthFromPath.toUpperCase(); // Convert back to uppercase
            const day = dayFromPath || new Date().getDate();
    
            const selectedDate = new Date(`${month} ${day}, ${new Date().getFullYear()}`);
            setStartDate(selectedDate);
        }
    }, [router.pathname]);
    

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="calendar-date" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const handleToggleSwitchClick = () => {
        setIsNSActive(!isNSActive); // Toggle the state of "N.S" active
    };

    const year2024Dates = eachDayOfInterval({
        start: new Date(2024, 0, 1),
        end: new Date(2024, 11, 31)
    });

    const handleDateChange = (date) => {
        setStartDate(date);
        const formattedDate = format(date, 'MMMM/do').toLowerCase();
        router.push(`/${formattedDate}`);
    };

    return (
        <div className="calendar-wrapper">
            <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                customInput={<ExampleCustomInput />}
                inline
                highlightDates={[subDays(new Date(), 13)]}
                holidays={holidays2024}
            />
        </div>
    );
};

export default Calendar;