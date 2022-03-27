window.onload = () => {
	window.onresize = boxSize
	boxSize()
	startPage()
}

var interwalel;
var planke;
var size;
var khawm = "";
var direction = "";
var heightBar = 4;
var realHeight = heightBar*2+7;
var widthBar = 4;
var realWidth = widthBar*2+5;
var speedBar = 2;
var speed = 200;
var apple = [0,0];
var texturesBar = 0;
var textures = {0:"default",1:"holy-shit",2:"ukraina",3:"duda",4:"arnold"}
var spit = {0:"bardzo wolna",1:"wolna",2:"normalna",3:"szybka",4:"bardzo szybka"}
var bsize = 50

function boxSize() {
	//var bs1 = Math.floor(window.innerHeight / (heightBar*2+9) - 3)
	//var bs2 = Math.floor(window.innerWidth / (widthBar*2+7) + 1)
	//console.log(window.innerWidth+" "+bs2)
	//bsize = bs1>bs2?bs1:bs2
	//bsize = bs1
	//document.documentElement.style.setProperty('--box-size', bsize+'px');
}
function startPage(){
	console.log(texturesBar);
	document.getElementsByTagName("main")[0].innerHTML='<h1>Swobodny wenż</h1>Tekstury:<br><input id="textures" type="range" min="0" max="'+(Object.keys(textures).length-1)+'" value="'+texturesBar+'"><br><span id="texturesDisplay">'+textures[texturesBar]+'</span><br><br><div id="texturesPresentation"><div id="texturesPresentation"><img src="resources/'+textures[texturesBar]+'/skin0.png"><img src="resources/'+textures[texturesBar]+'/skin1.png"><img src="resources/'+textures[texturesBar]+'/skin2.png"> <img src="resources/'+textures[texturesBar]+'/fruit.png"> <img src="resources/'+textures[texturesBar]+'/background.png"></div></div><br>Wysokość planszy:<input id="plankeHeight" type="range" min="1" max="8" value="'+heightBar+'"><span id="plankeHeightDisplay">'+realHeight+'</span><br>Szerokość planszy:<input id="plankeWidth" type="range" min="1" max="8" value="'+widthBar+'"><span id="plankeWidthDisplay">'+realWidth+'</span><br>Szybkość:<input id="plankeSpeed" type="range" min="0" max="4" value="'+speedBar+'"><span id="plankeSpeedDisplay">normalna</span><br><br><button onclick=\'start(realHeight,realWidth)\'>Rozpocznij!</button>';
	document.querySelector("#textures").oninput = function(){
		texturesBar = this.value;
		var fldName = textures[texturesBar];
		document.querySelector("#texturesDisplay").innerHTML = fldName+":";
		document.querySelector("#texturesPresentation").innerHTML = '<img src="resources/'+fldName+'/skin0.png"><img src="resources/'+fldName+'/skin1.png"><img src="resources/'+fldName+'/skin2.png">&emsp;<img src="resources/'+fldName+'/fruit.png">&emsp;<img src="resources/'+fldName+'/background.png">';
		document.documentElement.style.setProperty('--skin0', 'url("resources/'+fldName+'/skin0.png")');
		document.documentElement.style.setProperty('--skin1', 'url("resources/'+fldName+'/skin1.png")');
		document.documentElement.style.setProperty('--skin2', 'url("resources/'+fldName+'/skin2.png")');
		document.documentElement.style.setProperty('--bgground', 'url("resources/'+fldName+'/background.png")');
		document.documentElement.style.setProperty('--fruit', 'url("resources/'+fldName+'/fruit.png")');
	}
	document.querySelector("#plankeHeight").oninput = function(){
		heightBar = this.value;
		realHeight = heightBar*2+9;
		document.querySelector("#plankeHeightDisplay").innerHTML = realHeight;
		boxSize()
	}
	document.querySelector("#plankeWidth").oninput = function(){
		widthBar = this.value;
		realWidth = widthBar*2+7;
		document.querySelector("#plankeWidthDisplay").innerHTML = realWidth;
		boxSize()
	}
	document.querySelector("#plankeSpeed").oninput = function(){
		speedBar = this.value;
		document.querySelector("#plankeSpeedDisplay").innerHTML = spit[speedBar];
		if (this.value == 0){
			speed = 500;
		}
		else if (this.value == 1){
			speed = 300;
		}
		else if (this.value == 2){
			speed = 200;
		}
		else if (this.value == 3){
			speed = 100;
		}
		else if (this.value == 4){
			speed = 50;
		}
	}
}

