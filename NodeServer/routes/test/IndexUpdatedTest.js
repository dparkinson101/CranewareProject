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
		var connection = mysql.createConnection({
			host: 'silva.computing.dundee.ac.uk',
			user: '2019indteam5',
			password: '9854.ind5.4589',
			database: '2019indteam5db'
			});	
			assert(connection != null);
		});	
		
	//Test 2: select all query
	//We will run a select all query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select all query', function() {
		it('Silva should return all records', async function() {
		var x = await query.silva(039)
			
			console.log(x[87].providerId);
			console.log(x.length);
			
			var one = false;
			if(x[0].providerId == 100002 && x[0].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				one = true;
			}
			
			//Middle
			var two = false;
			if(x[87].providerId == 210029 && x[87].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
			{
				two = true;
			}
			
			//End
			var three = false;
			if(x[807].providerId == 520193 && x[807].dRGDefinition === '039 - EXTRACRANIAL PROCEDURES W/O CC/MCC')
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
		it('sortpriceasc should return all records', function() {
		//code
		assert(false)
		});
	});
	
	//Test 4: select zipcode query
	//We will run a select by zipcode and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select by zipcode query', function() {
		it('filterzipcode should return all records', function() {
		//code
		assert(false)
		});
	});
	
	//Test 5: select state query
	//We will run a select by state query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select by state query', function() {
		it('filterstate should return all records', function() {
		//code
		assert(false)
		});
	});
	
	//Test 6: select providerinfo query
	//We will run a providerinfo query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	//This is a highly important query as it is used to check hospital data 
	describe('Select all providerinfo query', function() {
		it('filterstate should return all records', function() {
		//code
		assert(false)
		});
	});
	
	//Test 7: select by price range query
	//We will run a all between two price points query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select all in price range query', function() {
		it('pricerange should return all records', function() {
		//code
		assert(false)
		});
	});
	});
	/*
//Test 2: Test 'query' results are correct for each 
//describe
	describe('Code query should return correct results', function() {
		it('Test when only code is entered', function() {
				//console.log(query.comboQuery());
			assert(false);
		});	
	});
	
//Test 3: Test 'query' results are correct for each 
//describe
	describe('Proc query should return correct results', function() {
		it('Test when only proc is entered', function() {
				//console.log(query.comboQuery());
			assert(false);
		});	
	});
	
//Test 2: Test 'query' results are correct for each 
//describe
	describe('Combined query should return correct results', function() {
		it('Test when both code & proc is entered', function() {
				//console.log(query.comboQuery());
			assert(false);
		});	
	});
	*/
});

