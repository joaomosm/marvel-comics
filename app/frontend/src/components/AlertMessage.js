import React from 'react';

const AlertMessage = ({ error }) =>
  error === 'rate_limit' && <div className='error' data-testid='error-message'>Rate Limit Exceeded</div>;

export default AlertMessage;
