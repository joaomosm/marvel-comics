export const API_HOST = 'http://localhost:3000';

export const COMICS_PER_PAGE = 20

export const defaultParams = {
  limit: COMICS_PER_PAGE,
  offset: 0,
  order: '-focDate'
}

export const characterDefaultParams = {
  limit: COMICS_PER_PAGE,
  offset: 0,
  order: '-modified'
}