import React from 'react';

const CookieStatement = ({ acceptCookie }) => (
  <div className='cookie-statement' data-testid='cookie-statement'>
    <div className='cookie-statement-text'>
      Are you ready to take a <i>Great Power</i>? It comes with <i>Great Responsibility</i>!
      <button className='cookie-statement-button' onClick={acceptCookie}>
        Accept
      </button>
    </div>
  </div>
);

export default CookieStatement;
