function getBlockedURL()
{
    if (localStorage["blockedURL"] != undefined)
        return localStorage["blockedURL"];
    else
        return "";
}

function getLocalStorageCount()
{
    return localStorage["count"];
}
function prompt()
{
    var blockedURLField = document.getElementById("blockedURLField");
    var URL = getBlockedURL();
    blockedURLField.innerHTML = URL;
    blockedURLField.href = URL;

    var countField = document.getElementById("countField");
    countField.innerHTML = getLocalStorageCount();
}

document.addEventListener('DOMContentLoaded', prompt);