/**
 * Created by GrantBroadwater on 12/14/18.
 */

const socket = io();


socket.on( 'alert', function ( data ) {
  "use strict";
  
  alert( data );
  
} );


socket.on( 'console.log', function( data ) {
  "use strict";
  
  console.log( data );
  
} );