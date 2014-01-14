function getBlockedURL()
{
    if (localStorage["blockedURL"] != undefined)
        return localStorage["blockedURL"];
    else
        return "";
}

function prompt()
{
    var blockedURLField = document.getElementById("blockedURLField");
    var URL = getBlockedURL();
    blockedURLField.innerHTML = URL;
    blockedURLField.href = URL;
}

document.addEventListener('DOMContentLoaded', prompt);