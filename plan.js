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
		return theRule[rule];
	};
	

	return Plan;
}) ();