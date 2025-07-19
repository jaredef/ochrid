'use client';

import Image from 'next/image';

const Purchase = () => {
    return (
        <div className="purchase-container">
            <div className="purchase-content">
                <h1 className="purchase-title">
                    <a 
                        rel="noopener noreferrer" 
                        target="_blank" 
                        href="https://sebastianpress.org/the-prologue-of-ohrid-lives-of-saints-hymns-reflections-and-homilies-for-every-day-of-the-year/"
                        className="purchase-link"
                    >
                        Purchase the latest edition of The Prologue of Ohrid
                    </a>
                </h1>
                
                <div className="purchase-image-container">
                    <a 
                        rel="noopener noreferrer" 
                        target="_blank" 
                        href="https://sebastianpress.org/the-prologue-of-ohrid-lives-of-saints-hymns-reflections-and-homilies-for-every-day-of-the-year/"
                        className="purchase-image-link"
                    >
                        <Image 
                            src={'/purchase-prologue.png'} 
                            height={400} 
                            width={400} 
                            alt="Purchase the Prologue of Ohrid from Sebastian Press."
                            className="purchase-image"
                        />
                        <div className="purchase-overlay">
                            <span className="purchase-cta">View Details</span>
                        </div>
                    </a>
                </div>
                
                <h2 className="purchase-subtitle">Complete, Amplified, Revised, and Expanded</h2>
            </div>

            <style jsx>{`
                .purchase-container {
                    margin: 4rem auto 2rem auto;
                    max-width: 500px;
                    width: 100%;
                    padding: 0 1rem;
                }

                .purchase-content {
                    background: var(--nx-bg-primary);
                    border: 1px solid var(--nx-colors-border-primary);
                    border-radius: 16px;
                    padding: 2rem;
                    text-align: center;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    transition: all 0.3s ease;
                }

                .purchase-content:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }

                .purchase-title {
                    margin: 0 0 1.5rem 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                    line-height: 1.4;
                }

                .purchase-link {
                    color: var(--nx-colors-primary-600);
                    text-decoration: none;
                    transition: color 0.2s ease;
                }

                .purchase-link:hover {
                    color: var(--nx-colors-primary-700);
                    text-decoration: underline;
                }

                .purchase-image-container {
                    position: relative;
                    margin: 1.5rem 0;
                    border-radius: 12px;
                    overflow: hidden;
                }

                .purchase-image-link {
                    display: block;
                    position: relative;
                    text-decoration: none;
                }

                .purchase-image {
                    display: block;
                    width: 100%;
                    height: auto;
                    transition: transform 0.3s ease;
                }

                .purchase-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(157, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .purchase-cta {
                    color: white;
                    font-weight: 600;
                    font-size: 1.1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .purchase-image-link:hover .purchase-overlay {
                    opacity: 1;
                }

                .purchase-image-link:hover .purchase-image {
                    transform: scale(1.02);
                }

                .purchase-subtitle {
                    margin: 1.5rem 0 0 0;
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: var(--nx-colors-gray-600);
                    font-style: italic;
                }

                /* Dark mode adjustments */
                html[class~="dark"] .purchase-content {
                    background: var(--nx-colors-gray-900);
                    border-color: var(--nx-colors-gray-700);
                }

                html[class~="dark"] .purchase-subtitle {
                    color: var(--nx-colors-gray-400);
                }

                /* Responsive design */
                @media (max-width: 768px) {
                    .purchase-container {
                        margin: 3rem auto 1.5rem auto;
                        padding: 0 0.5rem;
                    }

                    .purchase-content {
                        padding: 1.5rem;
                        border-radius: 12px;
                    }

                    .purchase-title {
                        font-size: 1.3rem;
                        margin-bottom: 1rem;
                    }

                    .purchase-subtitle {
                        font-size: 1rem;
                        margin-top: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .purchase-container {
                        margin: 2rem auto 1rem auto;
                    }

                    .purchase-content {
                        padding: 1rem;
                    }

                    .purchase-title {
                        font-size: 1.2rem;
                    }

                    .purchase-cta {
                        font-size: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Purchase;