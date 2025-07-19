'use client'
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { format, subDays, addDays } from 'date-fns';
import { OrthoPraxHeader } from './orthoPrax';

const CustomPaginator = ({ position = 'top' }) => {
    const router = useRouter();
    const pathname = usePathname();

    // Extract the month and day from the pathname
    const pathParts = pathname.split('/').filter(segment => segment);
    const monthFromPath = pathParts[0] ? pathParts[0] : '';
    const dayFromPath = pathParts[1] ? pathParts[1].replace(/\D/g, '') : '';

    // Check if the URL pathname is valid
    const isValidPathname = monthFromPath && dayFromPath;

    // Don't show paginator on home page
    if (pathname === '/' || pathname === '/prologue') {
        return null;
    }

    if (!isValidPathname) {
        // If URL pathname is invalid, return a link to today's date minus 13 days
        const currentDateMinus13Days = subDays(new Date(), 13);
        const monthForTodayMinus13 = format(currentDateMinus13Days, 'MMMM');
        const dayForTodayMinus13 = format(currentDateMinus13Days, 'do');

        // Format the date for display
        const formattedDateMinus13Days = `${monthForTodayMinus13.charAt(0).toUpperCase() + monthForTodayMinus13.slice(1)} ${format(currentDateMinus13Days, 'do')}`;

        if (position === 'bottom') return null;

        return (
            <div id="paginator" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem 0 2rem 0' }}>
                <Link style={{fontSize: '1rem'}} href={`/${monthForTodayMinus13.toLowerCase()}/${dayForTodayMinus13}`}>
                    ~ {formattedDateMinus13Days} ~
                </Link>
            </div>
        );
    }

    const LeftButton = () => {
        const handleLeftButtonClick = (e) => {
            e.preventDefault();
            if (monthFromPath && dayFromPath) {
                const currentYear = new Date().getFullYear();
                const currentDate = new Date(`${monthFromPath} ${dayFromPath}, ${currentYear}`);
                const previousDate = subDays(currentDate, 1);
                const monthFromPreviousDate = format(previousDate, 'MMMM').toLowerCase();
                const dayFromPreviousDate = format(previousDate, 'do');
                const newPathname = `/${monthFromPreviousDate}/${dayFromPreviousDate}`;
                router.push(newPathname);
            }
        };

        const displayText = dayFromPath && monthFromPath 
            ? `${format(subDays(new Date(`${monthFromPath} ${dayFromPath}, ${new Date().getFullYear()}`), 1), 'MMMM').charAt(0).toUpperCase() + format(subDays(new Date(`${monthFromPath} ${dayFromPath}, ${new Date().getFullYear()}`), 1), 'MMMM').slice(1)} ${format(subDays(new Date(`${monthFromPath} ${dayFromPath}, ${new Date().getFullYear()}`), 1), 'do')}`
            : 'Yesterday';

        return (
            <button 
                onClick={handleLeftButtonClick}
                style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'inherit',
                    fontSize: 'inherit'
                }}
            >
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="nx-inline nx-h-5 nx-shrink-0" style={{ width: '1.25rem', height: '1.25rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                {displayText}
            </button>
        );
    };

    const RightButton = () => {
        const handleRightButtonClick = (e) => {
            e.preventDefault();
            if (monthFromPath && dayFromPath) {
                const currentYear = new Date().getFullYear();
                const currentDate = new Date(`${monthFromPath} ${dayFromPath}, ${currentYear}`);
                const nextDate = addDays(currentDate, 1);
                const monthFromNextDate = format(nextDate, 'MMMM').toLowerCase();
                const dayFromNextDate = format(nextDate, 'do');
                const newPathname = `/${monthFromNextDate}/${dayFromNextDate}`;
                router.push(newPathname);
            }
        };

        const displayText = dayFromPath && monthFromPath 
            ? `${format(addDays(new Date(`${monthFromPath} ${dayFromPath}, ${new Date().getFullYear()}`), 1), 'MMMM').charAt(0).toUpperCase() + format(addDays(new Date(`${monthFromPath} ${dayFromPath}, ${new Date().getFullYear()}`), 1), 'MMMM').slice(1)} ${format(addDays(new Date(`${monthFromPath} ${dayFromPath}, ${new Date().getFullYear()}`), 1), 'do')}`
            : 'Tomorrow';

        return (
            <button 
                onClick={handleRightButtonClick}
                style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'inherit',
                    fontSize: 'inherit'
                }}
            >
                {displayText}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="nx-inline nx-h-5 nx-shrink-0 rtl:nx-rotate-180" style={{ width: '1.25rem', height: '1.25rem' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        );
    };

    if (position === 'top') {
        return (
            <div id="paginator" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                <LeftButton />
                <OrthoPraxHeader />
                <RightButton />
            </div>
        );
    }

    if (position === 'bottom') {
        return (
            <>
                <hr />
                <div id="paginator" style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0 2rem 0', alignItems: 'center' }}>
                    <LeftButton />
                    <RightButton />
                </div>
                <hr />
            </>
        );
    }

    return null;
};

export default CustomPaginator; 