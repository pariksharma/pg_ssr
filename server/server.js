import path from 'path';
import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { store } from '../src/store/store';
import App from '../src/App';

const PORT = 6080;
const app = express();

// Middleware to handle server-side rendering for all routes
const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.html file', err);
      return res.status(500).send('An error occurred');
    }

    const context = {};
    const appHtml = ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const html = data.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    if (context.url) {
      // Handle redirects
      res.redirect(301, context.url);
    } else {
      // Send the rendered page
      res.send(html);
    }
  });
};

// Serve static files from the build directory
app.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
);

// Use the server renderer for all other routes
app.get('*', serverRenderer);

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
