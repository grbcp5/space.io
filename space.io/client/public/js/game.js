/**
 * Created by GrantBroadwater on 12/14/18.
 */

const socket = io();

const eventType = {
  connection: 'connection',
  yourSocketId: 'yourSocketId',
  alert: 'alert',
  consoleLog: 'consoleLog',
  newPlayer: 'newPlayer',
  updatePlayerDirection: 'updatePlayerDirection',
  newGameFrame: 'newGameFrame'
};

let canvas = document.getElementById( 'canvas' );
canvas.width = 600;
canvas.height = 600;

let socketId = "";
let player = {
  displayName: "",
  pos: {
    x: -1,
    y: -1
  },
  direction: Math.PI / 2
};
let newPlayerDirection = Math.PI / 2;

socket.on( eventType.alert, function ( data ) {
  "use strict";
  
  alert( data );
  
} );

socket.on( eventType.consoleLog, function ( data ) {
  "use strict";
  
  console.log( data );
  
} );

socket.on( eventType.yourSocketId, function ( data ) {
  socketId = data;
} );

player.name = prompt( "Enter a user name" );
socket.emit( eventType.newPlayer, player );


document.addEventListener( 'keydown', function ( event ) {
  
  switch ( event.keyCode ) {
    case 65: // A
      newPlayerDirection = Math.PI;
      break;
    case 87: // W
      newPlayerDirection = Math.PI / 2;
      break;
    case 68: // D
      newPlayerDirection = 0;
      break;
    case 83: // S
      newPlayerDirection = 3 * Math.PI / 2;
      break;
  }
} );


function getMousePos( canvas, evt ) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener( 'mousemove', function ( evt ) {
  let mousePos = getMousePos( canvas, evt );
  
  newPlayerDirection = Math.atan( ( mousePos.y - player.pos.y ) / ( mousePos.x - player.pos.x ) );
  if( mousePos.x < player.pos.x ) {
    newPlayerDirection += Math.PI;
  }
} );

function draw() {
  
  if ( !canvas.getContext ) {
    return;
  }
  
  let ctx = canvas.getContext( '2d' );
  
  ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );
  drawPlayer( ctx );
}


function drawPlayer( ctx ) {
  
  ctx.beginPath();
  ctx.moveTo( player.pos.x, player.pos.y );
  ctx.lineTo(
    player.pos.x + Math.round( -20 * Math.cos( player.direction ) ),
    player.pos.y + Math.round( -20 * Math.sin( player.direction ) )
  );
  ctx.stroke();
}


socket.on( eventType.newGameFrame, function ( data ) {
  
  if ( !socketId ) {
    return
  }
  
  let me = data.players[ socketId ];
  if ( !me ) {
    console.error( "This socket is not a player" );
    return
  }
  
  player = me;
  
  setTimeout( function () {
    draw();
  }, 1 );
  
  socket.emit( eventType.updatePlayerDirection, newPlayerDirection );
  
} );
