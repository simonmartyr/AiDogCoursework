var Dog = (function(){

	var dogsLocation = null;
	var facing = null;
	var gridMax = 7;
	var trailCount = 0;
	
	function Dog(){
	 findDog();
	};
	
	Dog.prototype.sensors = function() {
	 var sensors = [];
	 var results = [];
	 var temp;
	 findDog();
	 switch(facing)
	 {
	   case ">":
			 sensors.push(incrementNumber(dogsLocation.charAt(0), -1) + incrementNumber(dogsLocation.charAt(1), 1) ); 
			 sensors.push(dogsLocation.charAt(0) + incrementNumber(dogsLocation.charAt(1), 1));
			 sensors.push(incrementNumber(dogsLocation.charAt(0), 1) + incrementNumber(dogsLocation.charAt(1), 1));
			 break;
		 case "<":
			 sensors.push(incrementNumber(dogsLocation.charAt(0), -1) + incrementNumber(dogsLocation.charAt(1), -1) ); 
			 sensors.push(dogsLocation.charAt(0) + incrementNumber(dogsLocation.charAt(1), -1));
			 sensors.push(incrementNumber(dogsLocation.charAt(0), 1) + incrementNumber(dogsLocation.charAt(1), -1));
			 break;
		case "^":
			 sensors.push(incrementNumber(dogsLocation.charAt(0), -1) + incrementNumber(dogsLocation.charAt(1), -1) ); 
			 sensors.push(incrementNumber(dogsLocation.charAt(0), -1) + dogsLocation.charAt(1) );
			 sensors.push(incrementNumber(dogsLocation.charAt(0), -1) + incrementNumber(dogsLocation.charAt(1), 1) );
			 break;
	  case "v":
			 sensors.push(incrementNumber(dogsLocation.charAt(0), 1) + incrementNumber(dogsLocation.charAt(1), -1) ); 
			 sensors.push(incrementNumber(dogsLocation.charAt(0), 1) + dogsLocation.charAt(1) );
			 sensors.push(incrementNumber(dogsLocation.charAt(0), 1) + incrementNumber(dogsLocation.charAt(1), 1) );
			 break;	 
	 }
	 
	 for (var i = 0; i < sensors.length; i++){
			if($("." + sensors[i]).hasClass('trail')){
				results.push(1);
			}
			else{
				results.push(0);
			}
	 }
		return results;
	};
	
	Dog.prototype.moveFoward = function(){
	  findDog();
	  var endLocation;
		switch(facing)
			{
				case ">":
					endLocation = dogsLocation.charAt(0) + incrementNumber(dogsLocation.charAt(1), 1);
					break;
				case "<":
					endLocation = dogsLocation.charAt(0) + incrementNumber(dogsLocation.charAt(1), -1);
					break;
				case "^":
				  endLocation = incrementNumber(dogsLocation.charAt(0), -1) + dogsLocation.charAt(1);
					break;
				case "v":
				  endLocation = incrementNumber(dogsLocation.charAt(0), 1) + dogsLocation.charAt(1);
					break;
			}
		$("."+dogsLocation).text(" ").removeClass("dog");
		$("."+endLocation).text(facing).addClass("dog");
		
		if($("."+endLocation).hasClass("trail")){
		  trailCount = trailCount++;
			$("."+endLocation).removeClass("trail");
		}
	};
	
	Dog.prototype.turn = function(direction) {
	  findDog();
		if(direction == "left"){
			switch(facing)
			{
				case ">":
					$(".dog").text("^");
					break;
				case "<":
					$(".dog").text("v");
					break;
				case "^":
				  $(".dog").text("<");
					break;
				case "v":
				  $(".dog").text(">");
					break;
			}
		}
		else{
			switch(facing)
			{
				case ">":
				  $(".dog").text("v");
					break;
				case "<":
					$(".dog").text("^");
					break;
				case "^":
				  $(".dog").text(">");
					break;
				case "v":
				  $(".dog").text("<");
					break;
			}	
		}
	};
	
	function findDog(){
	  dogsLocation = $(".dog").attr("class").split(" ")[0];
		facing = $(".dog").text();
	};
	
	function incrementNumber(toInc, ammount){ // take char
		 toInc = parseInt(toInc) + ammount;
		 if(toInc > gridMax){
			toInc = 0; //account for zero
		 }
		 if(toInc < 0){
		  toInc = gridMax;
		 }
		 return toInc.toString();
	};
	
	
	
	return Dog;
}) ();