function placeApple(){
	var repeat = true;
	while (repeat){
		repeat = false;
		var x = Math.floor(Math.random()*size[0]);
		var y = Math.floor(Math.random()*size[1]);
		for (const i of planke){
			if(i[0]==x && i[1]==y){
				repeat = true;
			}
		}
	}
	apple = [x,y];
}
function game(){
	var panzerkampfwagen = "";
	var xmov = 0;
	var ymov = 0;

	/* Określenie kierunku */
	if (khawm=="ArrowUp" && direction!="down"){
		direction = "up";
	}
	else if (khawm=="ArrowDown" && direction!="up"){
		direction = "down";
	}
	else if (khawm=="ArrowLeft" && direction!="right"){
		direction = "left";
	}
	else if (khawm=="ArrowRight" && direction!="left"){
		direction = "right";
	}

	/* Ruch */
	if (direction == "up"){
		ymov = -1;
		document.documentElement.style.setProperty('--headdirection', "50% 50% 0 0");
	}
	else if (direction == "down"){
		ymov = 1;
		document.documentElement.style.setProperty('--headdirection', "0 0 50% 50%");
	}
	else if (direction == "left"){
		xmov = -1;
		document.documentElement.style.setProperty('--headdirection', "50% 0 0 50%");
	}
	else if (direction == "right"){
		xmov = 1;
		document.documentElement.style.setProperty('--headdirection', "0 50% 50% 0");
	}

	/* Tworzenie w tablicy nowego punktu bycia wonza */
	if (xmov != 0 || ymov != 0){
		planke.push([(planke[planke.length-1][0] + ymov),(planke[planke.length-1][1] + xmov)])
	}
	var lose = false
	/* sprawdzanie samouderzenia */
	for (var i = 0; i<planke.length-1; i++){
		if(planke[i]+""==planke[planke.length-1]+"" && direction!=""){
			lose = true
		}
	}
	if ((planke[planke.length-1][0]>size[0] || planke[planke.length-1][1]>size[1] || planke[planke.length-1][0]<0 || planke[planke.length-1][1]<0) || lose){
		/* W razie przegranej */
		document.querySelector("#snake").innerHTML += '<span id="snejklus">Przegrałeś!!!</span><div id="wynikulus">Wynik: '+(planke.length-4)+'</div><div id="divulus"><button onclick="start()">Jeszcze raz</button> <button onclick="startPage()">Zmień ustawienia</button></div>';
		clearInterval(interwalel);
		khawm = "";
	}
	else{
		document.querySelector("#snake").innerHTML = "";
		/* Sprawdzanie czy jabłko wszamane i losowanie mu nowej pozycji */
		if ((planke[planke.length-1][0] == apple[0] && planke[planke.length-1][1] == apple[1]) == false && direction != ""){
			planke.splice(0,1)
		}
		else{
			placeApple();
		}
		/* Wyświetlanie ciała wonża */
		for (var i = 0; i < planke.length-1; i++){
			if ((planke.length-i)%2==0){
				var ins = "ba";
			}
			else{
				var ins = "bb"
			}
			document.querySelector("#snake").innerHTML += '<div class="a '+ins+'" style="top:'+planke[i][0]*bsize+'px; left:'+planke[i][1]*bsize+'px;"></div>';
		}
		/* Wyświetlanie głowy wonża */
		document.querySelector("#snake").innerHTML += '<div class="a c" style="top:'+planke[planke.length-1][0]*bsize+'px; left:'+planke[planke.length-1][1]*bsize+'px;"></div>';
		/* Wyświetlanie owoceła */
		document.querySelector("#snake").innerHTML += '<div id="frucht" style="top:'+apple[0]*bsize+'px; left:'+apple[1]*bsize+'px;"></div>';
	}
}
function start(x=size[0],y=size[1]){
	size = [x,y];
	direction = "";
	khawm = "";
	document.documentElement.style.setProperty('--headdirection', "0 0 0 0");
	planke = [[Math.floor((x+1)/2),Math.floor((y+1)/2)],[Math.floor((x+1)/2),Math.floor((y+1)/2)],[Math.floor((x+1)/2),Math.floor((y+1)/2)]];
	document.documentElement.style .setProperty('--hei', x+1);
	document.documentElement.style .setProperty('--wid', y+1);
	document.getElementsByTagName("main")[0].innerHTML='<div id="snake"></div>';
	interwalel = setInterval(game,speed);
	game();
}
document.addEventListener('keydown', (e) => {
	khawm = e.code;
});
