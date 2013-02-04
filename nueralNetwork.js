var Nueral = (function(){
	var nuerons = []; //array of all nuerons 
	var layers 	= [];
	var outputs = [];
	
	function Nueral(){
		
	};
	
	Nueral.prototype.addNueron = function(inputs){ //data to be processed. 
		var nueronJSON = {"name"	 	: nuerons.length + 1,
											"inputs" 	: inputs,
											"weights" : inputs + 1,
											"weightValues" : ""
											}; //nueronObject
			nuerons.push(nueronJSON);
	};
	
	Nueral.prototype.setWeight = function(weights, nueronName){ //expect array
	  for (var i = 0; i < nuerons.length; i++){
			if(nuerons[i]["name"] == nueronName){
				var store = i;
				break;
			}
		}
		if(weights.length == nuerons[i]["weights"]){ // check right ammount of weights
			nuerons[i]["weightValues"] = weights;
		}
		else{
			return false; 
		}
	};
	
	
	Nueral.prototype.setWeights = function(data){ //take in GA created weights
		weights = []; //reset weights
		for(var i = 0; i < data.length; i++){
			weights.push(data[i]);
		}
	};
	
	Nueral.prototype.getOutputs = function() {
		return outputs; 
	};


	return Nueral;
}) ();