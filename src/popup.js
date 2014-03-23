function disableAll() {
    var urlSwitch = document.getElementById("urlSwitch");
    var storedUrlSwitch = JSON.parse(localStorage["urlSwitch"]);
    document.getElementById("all").disabled = true;
    for (var i = 0; i < storedUrlSwitch.length; ++i) {
        urlSwitch.children[i*3].disabled = true;
    }
}
function enableAll() {
    var urlSwitch = document.getElementById("urlSwitch");
    var storedUrlSwitch = JSON.parse(localStorage["urlSwitch"]);
    document.getElementById("all").disabled = false;
    for (var i = 0; i < storedUrlSwitch.length; ++i) {
        urlSwitch.children[i*3].disabled = false;
    }
}

// Saves options to localStorage.
function save_options() {
    var status = document.getElementById("status");
    var urlSwitch = document.getElementById("urlSwitch");
    var storedUrlSwitch = JSON.parse(localStorage["urlSwitch"]);
    for (var i = 0; i < storedUrlSwitch.length; ++i) {
        if (urlSwitch.children[i].children[0].checked) {
            storedUrlSwitch[i] = 1;
        }
        else {
            storedUrlSwitch[i] = 0;
        }
    }
    localStorage["urlSwitch"] = JSON.stringify(storedUrlSwitch);//save back

    // Update status to let user know options were saved.
    status.innerHTML = "Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 500);

    if(document.getElementById("blockButton").checked == true) {
        localStorage["mode"] = 1;
    }
    else {
        localStorage["mode"] = 0;
    }
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var status = document.getElementById("status");
    var urlSwitch = document.getElementById("urlSwitch");
    var storedUrlSwitch = JSON.parse(localStorage["urlSwitch"]);

    console.log("init" + localStorage["urlSwitch"]);

    for (var i = 0; i < storedUrlSwitch.length; ++i) {
        if (storedUrlSwitch[i] === 1) {
            urlSwitch.children[i].children[0].checked = true;
        }
    }

    if(localStorage["mode"] == 1) {
        document.getElementById("remindButton").checked = false;
        document.getElementById("blockButton").checked = true;
        //enableAll();
    }
    else {
        document.getElementById("remindButton").checked = true;
        document.getElementById("blockButton").checked = false;
        //disableAll();
    }
}

function switchAllByButton() {
    var allChecked = document.getElementById("all").checked;
    var urlSwitch = document.getElementById("urlSwitch");
    var storedUrlSwitch = JSON.parse(localStorage["urlSwitch"]);

    for (var i = 0; i < storedUrlSwitch.length; ++i) {
        urlSwitch.children[i].children[0].checked = allChecked;
    }
}

function remindModeChoosed() {
    document.getElementById("blockButton").checked = false;
    //disableAll();
}

function blockModeChoosed() {
    document.getElementById("remindButton").checked = false;
    //enableAll();
}


document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#all').addEventListener('click', switchAllByButton);
document.querySelector('#remindButton').addEventListener('click', remindModeChoosed);
document.querySelector('#blockButton').addEventListener('click', blockModeChoosed);