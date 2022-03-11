window.onload = () => {
	startPage();
}

var planke;
var khawm = "";
var direction = "";
var lastLocation = "";
var apple = [0,0];
var size;
var textures = {0:"default",1:"holy-shit",2:"ukraina",3:"duda"}

function startPage(){
	document.getElementsByTagName("main")[0].innerHTML='Tekstury:<br><input id="textures" type="range" min="0" max="'+(Object.keys(textures).length-1)+'" value="0"><br><span id="texturesDisplay">default</span><br><br><div id="texturesPresentation"><div id="texturesPresentation"><img src="resources/default/skin0.png"><img src="resources/default/skin1.png"><img src="resources/default/skin2.png"> <img src="resources/default/fruit.png"> <img src="resources/default/background.png"></div></div><br>Wysokość planszy:<input id="plankeHeight" type="range" min="1" max="8" value="4"><span id="plankeHeightDisplay">15</span><br>Szerokość planszy:<input id="plankeWidth" type="range" min="1" max="8" value="4"><span id="plankeWidthDisplay">11</span><br>Szybkość:<input id="plankeSpeed" type="range" min="0" max="4" value="2"><span id="plankeSpeedDisplay">normalna</span><br><br><button onclick=\'start((document.querySelector("#plankeHeight").value*2+4),(document.querySelector("#plankeWidth").value*2+6))\'>Rozpocznij!</button>';
	document.querySelector("#textures").oninput = function() {
		var fldName = textures[this.value]
		document.querySelector("#texturesDisplay").innerHTML = fldName+":";
		document.querySelector("#texturesPresentation").innerHTML = '<img src="resources/'+fldName+'/skin0.png"><img src="resources/'+fldName+'/skin1.png"><img src="resources/'+fldName+'/skin2.png">&emsp;<img src="resources/'+fldName+'/fruit.png">&emsp;<img src="resources/'+fldName+'/background.png">';
		document.documentElement.style .setProperty('--skin0', 'url("resources/'+fldName+'/skin0.png")');
		document.documentElement.style .setProperty('--skin1', 'url("resources/'+fldName+'/skin1.png")');
		document.documentElement.style .setProperty('--skin2', 'url("resources/'+fldName+'/skin2.png")');
		document.documentElement.style .setProperty('--bgground', 'url("resources/'+fldName+'/background.png")');
		document.documentElement.style .setProperty('--fruit', 'url("resources/'+fldName+'/fruit.png")');
	}
	document.querySelector("#plankeHeight").oninput = function() {
		document.querySelector("#plankeHeightDisplay").innerHTML = this.value*2+7;
	}
	document.querySelector("#plankeWidth").oninput = function() {
		document.querySelector("#plankeWidthDisplay").innerHTML = this.value*2+5;
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
function game(){ var interwalel = setInterval(() => {
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
			document.querySelector("#snake").innerHTML += '<div class="a '+ins+'" style="top:'+planke[i][0]*50+'px; left:'+planke[i][1]*50+'px;"></div>';
		}
		/* Wyświetlanie głowy wonża */
		document.querySelector("#snake").innerHTML += '<div class="a c" style="top:'+planke[planke.length-1][0]*50+'px; left:'+planke[planke.length-1][1]*50+'px;"></div>';
		/* Wyświetlanie owoceła */
		document.querySelector("#snake").innerHTML += '<div id="frucht" style="top:'+apple[0]*50+'px; left:'+apple[1]*50+'px;"></div>';
	}
},200);}
function start(x=size[0],y=size[1]){
	size = [x,y];
	direction = "";
	khawm = "";
	document.documentElement.style.setProperty('--headdirection', "0 0 0 0");
	planke = [[Math.floor((x+1)/2),Math.floor((y+1)/2)],[Math.floor((x+1)/2),Math.floor((y+1)/2)],[Math.floor((x+1)/2),Math.floor((y+1)/2)]];
	document.documentElement.style .setProperty('--hei', x+1);
	document.documentElement.style .setProperty('--wid', y+1);
	document.getElementsByTagName("main")[0].innerHTML='<div id="snake"></div>';
	game();
}
document.addEventListener('keydown', (e) => {
	khawm = e.code;
});
