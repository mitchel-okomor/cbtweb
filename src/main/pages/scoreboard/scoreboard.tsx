import React, { useEffect } from 'react';
import './scoreboard.css';

const Index: React.FC = () => {
  console.log('Scoreboard');

  // State cleanup
  useEffect(() => {
    document.title = 'Scoreboard';
  }, []);

  return <div className='container'>scoreboard</div>;
};

export default Index;
