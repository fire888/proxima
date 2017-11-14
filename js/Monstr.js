/**
|***************************************\ 
*  Project        : Proxima 
*  Program name   : Constructor Monstr 
*  Author         : www.otrisovano.ru
*  Date           : 15.03.17 
*  Purpose        :    
|***************************************/ 

function Monstr(pX,pY,ava,classMonstr, idMonster){
	this.mustRemove = false;	 
	 
	this.idMonster = idMonster;
	this.classMonstr = classMonstr;
	this.tX = Math.random()*800;
	this.tY = Math.random()*800; 
	this.pX = pX;
	this.pY = pY;
	pMX = Math.floor( distanceDamageW * (this.pX )/( Math.floor(windowW)) );
	pMY = Math.floor( distanceDamageH * (this.pY )/( Math.floor(windowH)) );	   
	this.positionInMatrix = [pMX,pMY];	   
	this.ava = ava;
	this.statusLife = "none";
	this.statusLifeCount = 0;
	this.mainOpacity = 1;
	this.lifes = 0;
	this.mustMove = true;
	   
	this.htmlHeight = 0;
	this.htmlHeightFlag = true; 	   

	if(this.classMonstr == "Bonus!") { this.lifes = 1; this.mustMove = false;}
	if(this.classMonstr == "Bonus!!") { this.lifes = 1; this.mustMove = false;}
	if(this.classMonstr == "Bonus!!!") { this.lifes = 1; this.mustMove = false;}	   
	if(this.classMonstr == "Imp") { this.lifes = 2;}
	if(this.classMonstr == "Berserk") { this.lifes = 3;} 
	if(this.classMonstr == "Buta") { this.lifes = 4;} 
	if(this.classMonstr == "Mutant") { this.lifes = 5;} 
	if(this.classMonstr == "Hunter") { this.lifes = 6;}
	if(this.classMonstr == "Deathking") { this.lifes = 7;}	
	if(this.classMonstr == "Dog") { this.lifes = 8;}	   
	if(this.classMonstr == "Zombie") { this.lifes = 9;}	   
	if(this.classMonstr == "Headcrab") { this.lifes = 10;}
	if(this.classMonstr == "Hellmuter") { this.lifes = 15;}	 
	   
	this.lifesStroke = "";	   
	for (n = 0; n < this.lifes; n++){
		this.lifesStroke = this.lifesStroke+"*";
	} 		 
	   
	var  h = document.createElement('div');
	h.id = "mnstr" + this.idMonster;
	h.className = "mnstr";
	h.style.position = "absolute";	   
	h.innerHTML = this.classMonstr + "</br> <span class = 'life' id='mnstr" + this.idMonster +"l' >"  + this.lifesStroke + " </span> </br>  <span  id='mnstr" + this.idMonster + "ava' >" + this.ava + "</span>";	   
	if (this.classMonstr == "Bonus!"||this.classMonstr == "Bonus!!"||this.classMonstr == "Bonus!!!"){
		h.style.background = "rgba(216,230,233,0.5)";
		h.style.color =  "#c5bfab"; 
	}
	h.style.marginLeft = this.pX+"px";			 
	h.style.marginTop = this.pY+"px";
	h.style.height = this.htmlHeight;
	h.style.opacity = 0;		   
	document.body.appendChild(h);
	if (this.classMonstr == "Bonus!"||this.classMonstr == "Bonus!!"||this.classMonstr == "Bonus!!!"){
		t= document.getElementById("mnstr" + this.idMonster +"l");
		t.style.color =  "#c5bfab";
	}		   
	this.updateFrame = function(){
		//init start animation 
		if (this.htmlHeightFlag == true){
			if (this.htmlHeight<80){
				this.htmlHeight = this.htmlHeight + 2*5 ;
				m = document.getElementById("mnstr" + this.idMonster );	
				m.style.height = this.htmlHeight;
				m.style.opacity += 0.8;
			}else{
				m = document.getElementById("mnstr" + this.idMonster );	
				m.style.height = "auto";
				m.style.opacity =1;	
				this.htmlHeightFlag = false; 			 
			}
		}  		   
	     
		//check position in matrix
		pMX = Math.floor( distanceDamageW * (this.pX )/( Math.floor(windowW) ) );
		pMY = Math.floor( distanceDamageH * (this.pY )/( Math.floor(windowH) ) );	   
		this.positionInMatrix = [pMX,pMY];		 
	   
		//update status
		if (this.lifes == 0){
			this.statusLife = "Black";
			this.lifes --;
		}
		 
		if( this.statusLife == "Black" ){
			this.statusLifeCount ++;		 
			if (this.statusLifeCount < 2){
				m = document.getElementById("mnstr" + this.idMonster );	
				m.style.background = "rgba(78,59,106,0.5)";
				m.style.boxShadow =  "0 0 20px rgba(0,0,0,1)";       			  
				m.style.transform = null;	
			}
			if (this.statusLifeCount < 150){			   
				m = document.getElementById("mnstr" + this.idMonster );
				this.mainOpacity = this.mainOpacity - 0.01;
				m.style.opacity = this.mainOpacity;				  
			}		    		   
		} 		 
		 
		if (this.statusLife == "Red"){
			this.statusLifeCount ++;
			if (this.statusLifeCount > 3 ){
				this.statusLifeCount = 0;
				this.statusLife = "GreenAfterRed";
				m = document.getElementById("mnstr" + this.idMonster );
				m.style.background = null;
				m.style.transform = null;			  
			}
		}	
       
		if (this.statusLife == "GreenAfterRed"){
			this.statusLifeCount ++;		 
			if (this.statusLifeCount > 5){
				this.statusLifeCount = 0;
				this.statusLife = "Green"; 
				m = document.getElementById("mnstr" + this.idMonster );			   
				m.style.boxShadow =  "0 0 20px rgba(0,0,0,1)"; 			   
			}
		}  		 
			
		//new point 
		if (Math.random()*100<2){
			this.tX = Math.random()*windowW;
			this.tY = Math.random()*windowH -100; 
		}
		 
		//move to point
		if ( this.statusLife != "Black" && this.statusLife != "Red" && this.mustMove ==true ){
			if (this.pX < this.tX){
				this.pX +=3;
			}else{
				this.pX -=3;  
			}		  
		 
			if (this.pY < this.tY){
				this.pY +=3;
			} else{
				this.pY -=3;  
			}	
		 
			m = document.getElementById("mnstr" + this.idMonster );
			m.style.marginLeft = this.pX+"px";			 
			m.style.marginTop = this.pY+"px";
		}

		//remove object 
		if (this.statusLife == "Black" && this.statusLifeCount == 150) {
			m = document.getElementById("mnstr" + this.idMonster );
			m.parentNode.removeChild(m);
				
			this.idMonster = null;
			this.classMonstr = null;;
			this.tX = null;
			this.tY = null; 
			this.pX = null;
			this.pY = null;
			this.ava = null;
			this.statusLife = null;
			this.statusLifeCount = null;
			this.mainOpacity = null;
			this.lifes = null;
			this.mustRemove = true;			  
		} 		  

	}
	   
	this.underHero = function(){
		if (this.statusLife != "Black" ){
			if(this.statusLifeCount == 0){
				this.lifes --;
				this.lifesStroke = "";	   
				for (n = 0; n < this.lifes; n++){
					this.lifesStroke = this.lifesStroke+"*";
				} 		     
				m = document.getElementById("mnstr" + this.idMonster + "l" );	
				m.innerHTML = this.lifesStroke; 	
				m = document.getElementById("mnstr" + this.idMonster );	
				m.style.background = "rgba(190,10,36,0.5)";
				m.style.transform = " rotate(3deg)";
				m.style.boxShadow =  "0 0 20px rgba(190,0,0,1)"; 				 
				this.statusLife = "Red";			 
			}	
		}       
	}		  
}