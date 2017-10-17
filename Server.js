var express = require('express'),
    http = require('http'), 
    request = require('request'),
    bodyParser = require('body-parser'),
    app = express();
	
var https = require('https');
var fs = require('fs');
 
	
var logFmt = require("logfmt");

app.use(express.static(__dirname + '/client')); 

app.use(bodyParser.json());  

app.set('port', process.env.PORT || 8080);

/*Allow CORS*/
app.use(function(req, res, next) {
	 
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization,X-Authorization'); 
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Expose-Headers', 'X-Api-Version, X-Request-Id, X-Response-Time');
	res.setHeader('Access-Control-Max-Age', '1000');
	  
	next();
});



app.all('/proxy',  function(req, res, next) { 
    
    var url = req.header('SalesforceProxy-Endpoint');  
    request({ url: url, method: req.method, json: req.body, 
                    headers: {'Authorization': req.header('X-Authorization'), 'Content-Type' : 'application/json'}, body:req.body }).pipe(res);    
    
});
 
app.get('/' ,  function(req,res,next) {
    res.sendfile('views/index.html');
} ); 

app.get('/index*' ,  function(req,res,next) {
    res.sendfile('views/index.html');
} );  
 
app.get('/oauthcallback.html' ,  function(req,res,next) {
    res.sendfile('views/oauthcallback.html');
} ); 

app.get('/Main*' ,   function(req,res,next) {
    res.sendfile('views/Main.html');
} );

app.get('/getToken*' ,   function(req,res,next) {
	
	var response = 'raté';
	
	var postData = querystring.stringify({
		'grant_type':'password',
		'client_id':'3MVG9HxRZv05HarR6hEBmResOSDNQ8hxeeVCWsFd8VSq4CN.HOyNwSj.mx5aFxT4l4viX.gplw1dR1EQ8TCgi',
		'client_secret':'8382827325637032585',
		'username':'test-heroku@trailhead.com',
		'password':'testheroku2017XI4oaVedcpPXRKfV9d4o3B1xl'
	});

	var salesForceOptions = {
		hostname: 'login.salesforce.com',
		port: 443,
		path: '/services/oauth2/token',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(postData)
		}
	};

	/*var salesForceReq = https.request(salesForceOptions, (salesForceRes) => {
		console.log('STATUS: ${salesForceRes.statusCode}');
		console.log('HEADERS: ${JSON.stringify(salesForceRes.headers)}');
		salesForceRes.setEncoding('utf8');
		salesForceRes.on('data', (chunk) => {
			console.log('BODY: ${chunk}');
			response = chunk;
		});
		salesForceRes.on('end', () => {
			console.log('No more data in response.');
		});
		});

	/*salesForceReq.on('error', (e) => {
		console.error('problem with request: ${e.message}');
	});

	// write data to request body
	/*salesForceReq.write(postData);
	/*salesForceReq.end();*/
	
    res.send(response);
} );
 

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

	var options = {
      key: fs.readFileSync('./key.pem', 'utf8'),
      cert: fs.readFileSync('./server.crt', 'utf8')
   };
   
	https.createServer(options, app).listen(8081);
	console.log("Server listening for HTTPS connections on port ", 8081);
