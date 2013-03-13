var Dog = (function(){

	var dogsLocation = null; //class reference
	var facing = null;  // direction dog is facing
	var gridMax = 7; //size grid
	var trailCount = 0; //fitness 
	
	function Dog(){
	 findDog();
	};
	
	Dog.prototype.reset = function() {
		findDog();
		$("."+dogsLocation).text(" ").removeClass("dog");
		$(".start").text(">").addClass("dog"); //send him back to home.
		trailCount = 0; //reset counter
	};
	
	Dog.prototype.sensors = function() {
	 var sensors = []; //location to scan
	 var results = []; // content
	 var temp;
	 findDog();
	 switch(facing) //workout which areas to scan
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
	 
	 for (var i = 0; i < sensors.length; i++){ //check for trail
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
		switch(facing) //move one step forward
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
		$("."+dogsLocation).text(" ").removeClass("dog"); //moving the dog
		$("."+endLocation).text(facing).addClass("dog");
		
		if($("."+endLocation).hasClass("trail")){ //we step on trail we remove it
		  trailCount++; //add to count of trail
			$("."+endLocation).removeClass("trail");
		}
	};
	
	Dog.prototype.turn = function(direction) { 
	  findDog();
		if(direction == "left"){ //anti clockwise
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
			switch(facing) //clockwise
			{
				case ">":
				  $(".dog").text("v");
					break;
				case "<":
					$(".dog").text("^");  //pretty sneaky bro.
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
	
	Dog.prototype.trail = function(){
		return trailCount; //determin fitness
	};
	
	function findDog(){  //find the class cell reference of the dog
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
