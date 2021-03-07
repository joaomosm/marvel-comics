import React from 'react';

const Container = ({ comics, favoriteComics, toggleFavorite }) => {
  const isFavorite = (comicId) =>
    favoriteComics.filter((favoriteComic) => Number(favoriteComic.comicId) === Number(comicId))
      .length;

  const renderComic = (comic) => (
    <div key={comic.id} className='image-container'>
      <img src={`${comic.thumbnail.path}/portrait_xlarge.jpg`} alt='Avatar' className='image' />
      <div className={`${isFavorite(comic.id) ? 'image-overlay favorite' : 'image-overlay'}`}>
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
