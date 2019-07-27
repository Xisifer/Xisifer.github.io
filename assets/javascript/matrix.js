// MATRIX BACKGROUND ANIMATION
// By: BRIAN GOSSELIN
// V1.0
// Permission granted to use this script in your webpage provided the

//GLYPH IMAGE FILE NAMES.
var glyphs=['p1.jpg','p2.jpg','p3.jpg','p4.jpg','p5.jpg','p6.jpg','p7.jpg','p8.jpg','p9.jpg','p10.jpg']; 

var glyphs_b=['p1b.jpg','p2b.jpg','p3b.jpg','p4b.jpg','p5b.jpg','p6b.jpg','p7b.jpg','p8b.jpg','p9b.jpg','p10b.jpg']; 


var glyphCount=400;      // TOTAL NUMBER OF GLYPHS.
var scrollSpeed=60;      // SPEED OF ANIMATION
var glyphD=15;           // GLYPH IMAGE WIDTH AND HEIGHT.
var disableColors=false; // SET TO true TO DISABLE THE "BRIGHTER" IMAGES (BETTER PREFORMANCE). SET TO false TO ENABLE THEM.

//************ DO NOT EDIT BEYOND HERE *************\\

var w3c=(document.getElementById)?true:false;
var ns4=(document.layers)?true:false;
var ie4=(document.all && !w3c)?true:false;
var ie5=(document.all && w3c)?true:false;
var ns6=(w3c && navigator.appName.indexOf("Netscape")>=0)?true:false;
var ids=new Array();
var wWidth, wHeight, colHeight;
var t='';
var counter=0;
var gx=new Array();
var ga=new Array();

for(i=0;i<glyphCount;i++){
    gx[i]=Math.floor(Math.random()*glyphs.length);
    t+=(ns4)?'<layer name="glyph'+i+'" top="-'+glyphD+'" left="0" width="'+glyphD+'" height="'+glyphD+'" z-index="1">':'<div id="glyph'+i+'" style="position:absolute; top:-'+glyphD+'px; left:0px; width:'+glyphD+'px; height:'+glyphD+'px; z-index:1">';
    t+='<img src="'+glyphs[gx[i]]+'" width='+glyphD+' height='+glyphD+' name="g'+i+'">';
    t+=(ns4)?'</layer>':'</div>';
}
document.write(t);

for(i=0;i<glyphs.length;i++){
    ga[i]=new Image();
    ga[i].src=glyphs_b[i];
}

    function matrixInit(){
    getWindowDims();
    for(i=0;i<glyphCount;i++){
    ids[i]=(ns4)?document.layers['glyph'+i]:(ie4)?document.all['glyph'+i]:document.getElementById('glyph'+i);
    ids[i].gx=gx[i];
    }
    gx='';
    //setInterval('scrollGlyphs()',10*scrollSpeed);
    scrollGlyphs();
}

function brighten(idnum,b){
    if(ns4) 
        ids[idnum].document.images['g'+idnum].src=(b)?glyphs_b[ids[idnum].gx]:glyphs[ids[idnum].gx];
    else 
        document.images['g'+idnum].src=(b)?glyphs_b[ids[idnum].gx]:glyphs[ids[idnum].gx];
}

    function moveID(idnum,x,y){
    var id=ids[idnum];
    if(ns4)
        id.moveTo(x,y);
    else{
        id.style.left=x+'px';
        id.style.top=y+'px';
    }
    if(!disableColors){
        brighten(idnum,true);
        setTimeout('brighten('+idnum+',false)',scrollSpeed*1.3);
    }
}

function getWindowDims(){
    wWidth=(ie4||ie5)? document.body.clientWidth:window.innerWidth;
    wHeight=(ie4||ie5)? document.body.clientHeight:window.innerHeight;
    colHeight=Math.min(Math.floor(wHeight/1.5/glyphD)-1,25);
}

function scrollGlyphs(){
    var sx=(ie4||ie5)? document.body.scrollLeft:window.pageXOffset;
    var sy=(ie4||ie5)? document.body.scrollTop:window.pageYOffset;
    var pixx=Math.floor(Math.random()*wWidth/(glyphD+1))*glyphD+sx;
    var pixy=Math.floor(Math.random()*(wHeight-(colHeight*glyphD)))+sy;
    for(i=0; i<colHeight; i++){
        setTimeout('moveID('+counter+','+pixx+','+(pixy+glyphD*i)+')', scrollSpeed*i);
        counter=((counter+colHeight)>glyphCount)?0:counter+1;
    }
    setTimeout('scrollGlyphs()', scrollSpeed*colHeight/2);
}

window.onload=matrixInit;
window.onresize=getWindowDims;







