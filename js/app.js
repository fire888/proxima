/**
|***************************************\ 
*  Project        : Proxima 
*  Program name   : Main function 
*  Author         : www.otrisovano.ru
*  Date           : 15.03.17 
*  Purpose        : frames   
|***************************************/ 
/***************************************\ 
*				Variables
\***************************************/ 
var windowW=document.body.clientWidth-100; 
var windowH=screen.height - 400; 
var statusGame = "startMessage";
var distanceDamageW = 10;
var distanceDamageH = 10; 
var arrMonsters = [];	
var countDots = 0;	 
var idMonster = 0;
var idMonsterEndLevel = 20;
var gameCount = 0;
var messageGameOpacity = 1;
	 
var fonTimerCount = 0;
var fonHeight = 0;
var flagFonReady = false;

	 
dd = document.createElement('div');
dd.id = "messageGame" ; 	   
dd.innerHTML = "<p align=\"center\"><img src='assets/ava.png'>"+
	"<br/>С планеты Proxima B получен сигнал SOS.<br/>"+
	" <br/> Управление - клавиши:<br/> влево, вправо, вверх, вниз.</p> ";
dd.style.marginTop = windowH/2 - 100;
dd.style.marginLeft = windowW/2 - 450;	   
document.body.appendChild(dd);	    
		
var hero =  new Hero(windowW/2-15, 70, "<img src=\"assets/hero.png\">", "HERO");	
	 
