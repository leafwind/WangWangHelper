/**
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function roundRect(ctx, x, y, width, height, radius, fill, fillStyle, stroke) {
  if (typeof stroke == "undefined" ) {
    stroke = true;
  }
  if (typeof radius === "undefined") {
    radius = 5;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (stroke) {
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }        
}

/*
function triangle(ctx, x1, y1, x2, y2, x3, y3, fill, fillStyle, stroke) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x3,y3);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
    }
}
*/

function getDiv(divID) {
    var div;
    if ( $("#"+divID).exists() ) {
        div = $("#"+divID)[0];
    } 
    else {
        div = document.createElement('div');
        document.body.appendChild(div);
        div.id = divID;
    }
    return div;
}

function getCanvas(canvasID){
    var canvas;
    if ( $("#"+canvasID).exists() ) {
        canvas = $("#"+canvasID)[0];
    } 
    else {
        canvas = document.createElement('canvas');
        canvas.id = canvasID;
    }
    return canvas;
}

function getScrollBarSize () {
    var scrollDiv = document.createElement("div");
    scrollDiv.style.width = "100px";
    scrollDiv.style.height = "100px";
    scrollDiv.style.overflow = "scroll";
    scrollDiv.style.position = "absolute";
    scrollDiv.style.top = "-9999px";
    document.body.appendChild(scrollDiv);

    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    var scrollbarHeight = scrollDiv.offsetHeight - scrollDiv.clientHeight;

    document.body.removeChild(scrollDiv);
    return [scrollbarWidth, scrollbarHeight];
}

// check current presence of H & V scrollbars
// @return array [ Boolean, Boolean ]
function getSBLive(w) {
    var d = w.document, c = d.compatMode;
    r = c && /CSS/.test(c) ? d.documentElement : d.body;
    if (typeof w.innerWidth == 'number') {
        // incredibly the next two lines serves equally to the scope
        // I prefer the first because it resembles more the feature
        // being detected by its functionality than by assumptions 
        return [ w.innerHeight > r.clientHeight, w.innerWidth > r.clientWidth ];
        return [ w.innerWidth > r.clientWidth, w.innerHeight > r.clientHeight ];
    }
    else {
        return [ r.scrollWidth > r.clientWidth, r.scrollHeight > r.clientHeight ];
    }
}

function draw (mediaName) {
    //set background canvas
    var bgDiv = getDiv("_bgDiv");
    var bgCanvas = getCanvas("_bgCanvas");
    bgDiv.appendChild(bgCanvas);

    bgDiv.style.position = 'fixed';
    bgDiv.style.left = '0px';
    bgDiv.style.top = '0px';
    bgDiv.style.pointerEvents = 'none';
    bgDiv.style.zIndex = 2147483647-1;

    var scrollBarSize = getScrollBarSize();
    scrollBarSize[0] = getSBLive(window)[1] ? scrollBarSize[0] : 0;
    scrollBarSize[1] = getSBLive(window)[0] ? scrollBarSize[1] : 0;
    bgCanvas.width = window.innerWidth-scrollBarSize[0];
    bgCanvas.height = window.innerHeight-scrollBarSize[1];
    bgCanvas.style.pointerEvents = 'none';

    var bgCtx = bgCanvas.getContext('2d');

    //set alert canvas
    var alertDiv = getDiv("_alertDiv");
    var alertCanvas = getCanvas("_alertCanvas");
    alertDiv.appendChild(alertCanvas);

    alertDiv.style.position = 'fixed';
    alertDiv.style.left = 20 + 'px';
    alertDiv.style.top = window.innerHeight/2-100 + 'px';
    alertDiv.style.pointerEvents = 'none';
    alertDiv.style.zIndex = 2147483647; // make sure it will appear at the top

    alertCanvas.width = 200;
    alertCanvas.height = 120;
    alertCanvas.style.pointerEvents = 'none';
    var w = alertCanvas.width;
    var h = alertCanvas.height;

    var alertCtx = alertCanvas.getContext('2d');

    bgCtx.clearRect(0, 0, bgCtx.width, bgCtx.height);
    bgCtx.beginPath();
    bgCtx.rect(0, 0, window.innerWidth-scrollBarSize[0], window.innerHeight-scrollBarSize[1]);
    bgCtx.fillStyle = 'rgba(0,0,0,0)';
    bgCtx.fill();
    bgCtx.lineWidth = 10;
    bgCtx.strokeStyle = 'rgba(255,0,0,0.8)';
    bgCtx.stroke();
    bgCtx.closePath();

    var fillStyle = 'rgba(255,150,150,0.8)';

    roundRect(alertCtx, 0, 0, w, h, 8, true, fillStyle, false);

    alertCtx.beginPath();
    alertCtx.font = '24px 微軟正黑體,Microsoft JhengHei,新細明體,serif,Arial';
    alertCtx.fillStyle = 'black';
    alertCtx.fillText('此新聞來源為', 26.5, 30);
    alertCtx.fillText( mediaName, (alertCanvas.width - getUTF8Length(mediaName)*12.5)/2, 56);
    alertCtx.fillText('建議多方比較', 26.5, 82);
    alertCtx.fillText('勿輕信單一來源', 14, 108);
    alertCtx.closePath();
}

$.fn.exists = function () {
    return this.length !== 0;
}

function getUTF8Length(string) {
    var utf8length = 0;
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) { utf8length++; }
        else if((c >= 128) && (c < 2048)) { utf8length = utf8length+2; }
        else { utf8length = utf8length+2; }
    }
    return utf8length;
 }

//document.addEventListener( "DOMContentLoaded", draw, false );
window.addEventListener('resize', function() {
    var mediaName = getDiv("_mediaName");
    if( mediaName.name !== undefined) {
        draw(mediaName.name);
    }
}, false);