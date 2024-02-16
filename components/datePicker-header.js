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

const NsToggle = () => {
    const [startDate, setStartDate] = useState(subDays(new Date(), 13));
    const [isNSActive, setIsNSActive] = useState(false); // State to track if "N.S" is active
    const router = useRouter();

    useEffect(() => {
        console.log("Loading nsToggle from localStorage...");
        const nsToggleFromLocalStorage = localStorage.getItem('nsToggle');
        console.log("nsToggle from localStorage:", nsToggleFromLocalStorage);
        if (nsToggleFromLocalStorage === 'true') {
            setIsNSActive(true);
        }
    }, []);

    useEffect(() => {
        console.log("Saving nsToggle to localStorage...");
        localStorage.setItem('nsToggle', isNSActive);
    }, [isNSActive]);

    useEffect(() => {
        console.log("Current state of isNSActive:", isNSActive);
    }, [isNSActive]);

    const handleToggleSwitchClick = () => {
        setIsNSActive(!isNSActive);
        if (!isNSActive) {
            handleNSButtonClick();
        } else {
            handleOSButtonClick();
        }
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

    const year2024Dates = eachDayOfInterval({
        start: new Date(2024, 0, 1),
        end: new Date(2024, 11, 31)
    });

    const holidays2024 = [
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

    const handleDateChange = (date) => {
        setStartDate(date);
        const formattedDate = format(date, 'MMMM/do').toLowerCase();
        router.push(`/${formattedDate}`);
    };

    return (
        <div className="calendar-wrapper">
            <ToggleSwitch label=" " onClick={handleToggleSwitchClick} />
        </div>
    );
};

export default NsToggle;




/*
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

const NsToggle = () => {
    const [startDate, setStartDate] = useState(subDays(new Date(), 13));
    const [isNSActive, setIsNSActive] = useState(false); // State to track if "N.S" is active
    const router = useRouter();

    useEffect(() => {
        console.log("isNSActive on mount:", isNSActive);
        if (isNSActive) {
            handleNSButtonClick(); // Trigger handleNSButtonClick when the component mounts
        }
    }, [isNSActive]);

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="calendar-date" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

    const handleToggleSwitchClick = () => {
        console.log("isNSActive before toggle:", isNSActive);
        setIsNSActive(!isNSActive); // Toggle the state of "N.S" active
        console.log("isNSActive after toggle:", isNSActive);
        if (!isNSActive) {
            handleNSButtonClick();
        } else {
            handleOSButtonClick();
        }
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

    const year2024Dates = eachDayOfInterval({
        start: new Date(2024, 0, 1),
        end: new Date(2024, 11, 31)
    });

    const holidays2024 = [
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

    const handleDateChange = (date) => {
        setStartDate(date);
        const formattedDate = format(date, 'MMMM/do').toLowerCase();
        router.push(`/${formattedDate}`);
    };

    return (
        <div className="calendar-wrapper">
            <ToggleSwitch label=" " onClick={handleToggleSwitchClick} />
        </div>
    );
};

export default NsToggle; */