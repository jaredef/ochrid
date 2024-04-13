import Link from 'next/link';
import { useRouter } from 'next/router';
import { format, subDays, addDays } from 'date-fns';
import { OrthoPraxHeader } from './orthoPrax';

const PaginatorTop = () => {
    const router = useRouter();

    // Extract the month and day from the router's pathname
    const pathParts = router.pathname.split('/');
    const monthFromPath = pathParts[1] ? pathParts[1] : '';
    const dayFromPath = pathParts[2] ? pathParts[2].replace(/\D/g, '') : '';

    // Check if the URL pathname is valid
    const isValidPathname = monthFromPath && dayFromPath;

    if (!isValidPathname) {
        // If URL pathname is invalid, return a link to today's date minus 13 days
        const currentDateMinus13Days = subDays(new Date(), 13);
        const monthForTodayMinus13 = format(currentDateMinus13Days, 'MMMM');
        const dayForTodayMinus13 = format(currentDateMinus13Days, 'do');

        // Format the date for display
        const formattedDateMinus13Days = `${monthForTodayMinus13.charAt(0).toUpperCase() + monthForTodayMinus13.slice(1)} ${format(currentDateMinus13Days, 'do')}`;

        return (
            <div id="paginator" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '1rem 0 2rem 0' }}>
                <Link style={{fontSize: '1rem'}} href={`/${monthForTodayMinus13.toLowerCase()}/${dayForTodayMinus13}`}>
                    ~ {formattedDateMinus13Days} ~
                </Link>
            </div>
        );
    }

    const LeftButton = () => {
        // Calculate previous date
        const handleLeftButtonClick = () => {
            if (monthFromPath && dayFromPath) {
                // Convert monthFromPath and dayFromPath into a new Date()
                const currentYear = new Date().getFullYear();
                const currentDate = new Date(`${monthFromPath} ${dayFromPath}, ${currentYear}`);

                // Calculate one day prior to the current date
                const previousDate = subDays(currentDate, 1);

                // Extract the month and day from the previous date
                const monthFromPreviousDate = format(previousDate, 'MMMM').toLowerCase();
                const dayFromPreviousDate = format(previousDate, 'do');

                // Construct the new pathname
                const newPathname = `/${monthFromPreviousDate}/${dayFromPreviousDate}`;
                router.push(newPathname);
            }
        };

        return (
            <Link href="#Blessed Father Seraphim of Platina, pray to God for us!" onClick={handleLeftButtonClick}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="nx-inline nx-h-5 nx-shrink-0 ltr:nx-rotate-180"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                {dayFromPath && monthFromPath ? `${format(subDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'MMMM').charAt(0).toUpperCase() + format(subDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'MMMM').slice(1)} ${format(subDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'do')}` : 'Yesterday'}
            </Link>
        );
    };

    const RightButton = () => {
        // Calculate next date
        const handleRightButtonClick = () => {
            if (monthFromPath && dayFromPath) {
                // Convert monthFromPath and dayFromPath into a new Date()
                const currentYear = new Date().getFullYear();
                const currentDate = new Date(`${monthFromPath} ${dayFromPath}, ${currentYear}`);

                // Calculate one day after the current date
                const nextDate = addDays(currentDate, 1);

                // Extract the month and day from the next date
                const monthFromNextDate = format(nextDate, 'MMMM').toLowerCase();
                const dayFromNextDate = format(nextDate, 'do');

                // Construct the new pathname
                const newPathname = `/${monthFromNextDate}/${dayFromNextDate}`;
                router.push(newPathname);
            }
        };

        return (
            <Link href="#Blessed Father Seraphim of Platina, pray to God for us!" onClick={handleRightButtonClick}>
                {dayFromPath && monthFromPath ? `${format(addDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'MMMM').charAt(0).toUpperCase() + format(addDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'MMMM').slice(1)} ${format(addDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'do')}` : 'Tomorrow'}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="nx-inline nx-h-5 nx-shrink-0 rtl:nx-rotate-180"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
        );
    };

    return (
        <div id="paginator" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <LeftButton />
            <OrthoPraxHeader />
            <RightButton />
        </div>
    );
};

