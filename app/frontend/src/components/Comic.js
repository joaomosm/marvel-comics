import React from 'react';

const Comic = ({ comic, toggleFavorite, checkFavorite }) => {
  const isFavorite = checkFavorite(comic.id);
  const cssClasses = isFavorite ? 'image-overlay favorite' : 'image-overlay';

  return (
    <div key={comic.id} className='image-container'>
      <img src={`${comic.thumbnail.path}/portrait_xlarge.jpg`} alt='Avatar' className='image' />
      <div className={cssClasses}>
        <div className='image-svg' onClick={() => toggleFavorite(comic)} />
        <div className='image-text'>{comic.title}</div>
      </div>
    </div>
  );
};

export default Comic;
