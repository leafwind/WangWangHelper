function draw (mediaName) {
    document.title = '小心！您可能是旺中媒體的受害者！';

    var bgDiv = document.createElement('div');
    var bgCanvas = document.createElement('canvas');
    document.body.appendChild( bgDiv );
    bgDiv.appendChild(bgCanvas);
    //canvas.id = 'myCanvas';

    bgDiv.style.position = 'fixed';
    bgDiv.style.left = '0px';
    bgDiv.style.top = '0px';
    bgDiv.style.pointerEvents = 'none';
    bgDiv.style.zIndex = 2147483647-1;

    bgCanvas.width = window.innerWidth-15;
    bgCanvas.height = window.innerHeight-15;
    bgCanvas.style.pointerEvents = 'none';

    var bgContext = bgCanvas.getContext('2d');
    bgContext.beginPath();
    bgContext.rect(0, 0, window.innerWidth-15, window.innerHeight-15);
    bgContext.fillStyle = 'rgba(255,0,0,0)';
    bgContext.fill();
    bgContext.lineWidth = 10;
    bgContext.strokeStyle = 'red';
    bgContext.stroke();


    var alertDiv = document.createElement('div');
    var alertCanvas = document.createElement('canvas');
    document.body.appendChild( alertDiv );
    alertDiv.appendChild(alertCanvas);
    alertDiv.style.position = 'fixed';
    alertDiv.style.left = 20 + 'px';
    alertDiv.style.top = window.innerHeight/2-100 + 'px';
    alertDiv.style.zIndex = 2147483647;
    // make sure the alert windows will appear at the top

    alertCanvas.width = 220;
    alertCanvas.height = 120;

    var alertContext = alertCanvas.getContext('2d');

    alertContext.beginPath();
    alertContext.rect(0, 0, alertCanvas.width, alertCanvas.height);
    alertContext.fillStyle = 'rgba(255,150,150,0.9)';
    alertContext.fill();

    alertContext.font = '24px 微軟正黑體,Microsoft JhengHei,新細明體,serif,Arial';
    alertContext.fillStyle = 'rgba(0,0,0,1)';
    alertContext.fillText('此新聞為旺中集團', 15, 30);
    alertContext.fillText(mediaName+' 所發佈', 15, 56);
    alertContext.fillText('建議多方比較', 15, 82);
    alertContext.fillText('勿輕信單一來源', 15, 108);
}


$.fn.exists = function () {
    return this.length !== 0;
}