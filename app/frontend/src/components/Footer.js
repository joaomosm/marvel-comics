import React from 'react';

const Footer = ({ handleNextPage, handlePreviousPage, metadata }) => {
  const hasPrevious = Number(metadata.offset) !== 0;
  const hasNext = Number(metadata.offset) + Number(metadata.limit) <= Number(metadata.total);

  return (
    <div className='footer'>
      <button onClick={handlePreviousPage} disabled={!hasPrevious}>
        previous page
      </button>
      <button onClick={handleNextPage} disabled={!hasNext}>
        next page
      </button>
    </div>
  );
};

export default Footer;
