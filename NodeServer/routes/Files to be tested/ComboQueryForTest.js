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

module.exports.comboQuery  = function (code, min, max, zipcode, state) {

	var string;

	var promise1 = new Promise(function(resolve, reject) {
	  setTimeout(function() {
		//connection.connect();
		
		if(min == null && zipcode == null && state == null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ';';
		}
		if(min != null && zipcode == null && state == null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND financial2017.averageTotalPayments between '+ min +' AND '+ max +';';
		}
		if(min == null && zipcode != null && state == null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND providerinfo.providerZipCode = '+ zipcode +';';
		}
		if(min == null && zipcode == null && state != null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND providerinfo.providerState = ' + state +';';
		}
		if(min != null && zipcode == null && state != null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND financial2017.averageTotalPayments between '+ min +' AND '+ max +' AND providerinfo.providerState = ' + state + ';';
		}
		if(min != null && zipcode != null && state == null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND financial2017.averageTotalPayments between '+ min +' AND '+ max +' AND providerinfo.providerZipCode = ' + zipcode + ';';
		}
		if(min == null && zipcode != null && state != null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND providerinfo.providerState = ' + state + ' AND providerinfo.providerZipCode = ' + zipcode + ';';
		}
		if(min != null && zipcode != null && state != null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinfo on providerinfo.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND financial2017.averageTotalPayments between '+ min +' AND '+ max +' AND providerinfo.providerState = ' + state + ' AND providerinfo.providerZipCode = ' + zipcode + ';';
		}
		
		connection.query(string, function(error, results) {

			 if (error) {
				 throw error;
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
				console.log(results[0].providerId + ' ' + results[0].dRGDefinition);
				console.log(results[87].providerId + ' ' + results[87].dRGDefinition);
				console.log(results[results.length - 1].providerId + ' ' + results[results.length - 1].dRGDefinition);
				console.log(results.length);
				resolve(results);
			}
			 
		});
	
	//connection.end();
  }, 300);
});

return promise1.then((value) =>	{
  return value;
});	
};



