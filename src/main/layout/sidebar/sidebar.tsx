import React from 'react';
import './sidebar.css';

function Index() {
  const items = [
    { title: 'dashboad', url: '/dashboard', icon: '' },
    { title: 'history', url: '/history', icon: '' },
    { title: 'score board', url: '/scoreboard', icon: '' },
    { title: 'levels', url: '/dashboard', icon: '' }
  ];

  return (
    <div className='sidebar p-3'>
      <div>
        <h2>QUIZ APP</h2>
      </div>

      <div className='side-menu'>
        <h4>Menu</h4>
        <ul>
          {items.map((item: any) => (
            <li key={item.title}>{item.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Account</h4>
      </div>
    </div>
  );
}

export default Index;
