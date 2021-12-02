# TLI-bank

The TLI-blient is second part of the frontend of our program. It contains one major "Views" - the mock banking page, which simulates the bank customer's view. 

For demonstration purposes, the ID used is 1402110922112412 within the mock banking page, a valid tradeInCar input on the widget is 2018 Ford Focus.

## How to Run the Mock Banking Page
The mock banking page is designed to be hosted locally, as it's only intended to showcase the implementation of our widget within another program and the client webpage is not being hosted currently.
- Make sure you have [Node.js](https://nodejs.org/en/download/) and NPM installed
- In the main directory, run `npm install` (for Windows) or `sudo npm install` (for linux/mac). (If there is an error, try deleteing `package-lock.json` and `yarn.lock`)
- - run 'npm run build' to install watcher
- Run the `index.html` file under `/dist` in your browser.

## Running Tests
- Type `yarn test` into the console to run the test files.
