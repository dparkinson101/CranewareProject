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
module.exports.silva  = async function (code) {

	var string = 'SELECT * FROM fulldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		//connection.connect();		
		connection.query(string, function(error, results) {

			 if (error) {
				 throw error;
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
				
				resolve(results);
			}
			 
		});
  }, 3000);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;	
};

//query to sort the search results by price in ascending order
module.exports.sortpriceasc  = async function (code) {

	var string = 'SELECT * FROM fulldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' ORDER BY averageTotalPayments ASC LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		//connection.connect();		
		connection.query(string, function(error, results) {

			 if (error) {
				 throw error;
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
			
				resolve(results);
			}
			 
		});
  }, 3000);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};

//query to filter the results by providerZipCode
module.exports.filterzipcode  = async function (code, zipcode) {

	var string = 'SELECT * FROM fulldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND providerZipCode=' + zipcode + ' LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		//connection.connect();		
		connection.query(string, function(error, results) {

			 if (error) {
				 throw error;
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
				
				resolve(results);
			}
			 
		});
	
  }, 3000);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};

//query to filter the results by state
module.exports.filterstate  = async function (code, state) {

	var string = 'SELECT * FROM fulldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND providerState="' + state + '" LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		//connection.connect();		
		connection.query(string, function(error, results) {

			 if (error) {
				 throw error;
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
				
				resolve(results);
			}
			 
		});
	
	
  }, 3000);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};

//query to get the provider info from procedure code
module.exports.providerinfo  = async function (code) {

	var string = 'SELECT fulldata.dRGDefinition, fulldata.providerId, fulldata.providerName,fulldata.averageTotalPayments, fulldata.providerStreetAddress, fulldata.providerCity, fulldata.providerState, fulldata.providerZipCode from fulldata WHERE substr(fulldata.dRGDefinition, 1, 3) =' + code + ' LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		//connection.connect();		
		connection.query(string, function(error, results) {

			 if (error) {
				 throw error;
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
				
				resolve(results);
			}
			 
		});
	

  }, 3000);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};

//query to sort by price range
module.exports.pricerange  = async function (code, min, max) {

	var string = 'SELECT * FROM fulldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND averageTotalPayments BETWEEN ' + min + ' AND ' + max + ' LIMIT 200';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		//connection.connect();		
		connection.query(string, function(error, results) {

			 if (error) {
				 throw error;
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
				
				resolve(results);
			}
			 
		});
	
  }, 3000);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};