var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors')
var app = express()
var sql = require('mssql');

var connection = mysql.createConnection({
    host: 'silva.computing.dundee.ac.uk',
    user: '2019indteam5',
    password: '9854.ind5.4589',
    database: '2019indteam5db'
});

//CORS - cross orgin resource sharing this is enabled to allow requests to be made from another port on this machine
router.use(cors())

module.exports.comboQuery  = function (code, proc) {

	var string = 'SELECT * FROM alldata2017;';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		connection.connect();
		
		if(code != null && proc != null) {
			string = 'SELECT * FROM alldata2017 WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND substring(dRGDefinition,7,' + proc.length + ')="' + proc +'"';
		}
		
		if(code == null && proc != null) {
			string = 'SELECT * FROM alldata2017 WHERE substring(dRGDefinition,7,' + proc.length + ')="' + proc + '"';
		}
		
		if(code != null && proc == null) {
			string = 'SELECT * FROM alldata2017 WHERE substring(dRGDefinition, 1, 3)=' + code;
		}
		
		connection.query(string, function(error, results) {

			 if (error) {
				 throw error;
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
				console.log(results[0]);
				resolve(results);
				
			}
			 
		});
	
	connection.end();
  }, 300);
});

return promise1.then((value) =>	{
	//console.log(value);
  return value;
});	
};



