var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

//===MIDDLEWARES
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors()); 

//===ROUTES
app.get('/', function (requisicao, resposta) {
	resposta.send('Api TimeSheet NT');
});

var db = require('./timesheetdb')();
var timeSheetService = require('./timesheet.service')(db);
require('./timesheet.resource')(app, timeSheetService);

var port = 3000;
app.listen(port, function () {
	console.log("servidor iniciado na porta " + port);
});


