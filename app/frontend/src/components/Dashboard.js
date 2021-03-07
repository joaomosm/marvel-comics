import React from 'react';

import NavBar from './NavBar';
import ComicsGrid from './ComicsGrid';
import Footer from './Footer';
import Spinner from './Spinner';

const Dashboard = ({
  isLoading,
  handleChange,
  comics,
  metadata,
  favoriteComics,
  toggleFavorite,
  handlePreviousPage,
  handleNextPage,
  checkFavorite,
}) => (
  <>
    <NavBar onChange={handleChange} />
    <Spinner isLoading={isLoading} />
    {!isLoading && comics && (
      <ComicsGrid
        comics={comics}
        favoriteComics={favoriteComics}
        toggleFavorite={toggleFavorite}
        checkFavorite={checkFavorite}
      />
    )}
    {!isLoading && metadata && (
      <Footer
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        metadata={metadata}
      />
    )}
  </>
);

export default Dashboard;
