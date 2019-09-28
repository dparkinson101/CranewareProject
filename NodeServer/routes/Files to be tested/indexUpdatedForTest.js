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

/*FOR SILVA SQL DATABASE CONNECTION */
module.exports.silva  = function (code) {

	var string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = ' + code + ' AND financial2017.dRGDefinition = ' + code + ';';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
				
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
	
	
  }, 300);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};

//query to sort the search results by price in ascending order
module.exports.sortpriceasc  = function (code) {

	var string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = ' + code + ' AND financial2017.dRGDefinition = ' + code + ' ORDER BY financial2017.averageTotalPayments ASC;';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
				
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
	
	
  }, 300);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};
//query to filter the results by providerZipCode
module.exports.filterzipcode  = function (code, zipcode) {

	var string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = ' + code + ' AND financial2017.dRGDefinition = ' + code + ' AND providerZipCode = ' + zipcode + ';';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
				
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
	
	
  }, 300);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};

//query to filter the results by providerState
module.exports.filterstate  = function (code, state) {

	var string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = ' + code + ' AND financial2017.dRGDefinition = ' + code + ' AND providerState = "' + state +'";';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
				
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
	
	
  }, 300);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};

//query to get the provider info from procedure code
module.exports.providerinfo  = function (code	) {

	var string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = ' + code + ' AND financial2017.dRGDefinition = ' + code +';';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
				
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
	
	
  }, 300);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};

/*SORT*/
module.exports.pricerange  = function (code, min, max) {

	var string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = ' + code + ' AND financial2017.dRGDefinition = ' + code + ' AND averageTotalPayments between ' + min + ' AND ' + max + ';';

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
				
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
	
	
  }, 300);
});

var x = promise1.then((value) =>	{
  return value;
});

return x;
};

