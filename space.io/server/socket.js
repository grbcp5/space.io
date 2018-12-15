/**
 * Created by GrantBroadwater on 12/14/18.
 */

const socketIO = require( 'socket.io' );

const eventType = {
  connection: 'connection',
  yourSocketId: 'yourSocketId',
  alert: 'alert',
  consoleLog: 'consoleLog',
  newPlayer: 'newPlayer',
  updatePlayerDirection: 'updatePlayerDirection',
  newGameFrame: 'newGameFrame'
};


let gameState = {
  gameFrameCount: 0,
  players: {}
};


module.exports.init = function ( server ) {
  "use strict";
  
  const io = socketIO( server );
  
  /* When connected to client */
  io.on( eventType.connection, function ( socket ) {
    "use strict";
    
    /* When new player event is received */
    socket.on( eventType.newPlayer, function ( data ) {
      gameState.players[ socket.id ] = data;
      gameState.players[ socket.id ].pos.x = 300;
      gameState.players[ socket.id ].pos.y = 300;
      gameState.players[ socket.id ].direction = 90;
  
      socket.emit( eventType.yourSocketId, socket.id );
    } );
    
    
    /* When movement event is received */
    socket.on( eventType.updatePlayerDirection, function ( data ) {
      
      let player = gameState.players[ socket.id ];
      
      if( !player ) {
        console.error( "Unrecognized player" );
        return;
      }
      
      player.direction = data;
      
    } );
    
  } );
  
  
  setInterval( function () {

    gameState.gameFrameCount += 1;

    for ( let playerId in gameState.players ) {

      if( !gameState.players.hasOwnProperty( playerId) ) {
        continue;
      }

      // if ( gameState.players[ playerId ].direction === 0 ) {
      //   gameState.players[ playerId ].pos.x += 1;
      // }
      // if ( gameState.players[ playerId ].direction === 90 ) {
      //   gameState.players[ playerId ].pos.y += 1;
      // }
      // if ( gameState.players[ playerId ].direction === 180 ) {
      //   gameState.players[ playerId ].pos.x -= 1;
      // }
      // if ( gameState.players[ playerId ].direction === 270 ) {
      //   gameState.players[ playerId ].pos.y -= 1;
      // }
    }

    io.sockets.emit( eventType.newGameFrame, gameState );

  }, 1000 / 30 );
};