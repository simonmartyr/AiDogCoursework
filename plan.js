var Plan = (function(){
	var theRules = {"000" : "", 
									"001" : "", 
									"010" : "",
									"100" : "",
									"011" : "",
									"110" : "",
									"101" : "",
									"111" : ""}; //rule Set
	function Plan(){
	
	};
	
	Plan.prototype.setRule = function(rule, value) {
		theRules[rule] = value;
	};
	
	Plan.prototype.getRule = function(rule) {
		return theRules[rule];
	};
	

	return Plan;
}) ();


//00 do nothing
//01 turn right
//10 turn left
//11 move forward