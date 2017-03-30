// Wait for Cordova to load
document.addEventListener('deviceready', onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
//    alert("onDeviceReady"); //
    navigator.notification.alert(
        'Welcome to TMC',  // message
        alertDismissed,         // callback
        'Hi',            // title
        'OK'                  // buttonName
    );
}


function alertDismissed() {
    // do something
}

