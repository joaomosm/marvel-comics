import React from 'react';
import { render } from '@testing-library/react';

import Comic from './../components/Comic';

const defaultComic = {
  id: 1,
  title: 'le title',
  thumbnail: {
    path: ''
  }
}

const renderComponent = () =>
  render(<Comic comic={defaultComic} toggleFavorite={jest.fn()} checkFavorite={jest.fn()} />);

it('matches snapshot', () => {
  const { container } = renderComponent();
  expect(container).toMatchSnapshot();
});

it('renders Comic component', () => {
  const { getByTestId } = renderComponent();
  expect(getByTestId('comic')).toBeVisible();
});

it('renders comic title', () => {
  const { getByTestId } = renderComponent();
  const element = getByTestId('comic-title')
  expect(element).toBeVisible();
  expect(element['innerHTML']).toBe(defaultComic.title)
});

it('renders comic thumbnail', () => {
  const { getByTestId } = renderComponent();
  const element = getByTestId('comic-thumbnail')
  expect(element).toBeVisible();
});

