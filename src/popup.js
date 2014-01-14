// Saves options to localStorage.
function save_options() {
    var status = document.getElementById("status");
    var urlSwitch = document.getElementById("urlSwitch");
    var storedUrlSwitch = JSON.parse(localStorage["urlSwitch"]);
    for (var i = 0; i < storedUrlSwitch.length; ++i) {
        if (urlSwitch.children[i*3].checked) {
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
}

// Restores select box state to saved value from localStorage.
function restore_options() {
    var status = document.getElementById("status");
    var urlSwitch = document.getElementById("urlSwitch");
    var storedUrlSwitch = JSON.parse(localStorage["urlSwitch"]);

    console.log("init" + localStorage["urlSwitch"]);

    for (var i = 0; i < storedUrlSwitch.length; ++i) {
        if (storedUrlSwitch[i] === 1) {
            urlSwitch.children[i*3].checked = true;
        }
    }
}

function switchAll() {
    var allChecked = document.getElementById("all").checked;
    var urlSwitch = document.getElementById("urlSwitch");
    var storedUrlSwitch = JSON.parse(localStorage["urlSwitch"]);

    for (var i = 0; i < storedUrlSwitch.length; ++i) {
        urlSwitch.children[i*3].checked = allChecked;
    }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
document.querySelector('#all').addEventListener('click', switchAll);


