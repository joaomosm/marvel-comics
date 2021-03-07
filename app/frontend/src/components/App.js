import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import './../assets/App.scss';
import logo from './../assets/captain.svg';
import NavBar from './NavBar';
import Container from './Container';
import Footer from './Footer';
import { API_HOST, COMICS_PER_PAGE, defaultParams, characterDefaultParams } from './../config';
import { camelize } from './../utils';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comics, setComics] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [params, setParams] = useState(defaultParams);
  const [favoriteComics, setFavoriteComics] = useState([88403]);

  const handleNextPage = () => setParams({ ...params, offset: params.offset + COMICS_PER_PAGE });
  const handlePreviousPage = () =>
    setParams({ ...params, offset: Math.max(params.offset - COMICS_PER_PAGE, 0) });

  const fetchComics = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: API_HOST + '/comics',
      params,
    }).then((response) => {
      setComics(response.data.comics);
      setMetadata(response.data.metadata);
      setIsLoading(false);
    });
  };
  const fetchFavoriteComics = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: API_HOST + '/favorite_comics',
    }).then((response) => {
      setFavoriteComics(camelize(response.data));
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchComics();
  }, [params]);

  useEffect(() => {
    fetchFavoriteComics();
  }, []);

  const renderLoading = () => {
    return (
      <div className='loading-container'>
        <img className='loading-spinner' src={logo} alt='loading spinner' />
      </div>
    );
  };

  const debounceQuery = useCallback(
    debounce((text) => fetchByCharacter(text), 1000),
    [],
  );

  const handleChange = ({ target: { value } }) => {
    debounceQuery(value);
  };

  const fetchByCharacter = (queryString) => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: API_HOST + '/comics/get_by_character',
      params: { ...characterDefaultParams, name: queryString },
    }).then((response) => {
      setComics(response.data.comics);
      setMetadata(response.data.metadata);
      setIsLoading(false);
    });
  };

  const addFavorite = ({ id, title }) => {
    axios({
      method: 'post',
      url: API_HOST + '/favorite_comics/add_favorite',
      params: { comic_id: id, title },
    }).then((response) => {
      console.log('new favorite added');
      fetchFavoriteComics();
    });
  };

  const removeFavorite = ({ id }) => {
    axios({
      method: 'post',
      url: API_HOST + '/favorite_comics/remove_favorite',
      params: { comic_id: id },
    }).then((response) => {
      console.log('new favorite removed');
      fetchFavoriteComics();
    });
  };

  const toggleFavorite = (comic) => {
    if (
      favoriteComics.filter((favoriteComic) => Number(favoriteComic.comicId) === Number(comic.id))
        .length
    ) {
      removeFavorite(comic);
    } else {
      addFavorite(comic);
    }
  };

  return (
    <div className='timely'>
      <NavBar onChange={handleChange} />
      {isLoading && renderLoading()}
      {!isLoading && comics && (
        <Container
          comics={comics}
          favoriteComics={favoriteComics}
          toggleFavorite={toggleFavorite}
        />
      )}
      {!isLoading && metadata && (
        <Footer
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          metadata={metadata}
        />
      )}
    </div>
  );
};

export default App;
