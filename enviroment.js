var Enviroment = (function(){
	var trailLocation = ["11", "12", "13", "14", "15", "25", 
											 "35", "45", "46", "47", "50", "52", 
											 "53", "57", "63", "64", "65", "66", "67"];
	var ticks = 36;
	
	function Enviroment(){
	 
	};
	
	Enviroment.prototype.reset = function() { //recreate the enviroment
		for(var i = 0; i < trailLocation.length; i++)
		{
			$("."+trailLocation[i]).addClass("trail");
		}
		ticks = 36;
	};
	
	Enviroment.prototype.oneTick = function() {
		if(ticks > 0){
			ticks --;
			return true;
		}
		else{
			return false;
		}		
	};
	
	
	return Enviroment;
}) ();