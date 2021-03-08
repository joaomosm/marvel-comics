import React from 'react';
import { render } from '@testing-library/react';

import AlertMessage from './../components/AlertMessage';

const renderComponent = (error = null) => render(<AlertMessage error={error}/>);

it('matches snapshot', () => {
  const { container } = renderComponent();
  expect(container).toMatchSnapshot();
});

it('renders rate limit error message', () => {
  const { getByTestId } = renderComponent('rate_limit');
  expect(getByTestId('error-message')).toBeVisible();
});

it('renders no error message', () => {
  const { queryAllByTestId } = renderComponent();
  expect(queryAllByTestId('error-message').length).toBe(0);
});