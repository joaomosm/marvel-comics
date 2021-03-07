import React from 'react';

const AlertMessage = ({ error }) =>
  error === 'rate_limit' && <div className='error'>Rate Limit Exceeded</div>;

export default AlertMessage;
