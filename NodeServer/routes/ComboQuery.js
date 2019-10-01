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

router.get('/historicdata', function(req, res, next){
	
	var code = req.query.code;
	var providerId = req.query.providerId;
	
    var query = "select dRGDefinition, providerId, totalDischarges, averageCoveredCharges, averageTotalPayments, averageMedicarePayments, '2017' as years from financial2017 where financial2017.providerId = " + providerId + " AND financial2017.dRGDefinition = " + code + " union select dRGDefinition, providerId, totalDischarges, averageCoveredCharges, averageTotalPayments, averageMedicarePayments, '2016' as years from financial2016 where financial2016.providerId = " + providerId + " AND financial2016.dRGDefinition = " + code + "  union select dRGDefinition, providerId, totalDischarges, averageCoveredCharges, averageTotalPayments, averageMedicarePayments, '2015' as years from financial2015 where financial2015.providerId = " + providerId + " AND financial2015.dRGDefinition = " + code + " union select dRGDefinition, providerId, totalDischarges, averageCoveredCharges, averageTotalPayments, averageMedicarePayments, '2014' as years from financial2014 where financial2014.providerId = " + providerId + " AND financial2014.dRGDefinition = " + code + " union select dRGDefinition, providerId, totalDischarges, averageCoveredCharges, averageTotalPayments, averageMedicarePayments, '2013' as years from financial2013 where financial2013.providerId = " + providerId + " AND financial2013.dRGDefinition = " + code +" union select dRGDefinition, providerId, totalDischarges, averageCoveredCharges, averageTotalPayments, averageMedicarePayments, '2012' as years from financial2012 where financial2012.providerId = " + providerId + " AND financial2012.dRGDefinition = " + code + " union select dRGDefinition, providerId, totalDischarges, averageCoveredCharges, averageTotalPayments, averageMedicarePayments, '2011' as years from financial2011 where financial2011.providerId = " + providerId +" AND financial2011.dRGDefinition = " + code + "";
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

