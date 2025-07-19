'use client'

import { usePathname } from 'next/navigation';
import Image from 'next/image';

const RunningHead = () => {
    const pathname = usePathname();

    // Extract the month from the pathname
    const pathSegments = pathname.split('/').filter(segment => segment);
    const monthFromPath = pathSegments[0] ? pathSegments[0].toUpperCase() : null;

    // Extract the day from the pathname and strip the suffix
    const dayFromPath = pathSegments[1] ? pathSegments[1].replace(/\D/g, '') : null;

    // Use the extracted month or default to the current month
    const month = monthFromPath || new Date().toLocaleString('default', { month: 'long' });

    return (
        <div className="running-head">
            <div className="running-decoration"> </div>
            <div className="running-head-date">{month} <Image className="four-dot" src="/four-dot.png" alt="" height={10} width={10} />{dayFromPath}</div>
            <div className="running-decoration"> </div>
        </div>
    )
}

export default RunningHead;