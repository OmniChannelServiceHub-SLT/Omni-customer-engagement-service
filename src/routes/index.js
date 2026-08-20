const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();
const APIs_DIR = path.join(__dirname, '..', 'APIs');

let mountedRouteFiles = 0;

if (fs.existsSync(APIs_DIR)) {
  for (const apiFolder of fs.readdirSync(APIs_DIR)) {
    // "_template" is documentation only and must never be mounted.
    if (apiFolder.startsWith('_')) continue;

    const routesDir = path.join(APIs_DIR, apiFolder, 'routes');
    if (!fs.existsSync(routesDir)) continue;

    for (const file of fs.readdirSync(routesDir)) {
      if (!file.endsWith('.js')) continue;

      const routeFile = path.join(routesDir, file);
      // eslint-disable-next-line global-require, import/no-dynamic-require
      router.use(require(routeFile));
      mountedRouteFiles += 1;
    }
  }
}

console.log(
  `[Engagement] mounted ${mountedRouteFiles} route file(s) from src/APIs/*/routes/*.js`
);

module.exports = router;
