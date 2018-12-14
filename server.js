const express = require( 'express' );
const app = express();

const http = require( 'http' );
const server = http.Server( app );

const spaceioSocket = require( './space.io/server/socket' );

const PORT = 5000;

app.set( 'port', PORT );
app.use( express.static( __dirname + '/space.io/client/public' ) );

spaceioSocket.init( server );

// Starts the server.
server.listen( PORT, function () {
  console.log( 'Starting server on port 5000' );
} );