import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const CalendarNav = () => {
    const router = useRouter();

    // Extract the month from the router's pathname
    const monthFromPath = router.pathname.split('/')[1];

    // Extract the day from the router's pathname and strip the suffix
    const dayFromPath = router.pathname.split('/')[2].replace(/\D/g, '');

    // Use the extracted month or default to the current month
    const month = monthFromPath || new Date().toLocaleString('default', { month: 'long' });
    const currentDay = parseInt(dayFromPath);

    // Function to get the previous month
    const getPreviousMonth = (currentMonth) => {
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const currentIndex = months.indexOf(currentMonth.toLowerCase());
        if (currentIndex === 0) {
            return months[11];
        } else {
            return months[currentIndex - 1];
        }
    };

    // Function to get the next month
    const getNextMonth = (currentMonth) => {
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const currentIndex = months.indexOf(currentMonth.toLowerCase());
        if (currentIndex === 11) {
            return months[0];
        } else {
            return months[currentIndex + 1];
        }
    };

    // Function to get the ordinal suffix for a day
    const getOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    };

    const prevUrl =
        currentDay === 1
            ? `/${getPreviousMonth(month)}/31st`
            : `/${month}/${currentDay - 1}${getOrdinalSuffix(currentDay - 1)}`;

    const nextUrl =
        currentDay === 31
            ? `/${getNextMonth(month)}/1st`
            : `/${month}/${currentDay + 1}${getOrdinalSuffix(currentDay + 1)}`;

    return (
        <div className="calendar-nav">
            <Link href={prevUrl}>Previous</Link>
            <Link href={nextUrl}>Next</Link>
        </div>
    );
};

export default CalendarNav;
