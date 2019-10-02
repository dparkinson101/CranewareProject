/*
Author: Oliver Simpson
Reviewer: Owen Kelbie
Start Date: 24/09/19

These are the unit tests for Team 5 Node.js Scripts 
The scripts are tested here then moved onto their own scripts

Open in consule in project file and run command "mocha" in conslole 
*/

//Varible and file set up for db.js
var assert = require('assert');
var mysql = require('mysql'); 

//pre-test testing for db.js
//Testing varibles and files correctly loaded
//We cannot test in build assert as we can assert it without it working, throws error other wise

describe('Testing db.js varilbes', function() {
	
	describe('Establish mysql', function() {
		it('mysql component should not be null', function() {		
		assert(mysql !== null);
		});
	});
	
});

//pre-testing for index.js 
//Test varibles and files are correctly loaded

var express = require('express');
var router = express.Router();

var connection = require('../../lib/db.js');
			
var sql = require('mssql');
var cors = require('cors')
var app = express()
var query = require('../Files to be tested/IndexForTest.js');
//router.use(cors())

describe('Testing IndexForTest.js varibles', function() {

	describe('Establish express', function() {
		it('express component should not be null', function() {		
		assert(express !== null);
		});
	});

	describe('Establish router', function() {
		it('router component should not be null', function() {		
		assert(router !== null);
		});
	});
	 
	describe('Establish sql', function() {
		it('sql component should not be null', function() {		
		assert(sql !== null);
		});
	});

	describe('Establish cors', function() {
		it('cors component should not be null', function() {		
		assert(cors !== null);
		});
	});

	describe('Establish app', function() {
		it('app component should not be null if express is not null', function() {		
		assert(app !== null);
		});
	});

});

//IndexForTest.js
describe('Testing IndexForTest.js methods', function() {

	//Test 1: db connection - in db script located in lib, is connection successful
	//As its just a connection script there are no method to test but for unit testing we shall recreate the connection and code for testing purposes

	describe('Database Connection successful', function() {
		it('Connection should not be null', function() {
		
		//establish connection	
		var connection = mysql.createConnection({
			host: 'silva.computing.dundee.ac.uk',
			user: '2019indteam5',
			password: '9854.ind5.4589',
			database: '2019indteam5db'
			});	
		
		//assert connection is not null
		assert(connection.state = "connected");
		});
	});
	
	//Test 2: select all query
	//We will run a select all query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select all query', function() {
		it('Silva should return all records', async function() {
			
			var x = await query.silva(039);
			
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[87].providerId == 50180 && x[87].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[199].providerId == 100105 && x[199].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 199)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		}).timeout(5000);
	});
	
	//Test 3: select all with price ascending
	//We will run a select all with price ascending query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select all price asc query', function() {
		it('sortpriceasc should return all records', async function() {
			var x = await query.sortpriceasc(039)	
			
			var one = false;
			if(x[0].providerId == '050380' && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[50].providerId == 250001 && x[50].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[199].providerId == 410007 && x[199].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 200)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		}).timeout(5000);
	});
	
	//Test 4: select zipcode query
	//We will run a select by zipcode and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select by zipcode query', function() {
		it('filterzipcode should return all records', async function() {
		var x = await query.filterzipcode(039, 36301)
			
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Length
			var four = false;
			if(x.length = 1)
			{
				four = 	true;
			}
			
			assert(one == true && four == true);
		}).timeout(5000);
	});
	
	//Test 5: select state query
	//We will run a select by state query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select by state query', function() {
		it('filterstate should return all records', async function() {
		var x = await query.filterstate(039, "AL")
			
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[10].providerId == 10046 && x[10].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[154].providerId == '010113' && x[154].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 155)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		}).timeout(5000);
	});
	
	//Test 6: select providerinfo query
	//We will run a providerinfo query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	//This is a highly important query as it is used to check hospital data 
	describe('Select all providerinfo query', function() {
		it('providerinfo should return all records', async function() {
		var x = await query.providerinfo(039)
			
	
			var one = false;
			if(x[0].providerName == 'SOUTHEAST ALABAMA MEDICAL CENTER' && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[100].providerName == 'MERCY HOSPITAL' && x[100].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[199].providerName == 'INDIAN RIVER MEDICAL CENTER' && x[199].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 200)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		}).timeout(5000);
	});
	
	//Test 7: select by price range query
	//We will run a all between two price points query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select all in price range query', function() {
		it('pricerange should return all records', async function() {
			var x = await query.pricerange(039, 0, 100000)
			
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[78].providerId == 50093 && x[78].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[199].providerId == 100105 && x[199].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 200)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		}).timeout(5000);
	});
});


