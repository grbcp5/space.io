/**
 * Created by GrantBroadwater on 12/14/18.
 */

const socketIO = require( 'socket.io' );


module.exports.init = function ( server ) {
  "use strict";
  
  const io = socketIO( server );
  
  /* When connected to client */
  io.on( 'connection', function ( socket ) {
    "use strict";
    
    io.sockets.emit( 'console.log', 'Hello, world!' );
    
  } );
  
};