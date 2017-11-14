/**
|***************************************\ 
*  Project        : Proxima 
*  Program name   : Constructor Hero 
*  Author         : www.otrisovano.ru
*  Date           : 15.03.17 
*  Purpose        : object   
|***************************************/ 
 	
function Hero(pX,pY,ava,classMonstr){
	this.mustRemove = false;
	this.mustMove = true;
		
	this.idMonster = idMonster;
	this.classMonstr = classMonstr;
	this.pX = pX;
	this.pY = pY;
	this.ava = ava;
	pMX = Math.floor( distanceDamageW * (this.pX )/( Math.floor(windowW) ) );
	pMY = Math.floor( distanceDamageH * (this.pY )/( Math.floor(windowH) ) );	   
	this.positionInMatrix = [pMX,pMY];	
	   
	this.timerRegeneration = 0;
	this.lifes = 1;
	this.statusHero = "ok";
	this.statusCount = 0;

	this.opacity = 1;
	this.styleGunUpdate = false; 
	this.styleGunHeight = 0;	

	h = document.createElement('div');
	h.id = "hero";
	h.className = "hero";
	h.style.position = "absolute";
	l = "";
	for (t = 0; t< this.lifes; t++ ){
		l = l + "*"; 
	}	   
	h.innerHTML = this.classMonstr +"</br>  <span id = 'heroLife' > </span></br>" + this.ava +" </br>";   
	h.style.marginLeft = this.pX;
	h.style.marginTop = this.pY;	   
	document.body.appendChild(h);  	   
	   
	dl = document.getElementById('heroLife');
	dl.innerHTML = l;
       
	this.updateFrame = function(){
		
	//check position in matrix
	pMX = Math.floor( distanceDamageW * (this.pX )/( Math.floor(windowW) ) );
	pMY = Math.floor( distanceDamageH * (this.pY )/( Math.floor(windowH) ) );	   
	this.positionInMatrix = [pMX,pMY];	
         
	//collision
	for ( aa = 0; aa<arrMonsters.length; aa++){ 
		if (arrMonsters[aa].lifes > 0){
			if ( this.positionInMatrix[0] == arrMonsters[aa].positionInMatrix[0] ){
				if (this.positionInMatrix[1] == arrMonsters[aa].positionInMatrix[1]){
					arrMonsters[aa].underHero(); 
						if ( arrMonsters[aa].mustMove == true ){
							this.underAttack();
						} 
						if (arrMonsters[aa].classMonstr == "Bonus!"){
							m = document.getElementById("hero" );
							l = "";
							for (t = 0; t< this.lifes; t++ ){
								l = l + "*"; 
							}					 
							m.innerHTML = this.classMonstr + "</br> <span id = 'heroLife' >" +
								l+ " </span></br>" + this.ava +" </br>  <img src='assets/weapon01.png'"+
								" id='gun1' height = '0px'></br>"; 
							this.styleGunUpdate = true;;						 
							statusGame = "nashestvie2";					 
						}
						if (arrMonsters[aa].classMonstr == "Bonus!!"){
							m = document.getElementById("hero" );
							l = "";
							for (t = 0; t< this.lifes; t++ ){
								l = l + "*"; 
							}					 
							m.innerHTML = this.classMonstr + 
								"</br> <span id = 'heroLife' >" +l+
								"  </span></br>" + this.ava +" </br>"+
								"  <img src='assets/weapon01.png'></br>"+
								" <img src='assets/weapon02.png' id='gun1' height = '0px'> "; 
							this.styleGunUpdate = true;                     
							statusGame = "nashestvie3";					 
						}	
						if (arrMonsters[aa].classMonstr == "Bonus!!!"){
							m = document.getElementById("hero" );
							l = "";
							for (t = 0; t< this.lifes; t++ ){
								l = l + "*"; 
							}					
							m.innerHTML = this.classMonstr +
								"</br>  <span id = 'heroLife' > "+l+
								"</span></br>" + this.ava +" </br> "+
								" <img src='assets/weapon01.png'></br>"+
								" <img src='assets/weapon02.png'> </br>"+
								" <img src='assets/weapon03.png' id='gun1' height = '0px'> "; 
							this.styleGunUpdate = true;                     
							statusGame = "nashestvie4";					 
						}				  
					}
				}
			}	
		}
		  
		//red shadow under attack
		if ( this.statusHero == "Red"){
			this.statusCount ++;	
			if ( this.statusCount > 6){
				this.statusHero = "ok";
				this.statusCount = 0;
				m = document.getElementById("hero");	
				m.style.boxShadow =  "0 0 20px rgba(0,0,0,1)"; 			   
			}
		}		  
		   
		//regeneration lifes
		if (this.lifes < 11 ){
			if (this.lifes<1){
				statusGame = "dieHero";
				this.mustMove = false;
			}
			this.timerRegeneration ++;
			if (this.timerRegeneration > 20){
				this.lifes ++;
				l = "";
				for (t = 0; t< this.lifes; t++ ){
					l = l + "*"; 
				}			 
				dl = document.getElementById('heroLife');
				dl.innerHTML = l;
				this.timerRegeneration= 0;			
			}
		}
 
		//remove die hero
		if (this.mustMove == false){
			this.opacity = this.opacity - 0.05;
			md = document.getElementById('hero');
			md.style.opacity = this.opacity; 
			this.statusCount ++; 
				if (this.statusCount > 15){
				this.mustRemove = true;
			}			  
		}
		
		//update style gun 
		if (this.styleGunUpdate == true){
			p = document.getElementById('gun1');
			if (this.styleGunHeight< 35){
				this.styleGunHeight +=2;
				p.style.height = this.styleGunHeight + "px"; 
			}else{
				p.style.height = "auto";
				this.styleGunHeight = 0;					  
				this.styleGunUpdate = false;
			}
		}          
	}
	   
	// functions
	this.moveRight = function(){
		if (this.pX < windowW - 70 ){
			m = document.getElementById("hero");		  
			this.pX +=6;
			m.style.marginLeft = this.pX+"px";			 
			m.style.marginTop = this.pY+"px";
		} 			 
	}
	   
	this.moveLeft = function(){
		if (this.pX > 10){
			m = document.getElementById("hero");
			this.pX -=6;
			m.style.marginLeft = this.pX+"px";			 
			m.style.marginTop = this.pY+"px";	
		}		  
	}

	this.moveTop = function(){
		if (this.pY > 10){
			m = document.getElementById("hero");
			this.pY -=6;
			m.style.marginLeft = this.pX+"px";			 
			m.style.marginTop = this.pY+"px";
		}		   
	}
		
	this.moveDown = function(){
		if (this.pY < windowH ){		 
			m = document.getElementById("hero");
			this.pY +=6;
			m.style.marginLeft = this.pX+"px";			 
			m.style.marginTop = this.pY+"px";
		}		   
	}	   
	   
	this.underAttack = function(){
		if ( this.statusHero != "Red"){
			this.lifes --;
			l = "";
			for (t = 0; t< this.lifes; t++ ){
				l = l + "*"; 
			}
			dl = document.getElementById('heroLife');
			dl.innerHTML = l;			   
			this.statusHero = "Red";
			m = document.getElementById("hero");	
			m.style.boxShadow =  "0 0 20px rgba(255,0,0,1)"; 		   
		}			   		  
	}
}	 
	 