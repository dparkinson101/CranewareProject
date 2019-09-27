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

//TEST DATA METHODS BEGIN HERE

/*FOR SILVA SQL DATABASE CONNECTION */
//select all statement
module.exports.silva  = function (code) {

	var string = 'SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' LIMIT 20000';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		connection.connect();		
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
  return value;
});	
};

//query to sort the search results by price in ascending order
module.exports.sortpriceasc  = function (code) {

	var string = 'SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' ORDER BY averageTotalPayments ASC LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		connection.connect();		
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
  return value;
});	
};

//query to filter the results by providerZipCode
module.exports.filterzipcode  = function (code, zipcode) {

	var string = 'SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND providerZipCode=' + zipcode + ' LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		connection.connect();		
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
  return value;
});	
};

//query to filter the results by state
module.exports.filterstate  = function (code, state) {

	var string = 'SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND providerState=' + state + ' LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		connection.connect();		
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
  return value;
});	
};

//query to get the provider info from procedure code
module.exports.providerinfo  = function (code) {

	var string = 'SELECT alldata.dRGDefinition, alldata.providerId, alldata.providerName,alldata.averageTotalPayments, alldata.providerStreetAddress, alldata.providerCity, alldata.providerState, alldata.providerZipCode, output2017.latitude, output2017.longitude from alldata inner join output2017 on alldata.providerId = output2017.providerId WHERE substr(alldata.dRGDefinition, 1, 3) =' + code + ' LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		connection.connect();		
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
  return value;
});	
};

//query to sort by price range
module.exports.pricerange  = function (code, min, max) {

	var string = 'SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND averageTotalPaymetns BETWEEN ' + min + ' AND ' + max + ' LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		connection.connect();		
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
  return value;
});	
};