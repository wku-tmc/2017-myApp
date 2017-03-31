// Wait for Cordova to load
document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

//    alert("onDeviceReady"); //
//    navigator.notification.alert(
//        'Welcome to TMC',  // message
//        alertDismissed,         // callback
//        'Hi',            // title
//        'OK'                  // buttonName
//
//    );

jQuery.getFeed({
    url: "http://planet.gnome.org/rss20.xml",
    success: function(feed) {
        for (var i = 0; i < feed.items.length; i++) {
            var item = feed.items[i];
            appendPost(item);
        }

        $("#posts").listview("refresh");
    },
    error: function(error) {
        console.log("error in accessing feed");
    }
});

}


function appendPost(item) {
//    $("#posts").append("<li>" + item.title + "</li>");
var link = $("<a />").attr("href", item.link);
$("<h3 />").append(item.title).appendTo(link);
$("<p />").append(item.updated).appendTo(link);
var li = $("<li />").append(link);
$("#posts").append(li);

}


function alertDismissed() {
    // do something
}

