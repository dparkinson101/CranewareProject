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
var query = require('../ComboQuery.js');
//Test for all results from database queries

//index.js
describe('Testing indexAddition.js methods', function() {
//Test 1: Test 'query' is not null 
//
	describe('Testing query is not null', function() {
		it('Connection should not be null', function() {
				//console.log(query.comboQuery());
			assert(query.comboQuery() != null);
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

