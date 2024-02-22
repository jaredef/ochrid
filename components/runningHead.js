
import { useRouter } from 'next/router';
import Image from 'next/image';

const RunningHead = () => {
    const router = useRouter();

    // Extract the month from the router's pathname
    const monthFromPath = router.pathname.split('/')[1].toUpperCase();

    // Extract the day from the router's pathname and strip the suffix
    const dayFromPath = router.pathname.split('/')[2].replace(/\D/g, '');

    // Use the extracted month or default to the current month
    const month = monthFromPath || new Date().toLocaleString('default', { month: 'long' });

    return (
        <div className="running-head">
            <div className="running-decoration"> </div>
            <div className="running-head-date">{month} <Image className="four-dot" src="/four-dot.png" height={10} width={10} alt="Four dot" />{dayFromPath}</div>
            <div className="running-decoration"> </div>
        </div>
    )
}

export default RunningHead; 
