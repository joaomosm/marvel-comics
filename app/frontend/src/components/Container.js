import React from 'react';

const Container = ({ comics }) => {
  const toggleFavorite = (comic) => console.log('toggle favorite', comic.id);

  const renderComic = (comic) => (
    <div key={comic.id} className='image-container'>
      <img src={`${comic.thumbnail.path}/portrait_xlarge.jpg`} alt='Avatar' className='image' />
      <div className='image-overlay'>
        <div className='image-svg' onClick={() => toggleFavorite(comic)} />
        <div className='image-text'>{comic.title}</div>
      </div>
    </div>
  );

  return (
    <div className='container'>
      <div className='grid-container'>{comics.map((comic) => renderComic(comic))}</div>
    </div>
  );
};

export default Container;
