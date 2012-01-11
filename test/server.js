//
// Node.js server for Agility-Inject plugin unit tests
//

var express = require( 'express' );
var port = 8222;

var app = express.createServer();
app.use( express.bodyParser() );
app.use( app.router );
app.use( express.static( __dirname + '/public' ) );

app.listen( port );

console.log( 'Listening on port ' + port );