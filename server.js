/* eslint no-console:0 */
'use strict';

const app = require('./app');
const port = 3001;

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});