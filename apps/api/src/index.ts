import { join } from 'path';

import cors from 'cors';
import express from 'express';

import { Widget } from 'common/types/widgets';

const WIDGETS: Widget[] = [{
  id: 100,
  name: 'Widget One',
  price: '1.00',
}, {
  id: 101,
  name: 'Widget Two',
  price: '1.00',
}, {
  id: 102,
  name: 'Widget Three',
  price: '1.00',
}];

const app = express();

// This must always run on this port to satsify GAE.
const port = 8080;

// This app runs in a subdirectory, and must be configured to listed at that directory.
const SUBDIRECTORY = 'api';

// Allow other apps to access this API.
// NOTE: This should be MUCH more restrictive based on your application's needs.
app.use(cors());

app.get(join('/', SUBDIRECTORY, 'widgets'), (_, response) => {
  response.json({
    data: WIDGETS,
    message: 'Data from API! Deployed with script!',
  });
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
