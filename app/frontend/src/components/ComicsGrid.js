import React from 'react';

import Comic from './Comic';

const ComicsGrid = ({ comics, favoriteComics, toggleFavorite, checkFavorite }) => (
  <div className='container'>
    <div className='grid-container'>
      {comics.map((comic, index) => (
        <Comic key={index} comic={comic} toggleFavorite={toggleFavorite} checkFavorite={checkFavorite}/>
      ))}
    </div>
  </div>
);

export default ComicsGrid;
