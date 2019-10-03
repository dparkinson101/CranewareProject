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
			if(x[838].providerId == 520037 && x[838].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 839)
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
			if(x[744].providerId == 520037 && x[744].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 745)
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
			var x = await query.comboQuery("039","null","null","null","null")	;	
			//console.log(x[838].providerId);
			//console.log(x.length);
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
			if(x[838].providerId == 520037 && x[838].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 839)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
			
		});	
	});
	
//Test 10: We needed a new query to fill for auto completion of typed procedures, this is the testing of that following the same format as before
	describe('Only codes query should return correct results', function() {
		it('Return all distinct codes only', async function() {
			var x = await query.procedurelist()	;	
			
			var one = false;
			if(x[0].dRGDefinition === '001 - HEART TRANSPLANT OR IMPLANT OF HEART ASSIST SYSTEM W MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[87].dRGDefinition === '116 - INTRAOCULAR PROCEDURES W CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[651].dRGDefinition === '989 - NON-EXTENSIVE O.R. PROC UNRELATED TO PRINCIPAL DIAGNOSIS W/O CC/MCC')
			{
				three = true;
			}
			//Length
			var four = false;
			if(x.length = 652)
			{
				four = 	true;
			}
			
			assert(one == true && two == true && three == true && four == true);
			
		});	
	});
	
	//Test 11: To build reasonbale graphs we needed to get all years of data for specific hospital of a certain procedure to predict the next year and draw a price trend
	//We shall use a know example and test based on that with by checking every record the query should return
	describe('Only codes query should return correct results', function() {
		it('Return single field of all cost of the years', async function() {
			var x = await query.historicdata('039', 10001);		
			//console.log(x[0].financial2017.averageMedicarePayemnts);
			
			var one = false;
			if(x[0].averageCoveredCharges == '41130.56098')
			{
				one = true;
			}
			
			var two = false;
			if(x[1].averageCoveredCharges == '38026.17')
			{
				two = true;
			}
			
			var three = false;
			if(x[2].averageCoveredCharges == '37027.24')
			{
				three = true;
			}
			
			var four = false;
			if(x[3].averageCoveredCharges == '36003.63441')
			{
				four = true;
			}
			var five = false;
			if(x[4].averageCoveredCharges == '37988.97959')
			{
				five = true;
			}
			
			var six = false;
			if(x[5].averageCoveredCharges == '37467.95789')
			{
				six = true;
			}
			
			var seven = false;
			if(x[6].averageCoveredCharges == '32963.07692')
			{
				seven = true;
			}
			
			var eight = false;
			if(x.length == 7)
			{
				eight = true;
			}
			
			assert(one == true && two == true && three == true && four == true && five == true && six == true && seven == true && eight == true);
			
		}).timeout(30000);	
	});
	
});

