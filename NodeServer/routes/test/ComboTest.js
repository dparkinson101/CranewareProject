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
var query = require('../Files to be tested/ComboQueryForTest.js');
//Test for all results from database queries

//index.js
describe('Testing ComboQuery.js methods', function() {
//Test 1: Test 'query' is not null 
//
	describe('Testing query is not null', function() {
		it('Connection should not be null', function() {
				//console.log(query.comboQuery());
			assert(query.comboQuery() != null);
		});	
	});
	
//Test 2: Test the query results are correct for each of the 8 possbilites
//Possiblitly 1: no sorting 
	describe('Code query should return correct results', function() {
		it('Possiblitly 1: no sorting ', function() {
			
			var promise1 = new Promise(function(resolve, reject) 
			{ 
			setTimeout(function() {
			query.comboQuery(039,null,null,null,null); 
			}, 300);
			});
			
			var x = promise1.then((value) =>	{
			return value;
			});
			
			console.log(x);
			
			var one = false;
			
			
			var two = false;
			var three = false;
			var four = false;
			assert(one);
			
			
		});	
	});
	
//Test 3: Test the query results are correct for each of the 8 possbilites
//Possiblitly 2: just min max sorting 
	describe('Code query should return correct results', function() {
		it('Possiblitly 2: just min max sorting', function() {
			//code
			assert(false);
		});	
	});
	
//Test 4: Test the query results are correct for each of the 8 possbilites
//Possiblitly 3: zipcode sorting 
	describe('Code query should return correct results', function() {
		it('Possiblitly 3: zipcode sorting ', function() {
			//code
			assert(false);
		});	
	});
	
//Test 5: Test the query results are correct for each of the 8 possbilites
//Possiblitly 4: state sorting
	describe('Code query should return correct results', function() {
		it('Possiblitly 4: state sorting ', function() {
			//code
			assert(false);
		});	
	});
	
//Test 6: Test the query results are correct for each of the 8 possbilites
//Posibillity 5: sort by state with min and max
	describe('Code query should return correct results', function() {
		it('Posibillity 5: sort by state with min and max', function() {
			//code
			assert(false);
		});	
	});
	
//Test 7: Test the query results are correct for each of the 8 possbilites
//Possiblitly 6: sort by zipcode with min and max 
	describe('Code query should return correct results', function() {
		it('Possiblitly 6: sort by zip code with min and max', function() {
			//code
			assert(false);
		});	
	});
	
//Test 8: Test the query results are correct for each of the 8 possbilites
//Possiblitly 7: search by zip code in state
	describe('Code query should return correct results', function() {
		it('Possiblity 7: search by zipcode in state', function() {
			//code
			assert(false);
		});	
	});
	
//Test 9: Test the query results are correct for each of the 8 possbilites
//Possiblitly 8: search by zipcode of state with sort 
	describe('Code query should return correct results', function() {
		it('Possiblitly 8: search by zipcode of state with sort ', function() {
			//code
			assert(false);
		});	
	});
});

