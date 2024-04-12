import Image from 'next/image';
import { useEffect, useState } from 'react';

const OrthoPrax = () => {
    const [platform, setPlatform] = useState('');

    useEffect(() => {
        // Function to detect the platform
        const detectPlatform = () => {
            const userAgent = window.navigator.platform.toLowerCase(); /* Deprecated but who cares? */
            if (userAgent.includes('mac') || userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) {
                setPlatform('ios');
            } else if (userAgent.includes('win')) {
                setPlatform('windows'); /* No app for Windows (Do those even exist anymore? */
            } else {
                setPlatform('android'); // Defaulting to Android for other platforms
            }
        };

        detectPlatform();
    }, []);

    // Function to generate the appropriate store link
    const getAppStoreLink = () => {
        switch (platform) {
            case 'android':
                return 'https://play.google.com/store/apps/details?id=com.icxclife.orthoprax&hl=en_US&gl=US';
            case 'ios':
                return 'https://apps.apple.com/us/app/orthoprax/id1078949915';
            case 'windows':
                return 'https://play.google.com/store/apps/details?id=com.icxclife.orthoprax&hl=en_US&gl=US'; /* Default to Android, I guess */
            default:
                return 'https://play.google.com/store/apps/details?id=com.icxclife.orthoprax&hl=en_US&gl=US'; // tough call
        }
    };

    return (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <p>
                <a href={getAppStoreLink()} target="_blank" rel="noopener noreferrer">
                    <Image src={'/orthoprax.jpeg'} height={50} width={50} alt="OrthoPrax by St. Sebastian Orthodox Press" style={{ borderRadius: '.5rem' }} />
                </a>
            </p>
            <p style={{ color: 'lightgray', maxWidth: '16rem', fontSize: '.8rem', marginTop: '.4rem' }}>OrthoPrax® is the ultimate modern Christian resource—a combined Church calendar, prayer book, and collection of readings—designed to help you explore your faith and enjoy the liturgical cycle of the Church.</p>
        </div>
    );
};

export default OrthoPrax;