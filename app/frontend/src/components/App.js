import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './../assets/App.scss';
import NavBar from './NavBar';
import Container from './Container';
import Footer from './Footer';
import { API_HOST, COMICS_PER_PAGE, defaultParams } from './../config';

const App = () => {
  const [comics, setComics] = useState(null);
  const [params, setParams] = useState(defaultParams);

  const handleNextPage = () => setParams({ ...params, offset: params.offset + COMICS_PER_PAGE });
  const handlePreviousPage = () =>
    setParams({ ...params, offset: Math.max(params.offset - COMICS_PER_PAGE, 0) });

  useEffect(() => {
    axios({
      method: 'get',
      url: API_HOST + '/comics',
      params,
    }).then((response) => {
      setComics(response.data.comics);
    });
  }, [params]);

  return (
    <div className='timely'>
      <NavBar />
      {comics && <Container comics={comics} />}
      <Footer handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />)
    </div>
  );
};

export default App;
