import Image from 'next/image';

const Purchase = () => {
    return (
        <div style={{margin: 'auto', maxWidth: '16rem'}}>
            <h1><a rel="noopener noreferrer" target="_blank" href="https://sebastianpress.org/the-prologue-of-ohrid-lives-of-saints-hymns-reflections-and-homilies-for-every-day-of-the-year/">Purchase the latest edition of the Prologue of Ohrid</a></h1>
            <a rel="noopener noreferrer" target="_blank" href="https://sebastianpress.org/the-prologue-of-ohrid-lives-of-saints-hymns-reflections-and-homilies-for-every-day-of-the-year/"><Image src={'/purchase-prologue.jpeg'} height={400} width={400} /></a>
            <h2>Complete, Amplified, Revised, and Expanded</h2>
        </div>
    )
}

export default Purchase;