/***************************************\ 
*			Frame per sec
\***************************************/ 
function sec(){
	//remove trash	  
	for ( a=0; a < arrMonsters.length; a++){ 	  
		if (arrMonsters[a].mustRemove == true){
			d = arrMonsters[a];
			arrMonsters.splice(a, 1);
			d = null;
			a--;
		} 			 
	} 	
	
	//update status game
	if (statusGame == "dieHero"){
		gameCount ++;
		if (gameCount == 1){
			m = document.getElementById("messageGame");
			m.innerHTML = "<p align=\"center\"><img src='assets/rip.png'>"+
				"<br/>Поражение...</p>"; 
		}
		if (gameCount < 40){
			m = document.getElementById("messageGame");			 
			messageGameOpacity = messageGameOpacity + 0.1;
			m.style.opacity = messageGameOpacity;	 
		}			 
	}
	if (statusGame == "startMessage"){
		if ( flagFonReady == false){
			if (fonTimerCount == 0){
				f2 = document.createElement('div');
				f2.id = "fon" ; 	   
				f2.innerHTML = "";
				f2.style.background = "url(assets/fon01.png) repeat #ffffff";				   
				f2.style.width = 100+ "%"; 
				f2.style.height = 0 + "px";	 
				document.body.appendChild(f2);	 				
			}
			fonTimerCount ++;
			fonHeight = fonHeight + fonHeight/3 + 5; 
			m = document.getElementById("fon");				
			m.style.height =	fonHeight+ "px";
			if (fonHeight > windowH + 500){
				document.body.style.background = "url(assets/fon01.png) repeat #ffffff";
				flagFonReady = true;  
				md = document.getElementById("fon");				  
				md.parentNode.removeChild(m);  
				fonHeight = 0;	
				fonTimerCount = 0;				  
			}  				
		}
		gameCount++;
		if ( gameCount > 100 ){
			m = document.getElementById("messageGame");
			messageGameOpacity = messageGameOpacity - 0.1;
			m.style.opacity = messageGameOpacity;		    
		}
		if (gameCount == 150){
			statusGame = "init";
			gameCount = 0;
			messageGameOpacity=0;			   
		}
	}
	if(statusGame == "init"){		  
		statusGame = "nashestvie1";
	}
	if (statusGame == "nashestvie1"){
	    if (idMonster == idMonsterEndLevel){
			statusGame = "nashestvie1End";
		}
	    addMonsters( 0 , 3 );		
	}
	if (statusGame == "nashestvie1End" ){
		if (arrMonsters.length == 0){
			statusGame = "changeFon1";
			flagFonReady = false;		  
		}        	  
	}	  
	if (statusGame == "changeFon1"){
		if ( flagFonReady == false){
			if (fonTimerCount == 0){
				f2 = document.createElement('div');
				f2.id = "fon" ; 	   
				f2.innerHTML = "";
				f2.style.width = 100+ "%"; 
				f2.style.height = 0 + "px";	
				f2.style.background = "url(assets/fon02.png) repeat #ffffff"; 				   
				document.body.appendChild(f2);	 				
			}
			fonTimerCount ++;
			fonHeight = fonHeight + fonHeight/3 + 5; 
			m = document.getElementById("fon");				
			m.style.height =	fonHeight+ "px";
			m.style.background = "url(assets/fon02.png) repeat #ffffff";				
			if (fonHeight > windowH + 500){
				document.body.style.background = "url(assets/fon02.png) repeat #ffffff";
				flagFonReady = true;  
				md = document.getElementById("fon");				  
				md.parentNode.removeChild(m);  
				fonHeight = 0;	
				fonTimerCount = 0;
				statusGame = "gun1"; 	
				
				m = new Monstr(windowW/2, windowH/2,
					"<img src=\"assets/weapon01.png\">", "Bonus!", idMonster);
				arrMonsters.push(m);
				idMonster ++;
			
				idMonsterEndLevel =idMonster+10;	
				distanceDamageW = 6;
				distanceDamageH = 6; 	 
			}  				
		}	  	  
	}
	if ( statusGame == "nashestvie2" ){
		if (idMonster == idMonsterEndLevel){
			statusGame = "nashestvie2End";
		}
		addMonsters(2, 6);
	}
	if (statusGame == "nashestvie2End" ){
		if (arrMonsters.length == 0){
			statusGame = "changeFon2"
			flagFonReady = false;			   		  
		}
	} 
	if (statusGame ==  "changeFon2" ){
		if ( flagFonReady == false){
			if (fonTimerCount == 0){
				f2 = document.createElement('div');
				f2.id = "fon" ; 	   
				f2.innerHTML = "";
				f2.style.width = 100+ "%"; 
				f2.style.height = 0 + "px";	
				f2.style.background = "url(assets/fon03.png) repeat #ffffff"; 				   
				document.body.appendChild(f2);	 				
			}
			fonTimerCount ++;
			fonHeight = fonHeight + fonHeight/3 + 5; 
			m = document.getElementById("fon");				
			m.style.height = fonHeight+ "px";
			if (fonHeight > windowH + 500){
				document.body.style.background = 
					"url(assets/fon03.png) repeat #ffffff";
				flagFonReady = true;  
				md = document.getElementById("fon");				  
				md.parentNode.removeChild(m);  
				fonHeight = 0;	
				fonTimerCount = 0;
				statusGame = "gun1"; 	
				  
				m = new Monstr(windowW/2, windowH/2,
					"<img src=\"assets/weapon02.png\">", "Bonus!!", idMonster);
				arrMonsters.push(m);
				idMonster ++;
         
				idMonsterEndLevel =idMonster+10;	
				distanceDamageW = 4;
				distanceDamageH = 4; 	 
			}  				
		}	  	  	 
	} 	 
	if ( statusGame == "nashestvie3" ){	 
		if (idMonster == idMonsterEndLevel){
			statusGame = "nashestvie3End";
		}    	  
		addMonsters(5, 7);	      		 
	}  
	if (statusGame == "nashestvie3End" ){
		if (arrMonsters.length == 0){
			statusGame = "changeFon3";
			flagFonReady = false;			  		  
		}
	} 
	if (statusGame == "changeFon3"){
		if ( flagFonReady == false){
			if (fonTimerCount == 0){
				f2 = document.createElement('div');
				f2.id = "fon" ; 	   
				f2.innerHTML = "";
				f2.style.width = 100+ "%"; 
				f2.style.height = 0 + "px";	
				f2.style.background = "url(assets/fon04.png) repeat #ffffff"; 				   
				document.body.appendChild(f2);	 				
			}
			fonTimerCount ++;
			fonHeight = fonHeight + fonHeight/3 + 5; 
			m = document.getElementById("fon");				
			m.style.height =	fonHeight+ "px";
			if (fonHeight > windowH + 500){
				document.body.style.background = "url(assets/fon04.png) repeat #ffffff";
				flagFonReady = true;  
				md = document.getElementById("fon");				  
				md.parentNode.removeChild(m);  
				fonHeight = 0;	
				fonTimerCount = 0;
				statusGame = "gun3"; 	
		
				m = new Monstr(windowW/2, windowH/2,
					"<img src=\"assets/weapon03.png\">", "Bonus!!!", idMonster);
				arrMonsters.push(m);
				idMonster ++;
			
				idMonsterEndLevel =idMonster+10;	
				distanceDamageW = 3;
				distanceDamageH = 3; 	 
			}  				
		}		 
	}
	if (statusGame == "nashestvie4" ){
	     if (idMonster == idMonsterEndLevel){
			statusGame = "nashestvie4End";
		}
		addMonsters(7, 11);		 
	} 
	if (statusGame == "nashestvie4End" ){
		if (arrMonsters.length == 0){
			statusGame = "End";
			m = document.getElementById("messageGame");
			m.innerHTML = "<p align=\"center\">"+
			   "<img src='assets/ava1.png'><br/>Ура !<br/>"+
			   " Все жители панеты<br/> превратившиеся в мутантов"+
			   "</br> уничтожены !<br/><br/> Победа !!!  </p> ";			  
			m.style.opacity = messageGameOpacity;	
			messageGameOpacity = messageGameOpacity + 0.1;		    
		}
	}	 
	if (statusGame == "End"){
		if (messageGameOpacity<1.1){
			m = document.getElementById("messageGame");		  
			m.style.opacity = messageGameOpacity;	
			messageGameOpacity = messageGameOpacity + 0.1;
		}   
	} 
	//update units 
	if(hero.mustRemove == false){
		hero.updateFrame(); 
	} 
	for ( a=0; a < arrMonsters.length; a++){ 	  
		arrMonsters[a].updateFrame();
	}	   
}
	
