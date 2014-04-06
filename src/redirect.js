function getBlockedURL()
{
    if (localStorage["blockedURL"] !== undefined)
        return localStorage["blockedURL"];
    else
        return "unknown url";
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
        var count = getLocalStorageCount();
        if ( count ) {
            countField.innerHTML = count;
        }
    }
}

document.addEventListener('DOMContentLoaded', prompt);
