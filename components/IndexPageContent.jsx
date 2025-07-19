'use client';

import { useState } from 'react';
import DynamicMDXContent from './DynamicMDXContent';
import IndexCalendar from './IndexCalendar';
import ProloguePlayer from './ProloguePlayer';

const IndexPageContent = () => {
  const [currentRoute, setCurrentRoute] = useState(null);
  
  return (
    <>
    <div style={{maxWidth: '500px', margin: '0 auto'}}>
      <IndexCalendar />
      <ProloguePlayer overrideRoute={currentRoute} />
    </div>
      <DynamicMDXContent onRouteChange={setCurrentRoute} />
    </>
  );
};

export default IndexPageContent; 