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

module.exports.comboQuery  = async function (code, min, max, zipcode, state) {

	var string;
	var codes = code;
	var mins = min;
	var maxs = max;
	var zips = zipcode;
	var states = state;
	
	if(mins == "null")
	{
		mins = null;
		maxs = null;
	}
	
	if(zips == "null")
	{
		zips = null;
	}
	
	if(states == "null")
	{
		states = null;
	}
	
	var promise1 = new Promise( function(resolve, reject) {
	  setTimeout( function() {
		//console.log(code);
		if(mins == null && zips == null && states == null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = ' + codes + ' AND financial2017.dRGDefinition = ' + codes + ';';
			
		}
		if(mins != null && zips == null && states == null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = ' + codes + ' AND financial2017.dRGDefinition = ' + codes + ' AND financial2017.averageTotalPayments between ' + mins + ' AND ' + maxs + ';';
		}
		if(mins == null && zips != null && states == null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ codes + ' AND financial2017.dRGDefinition = ' + codes + ' AND providerinformationfinal.providerZipCode = ' + zips + ';';
		}
		if(mins == null && zips == null && states != null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ codes + ' AND financial2017.dRGDefinition = ' + codes + ' AND providerinformationfinal.providerState = "' + states +'";';
		}
		if(mins != null && zips == null && states != null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ codes + ' AND financial2017.dRGDefinition = ' + codes + ' AND financial2017.averageTotalPayments between '+ mins +' AND '+ maxs +' AND providerinformationfinal.providerState = "' + states + '";';
		}
		if(mins != null && zips != null && states == null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ codes + ' AND financial2017.dRGDefinition = ' + codes + ' AND financial2017.averageTotalPayments between '+ mins +' AND '+ maxs +' AND providerinformationfinal.providerZipCode = ' + zips + ';';
		}
		if(mins == null && zips != null && states != null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = '+ codes + ' AND financial2017.dRGDefinition = ' + codes + ' AND providerinformationfinal.providerState = "' + states + '" AND providerinformationfinal.providerZipCode = ' + zips + ';';
		}
		if(mins != null && zips != null && states != null) {
			string = 'select * from financial2017 inner join codes on codes.dRGDefinition = financial2017.dRGDefinition inner join providerinformationfinal on providerinformationfinal.providerId = financial2017.providerId where codes.dRGDefinition = ' + codes + ' AND financial2017.dRGDefinition = ' + codes + ' AND financial2017.averageTotalPayments between '+ mins +' AND '+ maxs +' AND providerinformationfinal.providerState = "' + states + '" AND providerinformationfinal.providerZipCode = ' + zips + ';';
		}
		
		connection.query(string, function(error, results) {

			 if (error) {
				throw error;
				console.log(error);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + error });
			
			} 
			
			else {
				//console.log(results[0].providerId);
				//console.log(results.length);
				resolve(results);
			}
			 
		});
	
	//connection.end();
  }, 300);
});

var x = promise1.then((value) =>	{
  return value;
});	

return x;
};

module.exports.procedurelist  = async function () {
	
	var promise1 = new Promise( function(resolve, reject) {
		setTimeout( function() {
    var query = 'SELECT DISTINCT codes.dRGDefinition from codes';
    connection.query(query, function(err, results){
        if(err){
            console.log(err);
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        }
        else{
            resolve(results);
        }
    });
},300);
});
var x = promise1.then((value) =>	{
  return value;
});	

return x;
};

module.exports.historicdata  = async function (code, providerId) {
	
	var codes = code;
	var providerIds = providerId
	
	var promise1 = new Promise( function(resolve, reject) {
		setTimeout( function() {
		var query = 'select averageCoveredCharges, averageMedicarePayments, averageTotalPayments, 2017 as years from financial2017 where dRGDefinition = ' + codes + ' and providerId = ' + providerIds + ' union all select averageCoveredCharges, averageMedicarePayments, averageTotalPayments, 2016 as years from financial2016 where dRGDefinition = ' + codes + ' and providerId = ' + providerIds + ' union all select averageCoveredCharges, averageMedicarePayments, averageTotalPayments, 2015 as years from financial2015 where dRGDefinition = ' + codes + ' and providerId = ' + providerIds + ' union all select averageCoveredCharges, averageMedicarePayments, averageTotalPayments, 2014 as years from financial2014 where dRGDefinition = ' + codes + ' and providerId = ' + providerIds + ' union all select averageCoveredCharges, averageMedicarePayments, averageTotalPayments, 2013 as years from financial2013 where dRGDefinition = ' + codes + ' and providerId = ' + providerIds + ' union all select averageCoveredCharges, averageMedicarePayments, averageTotalPayments, 2012 as years from financial2012 where dRGDefinition = ' + codes + ' and providerId = ' + providerIds + ' union all select averageCoveredCharges, averageMedicarePayments, averageTotalPayments, 2011 as years from financial2011 where dRGDefinition = ' + codes + ' and providerId = ' + providerIds + ';';
		connection.query(query, function(err, results){
			if(err){
				console.log(err);
				res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
			}
			else{
				resolve(results);
			}
		});
	},300);
});
var x = promise1.then((value) =>	{
  return value;
});	

return x;

};



