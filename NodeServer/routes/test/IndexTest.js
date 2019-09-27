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

//pretested as above
var connection = mysql.createConnection({
			host: 'silva.computing.dundee.ac.uk',
			user: '2019indteam5',
			password: '9854.ind5.4589',
			database: '2019indteam5db'
			});	
			
var sql = require('mssql');
var cors = require('cors')
var app = express()
var query = require('../IndexForTest.js');
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
	
	
	describe('Establish connection', function() {
		it('connection should not be null', function() {		
		assert(connection !== null);
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
		assert(connection !== null);
		});
	});
	
	//Test 2: select all query
	//We will run a select all query and check the start, end, size and a result in the middle, all being correct should return true, as these result are impossible to spoof
	describe('Select all query', function() {
		it('Silva should return all records', function() {
		//code
		assert(false)
		});
	});
});


