var express = require('express');
var router = express.Router();
var connection = require('../lib/db');

var sql = require('mssql');
var cors = require('cors')
var app = express()

//CORS - cross orgin resource sharing this is enabled to allow requests to be made from another port on this machine
router.use(cors())

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


/*GET request - return top 200 records, currently for testing purposes FOR AZURE SERVER CONNECTION*/
router.get('/azure', function(req, res, next) {

    var code = req.query.code;
    var req = new sql.Request(connection);
    req.query(('SELECT TOP 200 * FROM [DataSet] where substring(dRGDefinition, 1, 3)=' + code), function(err, results) {

        if (err) {
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        } else {

            res.send(results.recordset); //returns the results as JSON
        }

    });
});



/*POST Request*/
router.post('/', function(req, res) {
    res.send('Got a POST request')
})

/*PUT Request*/
router.put('/user', function(req, res) {
    res.send('Got a PUT request at /user')
})

/*DELETE Request*/
router.delete('/user', function(req, res) {
    res.send('Got a DELETE request at /user')
})


// router.get('/test', function(req, res, next) {
//     connection.query('SELECT * FROM user', function(err, rows, fields) {
//         var item;

//         if (err) {
//             res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
//         } else {
//             // Check if the result is found or not
//             // if (rows.length == 1) {
//             // Create the object to save the data.
//             var item = {
//                     'id': rows[0].id,
//                     'name': rows[0].firstName,

//                 }
//                 // render the details.plug page.
//             res.render('test', { "item": item });
//             // } else {
//             //     // render not found page
//             //     res.status(404).json({ "status_code": 404, "status_message": "Not found" });
//             // }
//         }

//     });
// });

/*FOR SILVA SQL DATABASE CONNECTION */
router.get('/silva', function(req, res, next) {

    var code = req.query.code;

    connection.query(('SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' LIMIT 20000'), function(err, results) {

        if (err) {
            console.log(err);
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        } else {

            res.send(results); //returns the results as JSON
        }

    });
});

//query to sort the search results by price in ascending order
router.get('/sortpriceasc', function(req, res, next) {

    var code = req.query.code;

    connection.query(('SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' ORDER BY averageTotalPayments ASC LIMIT 200'), function(err, results) {

        if (err) {
            console.log(err);
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        } else {

            res.send(results); //returns the results as JSON
        }

    });
});


//query to filter the results by providerZipCode
router.get('/filterzipcode', function(req, res, next) {

    var code = req.query.code
    var zipcode = req.query.zipcode

    connection.query(('SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND providerZipCode=' + zipcode + ' LIMIT 200'), function(err, results) {

        if (err) {
            console.log(err);
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        } else {

            res.send(results); //returns the results as JSON
        }

    });
});

router.get('/filterstate', function(req, res, next) {

    var code = req.query.code;
    var state = req.query.state;

    connection.query(('SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND providerState="' + state + '" LIMIT 200'), function(err, results) {

        if (err) {
            console.log(err);
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        } else {

            res.send(results); //returns the results as JSON
        }

    });
});

//query to get the provider info from procedure code
router.get('/providerinfo', function(req, res, next) {

    var code = req.query.code;

    connection.query(('SELECT alldata.dRGDefinition, alldata.providerId, alldata.providerName,alldata.averageTotalPayments, alldata.providerStreetAddress, alldata.providerCity, alldata.providerState, alldata.providerZipCode, output2017.latitude, output2017.longitude from alldata inner join output2017 on alldata.providerId = output2017.providerId WHERE substr(alldata.dRGDefinition, 1, 3) =' + code + ' LIMIT 200'), function(err, results) {

        if (err) {
            console.log(err);
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        } else {

            res.send(results); //returns the results as JSON
        }

    });
});

router.get('/procedurelist', function(req, res, next){
    var query = 'SELECT DISTINCT alldata.dRGDefinition from alldata';
    connection.query(query, function(err, results){
        if(err){
            console.log(err);
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        }
        else{
            res.send(results);
        }
    });
});

/*SORT*/
router.get('/pricerange', function(req, res, next) {

    var code = req.query.code;
    var max = req.query.max;
    var min = req.query.min;

    connection.query(('SELECT * FROM alldata WHERE substring(dRGDefinition, 1, 3)=' + code + ' AND averageTotalPayments BETWEEN ' + min + ' AND ' + max + ' LIMIT 200'), function(err, results) {

        if (err) {
            console.log(err);
            res.status(500).json({ "status_code": 500, "status_message": "internal server error" + err });
        } else {

            res.send(results); //returns the results as JSON
        }

    });
});


module.exports = router;