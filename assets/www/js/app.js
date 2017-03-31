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

refreshListViewActivities(); //function call

}

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

    refreshListViewActivities();
}

//function definition
function refreshListViewActivities() {

    $("#listview-activities").empty();

    myDB.transaction(function(transaction) {
        var sql = 'SELECT * FROM activities';
        transaction.executeSql(sql, [], function(tx, results) {
            var len = results.rows.length, i;
//            alert("number = " + len);
            var output = "";
            for (i = 0; i < len; i++) {
                var id = results.rows.item(i).id;
                output += "<li id=" + id + ">"
                    + '<a href="#" class="update">'
                    + " " + id
                    + " " + results.rows.item(i).activity
                    + " " + results.rows.item(i).location
                    + " " + results.rows.item(i).date
                    + " " + results.rows.item(i).time
                    + " " + results.rows.item(i).reporter
                    + "</a>"
                    + '<a href="#" class="delete">Delete</a>'
                    + "</li>";
            }

            $("#listview-activities").append(output).listview("refresh");
        }, null);
    });
}

$('#form-addactivity').validate({
    rules: {
        activity: {
            required: true
        },
        date: {
            required: true
        },
        reporter: {
            required: true
        }
    },
    messages: {
        activity: {
            required: "Please enter the name of the activity"
        },
        date: {
            required: "Please enter the date of the activity"
        },
        reporter: {
            required: "Please enter the name of the reporter"
        }
    },
    errorPlacement: function (error, element) {
        error.appendTo(element.parent().prev());
    },
    submitHandler: function (form) {
        insertActivity();
        return false;
    }
});