const PaginatorBottom = () => {
    const router = useRouter();

    // Extract the month and day from the router's pathname
    const pathParts = router.pathname.split('/');
    const monthFromPath = pathParts[1] ? pathParts[1] : '';
    const dayFromPath = pathParts[2] ? pathParts[2].replace(/\D/g, '') : '';

    // Check if the URL pathname is valid
    const isValidPathname = monthFromPath && dayFromPath;

    if (!isValidPathname) {
        // If URL pathname is invalid, return a link to today's date minus 13 days
        const currentDateMinus13Days = subDays(new Date(), 13);
        const monthForTodayMinus13 = format(currentDateMinus13Days, 'MMMM');
        const dayForTodayMinus13 = format(currentDateMinus13Days, 'do');

        // Format the date for display
        const formattedDateMinus13Days = `${monthForTodayMinus13.charAt(0).toUpperCase() + monthForTodayMinus13.slice(1)} ${format(currentDateMinus13Days, 'do')}`;

        return ( null );
    }

    const LeftButton = () => {
        // Calculate previous date
        const handleLeftButtonClick = () => {
            if (monthFromPath && dayFromPath) {
                // Convert monthFromPath and dayFromPath into a new Date()
                const currentYear = new Date().getFullYear();
                const currentDate = new Date(`${monthFromPath} ${dayFromPath}, ${currentYear}`);

                // Calculate one day prior to the current date
                const previousDate = subDays(currentDate, 1);

                // Extract the month and day from the previous date
                const monthFromPreviousDate = format(previousDate, 'MMMM').toLowerCase();
                const dayFromPreviousDate = format(previousDate, 'do');

                // Construct the new pathname
                const newPathname = `/${monthFromPreviousDate}/${dayFromPreviousDate}`;
                router.push(newPathname);
            }
        };

        return (
            <Link href="#Blessed Father Seraphim of Platina, pray to God for us!" onClick={handleLeftButtonClick}>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="nx-inline nx-h-5 nx-shrink-0 ltr:nx-rotate-180"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                {dayFromPath && monthFromPath ? `${format(subDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'MMMM').charAt(0).toUpperCase() + format(subDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'MMMM').slice(1)} ${format(subDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'do')}` : 'Yesterday'}
            </Link>
        );
    };

    const RightButton = () => {
        // Calculate next date
        const handleRightButtonClick = () => {
            if (monthFromPath && dayFromPath) {
                // Convert monthFromPath and dayFromPath into a new Date()
                const currentYear = new Date().getFullYear();
                const currentDate = new Date(`${monthFromPath} ${dayFromPath}, ${currentYear}`);

                // Calculate one day after the current date
                const nextDate = addDays(currentDate, 1);

                // Extract the month and day from the next date
                const monthFromNextDate = format(nextDate, 'MMMM').toLowerCase();
                const dayFromNextDate = format(nextDate, 'do');

                // Construct the new pathname
                const newPathname = `/${monthFromNextDate}/${dayFromNextDate}`;
                router.push(newPathname);
            }
        };

        return (
            <Link href="#Blessed Father Seraphim of Platina, pray to God for us!" onClick={handleRightButtonClick}>
                {dayFromPath && monthFromPath ? `${format(addDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'MMMM').charAt(0).toUpperCase() + format(addDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'MMMM').slice(1)} ${format(addDays(new Date(`${monthFromPath} ${dayFromPath}`), 1), 'do')}` : 'Tomorrow'}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="nx-inline nx-h-5 nx-shrink-0 rtl:nx-rotate-180"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
        );
    };

    return (
        <>
        <hr />
        <div id="paginator" style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0 2rem 0' }}>
            <LeftButton />
            <RightButton />
        </div>
        <hr />
        </>
    );
};

export { PaginatorTop, PaginatorBottom };
