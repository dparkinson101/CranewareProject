var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors')
var app = express()
var sql = require('mssql');

// var connection = mysql.createConnection({
//     host: 'silva.computing.dundee.ac.uk',
//     user: '2019indteam5',
//     password: '9854.ind5.4589',
//     database: '2019indteam5db'
// });

// connection.connect(function(err) {
// 	console.log(err);
// 	connection = mysql.createConnection({
// 		host: 'silva.computing.dundee.ac.uk',
// 		user: '2019indteam5',
// 		password: '9854.ind5.4589',
// 		database: '2019indteam5db'
// 	});
// });
var connection = require('../lib/db');

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

router.get('/historicdata', function(req, res, next){
	
	var codes = req.query.code;
	var providerIds = req.query.providerId;
	
    var query = 'select financial2017.averageCoveredCharges as "Covered2017", financial2017.averageMedicarePayments as "Medicare2017", financial2017.averageTotalPayments as "Total2017", financial2016.averageCoveredCharges as "Covered2016", financial2016.averageMedicarePayments as "Medicare2016", financial2016.averageTotalPayments as "Total2016", financial2015.averageCoveredCharges as "Covered2015", financial2015.averageMedicarePayments as "Medicare2015", financial2015.averageTotalPayments as "Total2015", financial2014.averageCoveredCharges as "Covered2014", financial2014.averageMedicarePayments as "Medicare2014", financial2014.averageTotalPayments as "Total2014", financial2013.averageCoveredCharges as "Covered2013", financial2013.averageMedicarePayments as "Medicare2013", financial2013.averageTotalPayments as "Total2013", financial2012.averageCoveredCharges as "Covered2012", financial2012.averageMedicarePayments as "Medicare2012", financial2012.averageTotalPayments as "Total2012", financial2011.averageCoveredCharges as "Covered2011", financial2011.averageMedicarePayments as "Medicare2011", financial2011.averageTotalPayments as "Total2011" from financial2017 inner join financial2016 on financial2016.providerId = financial2017.providerId AND financial2016.dRGDefinition = financial2017.dRGDefinition inner join financial2015 on financial2015.providerId = financial2017.providerId AND financial2015.dRGDefinition = financial2017.dRGDefinition inner join financial2014 on financial2014.providerId = financial2017.providerId AND financial2014.dRGDefinition = financial2017.dRGDefinition inner join financial2013 on financial2013.providerId = financial2017.providerId AND financial2013.dRGDefinition = financial2017.dRGDefinition inner join financial2012 on financial2012.providerId = financial2017.providerId AND financial2012.dRGDefinition = financial2017.dRGDefinition inner join financial2011 on financial2011.providerId = financial2017.providerId AND financial2011.dRGDefinition = financial2017.dRGDefinition where financial2017.providerId = ' + providerIds + ' AND financial2017.dRGDefinition = ' + codes +  ' AND financial2016.providerId = ' + providerIds + ' AND financial2016.dRGDefinition = ' + codes + ' AND financial2015.providerId = ' + providerIds + ' AND financial2015.dRGDefinition = ' + codes + ' AND financial2014.providerId = '+ providerIds + ' AND financial2014.dRGDefinition = ' + codes + ' AND financial2013.providerId = '+ providerIds + ' AND financial2013.dRGDefinition = ' + codes + ' AND financial2012.providerId = '+ providerIds + ' AND financial2012.dRGDefinition = ' + codes + ' AND financial2011.providerId = '+ providerIds + ' AND financial2011.dRGDefinition = ' + codes + ';';
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

