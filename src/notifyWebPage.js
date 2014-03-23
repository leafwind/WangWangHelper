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
alertDiv.style.left = window.innerWidth-250 + 'px';
alertDiv.style.top = window.innerHeight/2-100 + 'px';

alertCanvas.width = 200;
alertCanvas.height = 120;

var alertContext = alertCanvas.getContext('2d');

alertContext.beginPath();
alertContext.rect(0, 0, 200, 120);
alertContext.fillStyle = 'rgba(255,150,150,0.9)';
alertContext.fill();

alertContext.font = '24px Arial';
alertContext.fillStyle = 'rgba(0,0,0,1)';
alertContext.fillText('此網頁為', 20, 30);
alertContext.fillText('旺中集團所有', 20, 54);
alertContext.fillText('建議多方比較', 20, 78);
alertContext.fillText('勿輕信單一來源', 20, 102);
