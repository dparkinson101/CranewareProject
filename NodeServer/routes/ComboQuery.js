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

router.get('/comboQuery', function(req, res, next) {

	var string; //= 'select * from financial2017'; //inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = 023 AND providerinformationfinal.providerState = "AL" AND financial2017.averageCoveredCharges > 200000;';
	var code = req.query.code;
	var min = req.query.min;
	var max = req.query.max;
	var zipcode = req.query.zipcode;
	var state = req.query.state;

	if(min == "null")
	{
		min = null;
		max = null;
	}
	
	if(zipcode == "null")
	{
		zipcode = null;
	}
	
	if(state == "null")
	{
		state = null;
	}

	console.log(req.query);
		
		if(min === null && zipcode === null && state === null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ';';
		}
		if(min !== null && zipcode === null && state === null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND financial2017.averageTotalPayments between '+ min +' AND '+ max +';';
		}
		if(min === null && zipcode !== null && state === null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND providerinformationfinal.providerZipCode = '+ zipcode +';';
		}
		if(min === null && zipcode === null && state !== null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND providerinformationfinal.providerState = "' + state +'";';
		}
		if(min !== null && zipcode === null && state !== null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND financial2017.averageTotalPayments between '+ min +' AND '+ max +' AND providerinformationfinal.providerState = "' + state + '";';
		}
		if(min !== null && zipcode !== null && state === null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND financial2017.averageTotalPayments between '+ min +' AND '+ max +' AND providerinformationfinal.providerZipCode = ' + zipcode + ';';
		}
		if(min === null && zipcode !== null && state !== null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND providerinformationfinal.providerState = "' + state + '" AND providerinformationfinal.providerZipCode = ' + zipcode + ';';
		}
		if(min !== null && zipcode !== null && state !== null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ code + ' AND financial2017.dRGDefinition = ' + code + ' AND financial2017.averageTotalPayments between '+ min +' AND '+ max +' AND providerinformationfinal.providerState = "' + state + '" AND providerinformationfinal.providerZipCode = ' + zipcode + ';';
		}
		
		connection.query(string, function(error, results) {

			 if (error) {
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
				res.send(results); //returns the results as JSON
			}
			 
		});
});

router.get('/procedurelist', function(req, res, next){
    var query = 'SELECT DISTINCT codes.dRGDefinition from codes';
    connection.query(query, function(err, results){
        if(err){
            console.log(err);
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        }
        else{
            res.send(results);
        }
    });
});


module.exports = router;

