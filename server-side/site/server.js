var express = require('express'),
        cors = require('cors'),
	marqdown = require('./marqdown.js');
	//routes = require('./routes/designer.js'),
	//votes = require('./routes/live.js'),
	//upload = require('./routes/upload.js'),
	// create = require('./routes/create.js'),
	// study = require('./routes/study.js'),
	// admin = require('./routes/admin.js');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

var whitelist = ['http://chrisparnin.me', 'http://pythontutor.com', 'http://happyface.io', 'http://happyface.io:8003', 'http://happyface.io/hf.html'];
var corsOptions = {
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

app.options('/api/study/vote/submit/', cors(corsOptions));

app.post('/api/design/survey', 
	function(req,res)
	{
		console.log("INSIDE THE MICROSERVICE:: "+req);
		console.log(req.body.markdown);
		//var text = marqdown.render( req.query.markdown );
		var text = marqdown.render( req.body.markdown );
		//res.setHeader('Access-Control-Allow-Origin','*');
		res.send( {preview: text} );
	}
);

var port = process.env.APP_PORT;
app.listen(port);
console.log(`Listening on port ${port}...`);
