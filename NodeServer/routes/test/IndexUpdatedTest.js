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
var query = require('../Files to be tested/IndexUpdatedForTest.js');
//Test for all results from database queries

//index.js
describe('Testing IndexUpdated.js methods', function() {
//Test 1: Test 'query' is not null 
//
	describe('Testing query is not null', function() {
		it('Connection should not be null', function() {
			//establish connection	
		var connection = require('../../lib/db.js');
			assert(connection.state = "connected");
		});	
		
	//Test 2: select all query
	//We will run a select all query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select all query', function() {
		it('Silva should return all records', async function() {
		var x = await query.silva(039)
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[87].providerId == 50441 && x[87].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[807].providerId == 670077 && x[807].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 808)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		});
	});
	
	//Test 3: select all with price ascending
	//We will run a select all with price ascending query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select all price asc query', function() {
		it('sortpriceasc should return all records', async function() {
		var x = await query.sortpriceasc(039)
			
			var one = false;
			if(x[0].providerId == 10006 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[87].providerId == 40078 && x[87].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[807].providerId == 210002 && x[807].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 808)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		});
	});
	
	//Test 4: select zipcode query
	//We will run a select by zipcode and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select by zipcode query', function() {
		it('filterzipcode should return all records', async function() {
			var x = await query.filterzipcode(039,36301)
			
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
		});
	});
	
	
	//Test 5: select state query
	//We will run a select by state query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select by state query', function() {
		it('filterstate should return all records', async function() {
		var x = await query.filterstate(039,"AL")
			
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[9].providerId == 10039 && x[9].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[21].providerId == 10139 && x[21].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 22)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		});
	});
	
	//Test 6: select providerinfo query
	//We will run a providerinfo query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	//This is a highly important query as it is used to check hospital data 
	describe('Select all providerinfo query', function() {
		it('providerinfo should return all records', async function() {
		var x = await query.providerinfo(039)
			
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[422].providerId == 260068 && x[422].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[807].providerId == 670077 && x[807].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 808)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		});
	});
	
	//Test 7: select by price range query
	//We will run a all between two price points query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select all in price range query', function() {
		it('pricerange should return all records', async function() {
		var x = await query.pricerange(039, 0, 100000)
			//console.log(x[0].providerId);
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[422].providerId == 260068 && x[422].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[807].providerId == 670077 && x[807].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 808)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
		});
	});
	});
});

