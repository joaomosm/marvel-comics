# marvel-comics

## Introduction
This is a simple dashboard to search for Marvel Comics through the official Marvel API. Comics are requested and then presented on the homepage in batches of 20. They are ordered according to the `focDate` parameter in descending order. Pagination will request a new batch of comics. The ability to fetch for comics of one specific Marvel character is also a feature. The user is able to mark comics as favorites.

## Getting started
#### ENV file
 - create a new `.env` file on the root folder
 - add Marvel API Public Key to `MARVEL_API_PUBLIC_KEY` variable
 - add Marvel API Private Key to `MARVEL_API_PRIVATE_KEY` variable
 - save the file

#### Rails Server
 - go to the root folder: `cd <rootFolder>`
 - install ruby dependencies: `bundle install`
 - prepare the database: `rake db:create db:migrate`
 - start the server: `rails server`
 
#### React App
 - go to the frontend folder: `cd <rootFolder>/app/frontend/`
 - install js dependencies: `yarn install`
 - start the server: `yarn start`

After all these steps, everything should be up and running. The root URL is `localhost:3001`.

## Dependencies
#### Rails
 - [pg](https://github.com/ged/ruby-pg) - Ruby interface to the PostgreSQL RDBMS
 - [rack-cors](https://github.com/cyu/rack-cors) - Middleware which provides support for Cross-Origin Resource Sharing (CORS) for Rack compatible web applications
 - [rack-throttle](https://github.com/dryruby/rack-throttle) - Rack middleware that provides logic for rate-limiting incoming HTTP requests to Rack applications
 - [dotenv-rails](https://github.com/bkeepers/dotenv) - Environment variables loader in development
 - [rspec-rails](https://github.com/rspec/rspec-rails) - Alternative Testing Framework to Ruby on Rails
 - [factory_bot](https://github.com/thoughtbot/factory_bot) - A fixtures replacement with a straightforward definition syntax and support for multiple build strategies
 - [faker](https://github.com/faker-ruby/faker) - Fake data generator.

#### React/JS
  - [react-testing-library](https://github.com/testing-library/react-testing-library) - Built on top of DOM Testing Library, contains light utility functions and utilities for testing purposes
  - [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
  - [lodash](https://github.com/lodash/lodash) - Javascript utility library
  - [moment](https://github.com/moment/moment/) - JavaScript date library for parsing, validating, manipulating, and formatting dates
  - [node-sass](https://github.com/sass/node-sass) - Library that provides binding for Node.js to LibSass
  - [react-cookie](https://github.com/reactivestack/cookies/tree/master/packages/react-cookie) - Universal cookies for React
  - [prettier](https://github.com/prettier/prettier) - Opinionated code formatter which enforces a consistent coding style

## Testing
#### Rails
To run Rspec tests, just type `rspec spec` on the root folder.

#### React
To run JS tests, just go to `app/frontend` folder and the type `yarn test a`.
