import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import './../assets/App.scss';
import Dashboard from './Dashboard';
import { API_HOST, COMICS_PER_PAGE, defaultParams, characterDefaultParams } from './../config';
import { camelize } from './../utils';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comics, setComics] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [params, setParams] = useState(defaultParams);
  const [favoriteComics, setFavoriteComics] = useState([]);

  // --- fetch data ---
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

  // --- hooks ---
  useEffect(() => {
    fetchComics();
  }, [params]);

  useEffect(() => {
    fetchFavoriteComics();
  }, []);

  const debounceQuery = useCallback(
    debounce((text) => fetchByCharacter(text), 1000),
    [],
  );

  const handleChange = ({ target: { value } }) => {
    debounceQuery(value);
  };

  // --- favorites ---
  const filterFavorites = (favoriteComics) => (comicId) =>
    favoriteComics.filter((fc) => Number(fc) === Number(comicId)).length;
  const checkFavorite = filterFavorites(favoriteComics);

  const toggleFavorite = (comic) => {
    if (checkFavorite(comic.id)) {
      removeFavorite(comic);
    } else {
      addFavorite(comic);
    }
  };

  const addFavorite = ({ id, title }) => {
    axios({
      method: 'post',
      url: API_HOST + '/favorite_comics/add_favorite',
      params: { comic_id: id, title },
    }).then((response) => {
      fetchFavoriteComics();
    });
  };

  const removeFavorite = ({ id }) => {
    axios({
      method: 'post',
      url: API_HOST + '/favorite_comics/remove_favorite',
      params: { comic_id: id },
    }).then((response) => {
      fetchFavoriteComics();
    });
  };

  // --- pagination ---
  const handleNextPage = () => setParams({ ...params, offset: params.offset + COMICS_PER_PAGE });

  const handlePreviousPage = () =>
    setParams({ ...params, offset: Math.max(params.offset - COMICS_PER_PAGE, 0) });

  return (
    <Dashboard
      isLoading={isLoading}
      handleChange={handleChange}
      comics={comics}
      metadata={metadata}
      favoriteComics={favoriteComics}
      toggleFavorite={toggleFavorite}
      handlePreviousPage={handlePreviousPage}
      handleNextPage={handleNextPage}
      checkFavorite={checkFavorite}
    />
  );
};

export default App;
