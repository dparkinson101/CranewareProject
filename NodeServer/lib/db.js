/*CHANGE TO CORRECT DATABASE CONFIG*/

/*SILVA DATABASE CONFIG */

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'silva.computing.dundee.ac.uk',
    user: '2019indteam5',
    password: '9854.ind5.4589',
    database: '2019indteam5db'
});


connection.connect(function(error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected!:)');
    }
});

module.exports = connection;


/*AZURE DATA BASE CONFIG */

// var sql = require("mssql");
// var config = {
//     server: 'ac41004.database.windows.net',
//     user: 'sarah',
//     password: 'Cwogee24',
//     database: 'Craneware',
//     port: 1433,
//     // Since we're on Windows Azure, we need to set the following options
//     options: {
//         encrypt: true
//     }
// };


// var conn = sql.connect(config, function(err) {

//     if (err) {
//         console.log(err);
//     } else {
//         console.log('connected! :)');
//     }
//     // create Request object

// });

// module.exports = conn;