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
var connection = require('../../lib/db.js');
var query = require('../Files to be tested/ComboQueryForTest.js');
//Test for all results from database queries

//index.js
describe('Testing ComboQuery.js methods', function() {
//Test 1: Test connection is not null 
//
	describe('Testing connection is not null', function() {
		it('Connection should not be null', function() {
			assert(connection.state = "connected");
		});	
	});
	
//Test 2: Test the query results are correct for each of the 8 possbilites
//Possiblitly 1: no sorting 
	describe('Code query should return correct results', function() {
		it('Possiblitly 1: no sorting ', async function() {
			var x = await query.comboQuery("039",null,null,null,null)
			var one = false;
			//console.log(x[807].providerId);
			if(x[0].providerId == 100007 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[87].providerId == 150058 && x[87].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[807].providerId == 80004 && x[807].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
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
	
//Test 3: Test the query results are correct for each of the 8 possbilites
//Possiblitly 2: just min max sorting 
	describe('Code query should return correct results', function() {
		it('Possiblitly 2: just min max sorting', async function() {
			var x = await query.comboQuery("039",0,10000,null,null)
			
			var one = false;
			if(x[0].providerId == 100007 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[87].providerId == 150089 && x[87].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[716].providerId == 60064 && x[716].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 717)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
			
		});	
			
	});
	
//broken come back too
//Test 4: Test the query results are correct for each of the 8 possbilites
//Possiblitly 3: zipcode sorting 
//Only one result so we test further on that single result 
		describe('Code query should return correct results', function() {
		it('Possiblitly 2: zipcode sorting', async function() {
			
			var x = await query.comboQuery("039",null,null,36301,null)
				
			
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Length
			var four = false;
			if(x.length == 1)
			{
				four = 	true;
			}
			
			assert(one == true && four == true);
			
		});
	});
	
//Test 5: Test the query results are correct for each of the 8 possbilites
//Possiblitly 4: state sorting
	describe('Code query should return correct results', function() {
		it('Possiblitly 4: state sorting ', async function() {
			var x = await query.comboQuery("039",null,null,null,"AL")
			
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[11].providerId == 10090 && x[11].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[21].providerId == 10078 && x[21].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
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
	
//Test 6: Test the query results are correct for each of the 8 possbilites
//Posibillity 5: sort by state with min and max
//Only one result so we test further on that single result 
	describe('Code query should return correct results', function() {
		it('Posibillity 5: sort by state with min and max', async function() {
			var x = await query.comboQuery("039",0,10000,null,"AL")
			
			var one = false;
			if(x[0].providerId == 10001 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[11].providerId == 10090 && x[11].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[21].providerId == 10078 && x[21].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
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

	
//Test 7: Test the query results are correct for each of the 8 possbilites
//Possiblitly 6: sort by zipcode with min and max 
	describe('Code query should return correct results', function() {
		it('Possiblitly 6: sort by zip code with min and max', async function() {
			var x = await query.comboQuery("039",0,100000,36301,null)

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
	
//Test 8: Test the query results are correct for each of the 8 possbilites
//Possiblitly 7: search by zip code in state
	describe('Code query should return correct results', function() {
		it('Possiblity 7: search by zipcode in state', async function() {
			var x = await query.comboQuery("039",null,null,36301,"AL")
			
		
			
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
	
//Test 9: Test the query results are correct for each of the 8 possbilites
//Possiblitly 8: search by zipcode of state with sort 
	describe('Code query should return correct results when given nulls strings', function() {
		it('Possiblitly 8: search by zipcode of state with sort', async function() {
			//code
				var x = await query.comboQuery("039",0,10000,36301,"AL")
			
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
	
//Test 10: Due to angular passing, the program only send strings not null so we modified our code to fit this test by converting exact "null" to null
//Possiblitly 8: orignal query with "null" strings
	describe('Code query should return correct results', function() {
		it('Given just code with null strings', async function() {
			var x = await query.comboQuery("039","null","null","null","null")
			console.log(x[0].providerId);
			var one = false;
			if(x[0].providerId == 100007 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[87].providerId == 150058 && x[87].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[807].providerId == 80004 && x[807].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
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

