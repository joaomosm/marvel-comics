import React from 'react';

import logo from './../assets/captain.svg';

const Spinner = ({ isLoading }) => isLoading && (
  <div className='loading-container'>
    <img className='loading-spinner' src={logo} alt='loading spinner' />
  </div>
);

export default Spinner;
