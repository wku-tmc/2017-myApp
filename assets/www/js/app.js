// Wait for Cordova to load
document.addEventListener('deviceready', onDeviceReady, false);

var myDB = null;

// Cordova is ready
function onDeviceReady() {

//Code adapted from http://phonegappro.com/tutorials/phonegap-sqlite-tutorial-with-example-apache-cordova/

//Creating New Database using phonegap with SQLite Plugin
myDB = window.sqlitePlugin.openDatabase({ name: "mySQLite.db", location: 'default' });

// Creating New Table using phonegap with SQLite Plugin
 myDB.transaction(function(transaction) {
    var sql = 'CREATE TABLE IF NOT EXISTS activities (id integer primary key autoincrement, activity text, location text, date text, time text, reporter text)';
    transaction.executeSql(sql, [],
        function(tx, result) {
            // alert("Table created successfully");
        },
        function(error) {
            alert("Error occurred while creating the table.");
        });
 });


}

$("#btn-addactivity").click(function() {
    insertActivity();
});

function insertActivity() {
    var activity = $("#activity").val();
    var location = $("#location").val();
    var date = $("#date").val();
    var time = $("#time").val();
    var reporter = $("#reporter").val();

    myDB.transaction(function(transaction) {
        var sql = "INSERT INTO activities (activity, location, date, time, reporter) VALUES (?,?,?,?,?)";
        transaction.executeSql(sql, [activity, location, date, time, reporter]
            , function(tx, result) {
                alert('Inserted activity');
            },
            function(error) {
                alert('Could not add activity');
            });
    });

}



