import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { eachDayOfInterval, startOfDay, subDays, format } from 'date-fns';
import { useHistory } from "react-router-dom";

const Calendar = () => {
    const [startDate, setStartDate] = useState(subDays(new Date(), 13));
    const history = useHistory();

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="calendar-date" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));

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
        history.push(`/${formattedDate}`);
    };

    return (
        <DatePicker
            holidays={holidays2024}
            includeDates={year2024Dates}
            selected={startDate}
            onChange={handleDateChange}
            customInput={<ExampleCustomInput />}
        />
    );
};

export default Calendar;
