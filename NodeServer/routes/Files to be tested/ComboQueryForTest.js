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
		var query = 'select financial2017.averageCoveredCharges as "Covered2017", financial2017.averageMedicarePayments as "Medicare2017", financial2017.averageTotalPayments as "Total2017", financial2016.averageCoveredCharges as "Covered2016", financial2016.averageMedicarePayments as "Medicare2016", financial2016.averageTotalPayments as "Total2016", financial2015.averageCoveredCharges as "Covered2015", financial2015.averageMedicarePayments as "Medicare2015", financial2015.averageTotalPayments as "Total2015", financial2014.averageCoveredCharges as "Covered2014", financial2014.averageMedicarePayments as "Medicare2014", financial2014.averageTotalPayments as "Total2014", financial2013.averageCoveredCharges as "Covered2013", financial2013.averageMedicarePayments as "Medicare2013", financial2013.averageTotalPayments as "Total2013", financial2012.averageCoveredCharges as "Covered2012", financial2012.averageMedicarePayments as "Medicare2012", financial2012.averageTotalPayments as "Total2012", financial2011.averageCoveredCharges as "Covered2011", financial2011.averageMedicarePayments as "Medicare2011", financial2011.averageTotalPayments as "Total2011" from financial2017 inner join financial2016 on financial2016.providerId = financial2017.providerId inner join financial2015 on financial2015.providerId = financial2017.providerId inner join financial2014 on financial2014.providerId = financial2017.providerId inner join financial2013 on financial2013.providerId = financial2017.providerId inner join financial2012 on financial2012.providerId = financial2017.providerId inner join financial2011 on financial2011.providerId = financial2017.providerId where financial2017.providerId = ' + providerIds + ' AND financial2017.dRGDefinition = ' + codes +  ' AND financial2016.providerId = ' + providerIds + ' AND financial2016.dRGDefinition = ' + codes + ' AND financial2015.providerId = ' + providerIds + ' AND financial2015.dRGDefinition = ' + codes + ' AND financial2014.providerId = '+ providerIds + ' AND financial2014.dRGDefinition = ' + codes + ' AND financial2013.providerId = '+ providerIds + ' AND financial2013.dRGDefinition = ' + codes + ' AND financial2012.providerId = '+ providerIds + ' AND financial2012.dRGDefinition = ' + codes + ' AND financial2011.providerId = '+ providerIds + ' AND financial2011.dRGDefinition = ' + codes + ';';
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



