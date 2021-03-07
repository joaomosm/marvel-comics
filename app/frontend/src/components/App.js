import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

import './../assets/App.scss';
import logo from './../assets/captain.svg';
import NavBar from './NavBar';
import Container from './Container';
import Footer from './Footer';
import { API_HOST, COMICS_PER_PAGE, defaultParams, characterDefaultParams } from './../config';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comics, setComics] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [params, setParams] = useState(defaultParams);

  const handleNextPage = () => setParams({ ...params, offset: params.offset + COMICS_PER_PAGE });
  const handlePreviousPage = () =>
    setParams({ ...params, offset: Math.max(params.offset - COMICS_PER_PAGE, 0) });

  useEffect(() => {
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
  }, [params]);

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

  return (
    <div className='timely'>
      <NavBar onChange={handleChange} />
      {isLoading && renderLoading()}
      {!isLoading && comics && <Container comics={comics} />}
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
