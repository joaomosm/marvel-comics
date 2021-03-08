import React from 'react';

import NavBar from './NavBar';
import ComicsGrid from './ComicsGrid';
import Footer from './Footer';
import Spinner from './Spinner';
import AlertMessage from './AlertMessage';

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
  error,
}) => (
  <div data-testid='dashboard'>
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
    <AlertMessage error={error} />
  </div>
);

export default Dashboard;
