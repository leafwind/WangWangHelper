function getBlockedURL()
{
    if (localStorage["blockedURL"] !== undefined)
        return localStorage["blockedURL"];
    else
        return "";
}

function getLocalStorageCount() {
    return localStorage["count"];
}

function prompt()
{
    var blockedURLField = document.getElementById("blockedURLField");
    if ( blockedURLField != undefined)
    {
        var URL = getBlockedURL();
        blockedURLField.innerHTML = URL;
        //blockedURLField.href = URL;
    }
    var countField = document.getElementById("countField");
    if ( countField != undefined) {
        countField.innerHTML = getLocalStorageCount();
    }
}

document.addEventListener('DOMContentLoaded', prompt);