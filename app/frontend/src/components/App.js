import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { useCookies } from 'react-cookie';
import moment from 'moment';

import './../assets/App.scss';
import Dashboard from './Dashboard';
import {
  API_HOST,
  COMICS_PER_PAGE,
  SESSION_COOKIE_NAME,
  defaultParams,
  characterDefaultParams,
} from './../config';
import { camelize } from './../utils';
import CookieStatement from './CookieStatement';

const App = () => {
  // --- initializers
  const [isLoading, setIsLoading] = useState(false);
  const [comics, setComics] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [params, setParams] = useState(defaultParams);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [cookies, setCookie, _removeCookie] = useCookies([SESSION_COOKIE_NAME]);
  const [error, setError] = useState(null);

  // --- fetch data ---
  const fetchComics = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: API_HOST + '/comics',
      params,
    })
      .then((response) => {
        setComics(response.data.comics);
        setMetadata(response.data.metadata);
        setIsLoading(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const fetchFavoriteComics = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: API_HOST + '/favorite_comics',
    })
      .then((response) => {
        setFavoriteComics(camelize(response.data));
        setIsLoading(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  const fetchByCharacter = () => {
    setIsLoading(true);
    axios({
      method: 'get',
      url: API_HOST + '/comics/get_by_character',
      params,
    })
      .then((response) => {
        setComics(response.data.comics);
        setMetadata(response.data.metadata);
        setIsLoading(false);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  // --- hooks ---
  useEffect(() => {
    !!params.name ? fetchByCharacter() : fetchComics();
  }, [params]);

  useEffect(() => {
    fetchFavoriteComics();
  }, []);

  const debounceQuery = useCallback(
    debounce((text) => {
      if (!!text) {
        setParams({ ...characterDefaultParams, name: text });
      } else {
        setParams(defaultParams);
      }
    }, 1000),
    [],
  );

  const handleChange = ({ target: { value } }) => {
    debounceQuery(value);
  };

  // --- favorites ---
  const filterFavorites = (favoriteComics) => (comicId) =>
    favoriteComics.filter((fc) => Number(fc) === Number(comicId)).length;
  const checkFavorite = filterFavorites(favoriteComics);

  const toggleFavorite = (comic) =>
    checkFavorite(comic.id) ? removeFavorite(comic) : addFavorite(comic);

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

  // --- error ---
  const handleError = (error) => {
    if (error.response.data === 'Rate Limit Exceeded') {
      setError('rate_limit');
    }
  };

  // --- cookie ---
  const acceptCookie = () =>
    setCookie(SESSION_COOKIE_NAME, true, { expires: moment().add(30, 'minutes').toDate() });

  if(cookies[SESSION_COOKIE_NAME] !== 'true') {
    return <CookieStatement acceptCookie={acceptCookie} cookies={cookies}/>
  }

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
      error={error}
    />
  );
};



export default App;