/***************************************\ 
*			Set main function
\***************************************/ 
	
setInterval(sec, 50);
	
/***************************************\ 
*			Listener keys
\***************************************/ 	
function runOnKeys(arg) {
	var codes = arg;	
	var pressed = {};

	document.onkeydown = function(e) {
		e = e || window.event;
		pressed[e.keyCode] = true;
		for (var i = 0; i < codes.length; i++) { 
			if (pressed[codes[0]]) {
				var mLeft = true;            
			}
			if (pressed[codes[1]]) {
				var mTop = true;            
			}
			if (pressed[codes[2]]) {
				var mRight = true;            
			}
			if (pressed[codes[3]]) {
				var mDown = true;            
            }			
		}

		if (hero.mustMove == true){		  
			if (mLeft == true) { hero.moveLeft(); } 
			if (mRight == true) { hero.moveRight(); } 
			if (mDown == true) { hero.moveDown(); }
			if (mTop == true) { hero.moveTop(); }
		} 			 
	};

	document.onkeyup = function(e) {
		e = e || window.event;
		pressed[e.keyCode] = false;  
	};
}
     
var argPress = [37,38,39,40]; 
runOnKeys( argPress );

/***************************************\ 
*			Functions
\***************************************/
function addMonsters(arg1, arg2){
	arg1 = arg1;
	arg2 = arg2;
      		  
	if (Math.random()*100<3 && arrMonsters.length < 10){		
		t = randomMonster(arg1, arg2);		  
		switch(t){
			case 0:
				addImp();  
				break;
			case 1:
				addBerserk();  
				break;
			case 2:
				addButa();  
				break;
			case 3:
				addMutant();  
				break;
			case 4:
				addHunter();  
				break;
			case 5:
				addDeathking();  
				break;
			case 6:
				addDog();  
				break;
			case 7:
				addZombie();  
				break;
			case 8:
				addHeadcrab();  
				break;
			case 9:
				addHellmuter();  
				break;				  
		}			 
	}		
}	
	
function randomMonster(arg1, arg2){
	a = Math.floor(Math.random()*arg2);
	if (a<arg1){
		randomMonster (arg1, arg2)
	}
	return a;
}
	
function addImp(){
	m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr1.png\">", "Imp", idMonster);
	arrMonsters.push(m);
	idMonster ++;		
}

function addBerserk(){
	var m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr2.png\" >", "Berserk", idMonster);
	arrMonsters.push(m); 
	idMonster ++;			
}	

function addButa(){
	var m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr3.png\">", "Buta", idMonster);
	arrMonsters.push(m);
	idMonster ++;			
}		

function addMutant(){
	var m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr4.png\">", "Mutant", idMonster);
	arrMonsters.push(m);
	idMonster ++;			
}		 

function addHunter(){
	var m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr5.png\">", "Hunter", idMonster);
	arrMonsters.push(m);
	idMonster ++;			
}		 

function addDeathking(){
	var m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr6.png\">", "Deathking", idMonster);
	arrMonsters.push(m);
	idMonster ++;			
}	 
	 
function addDog(){
	var m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr7.png\">", "Dog", idMonster);
	arrMonsters.push(m);
	idMonster ++;			
}	

function addZombie(){
	var m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr8.png\">", "Zombie", idMonster);
	arrMonsters.push(m);
	idMonster ++;			
}	

function addHeadcrab(){
	var m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr9.png\">", "Headcrab", idMonster);
	arrMonsters.push(m);
	idMonster ++;			
}

function addHellmuter(){
	var m = new Monstr(Math.random()*windowW, Math.random()*windowH,
		"<img src=\"assets/monstr10.png\">", "Hellmuter", idMonster);
	arrMonsters.push(m);
	idMonster ++;			
}		
	