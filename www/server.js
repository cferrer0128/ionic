var express  = require('express');
var app      = express();                               
var morgan = require('morgan');            
var bodyParser = require('body-parser');    
var cors = require('cors');

//routes
var tasks = require('./routes/tasks');
var index = require('./routes/index');

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname );
app.set('view engine', 'html');

app.use(morgan('dev'));                                        
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(cors());
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/api',tasks);
app.use('/',index);
app.use(express.static(__dirname));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console .log('Express server listening on port ' + app.get('port'));
});