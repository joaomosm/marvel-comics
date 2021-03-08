import React from 'react';
import { render } from '@testing-library/react';
import { Cookies } from 'react-cookie'

import App from './../components/App';
import { SESSION_COOKIE_NAME } from './../config';

const renderComponent = () => render(<App />);

it('matches snapshot', () => {
  const { container } = renderComponent();
  expect(container).toMatchSnapshot();
});

describe('when cookie does not exist', () => {
  it('renders CookieStatement component', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('cookie-statement')).toBeVisible();
  });
});

describe('when cookie exists exist', () => {
  beforeEach(() => {
    const cookies = new Cookies();
    cookies.set(SESSION_COOKIE_NAME, 'true');
  })

  it('renders Dashboard component', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('dashboard')).toBeVisible();
  });
});
