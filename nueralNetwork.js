var Nueral = (function(){
	var nuerons = []; //array of all nuerons 
	var layers 	= [];
	var outputs = [];
	var inputs 	= [];
	var hiddenLayers = 0; //number of hidden layers
	
	function Nueral(){
		
	};
	
	/********General functions************/
	
	Nueral.prototype.reset = function(){ //new network restart
		layers = [];
		outputs = [];
		nuerons = [];
		inputs = [];
		hiddenLayers = 0; 
	}
	
	Nueral.prototype.getOutputs = function() { // return output
		return outputs; 
	};
	
	Nueral.prototype.run = function(inputs) { //expected 2 input array input
		
	};
	
	/********Nueron functions************/
	
	Nueral.prototype.addNueron = function(inputs, outputs){ //data to be processed. 
		var nueronJSON = {"name"	 	: nuerons.length + 1,
											"inputs" 	: inputs,
											"weights" : inputs,
											"outputs" : outputs,
											"weightValues" : "",
											"threshold" : "",
											"connectedTo" : [],
											"layer"		: false
											}; //nueronObject
			nuerons.push(nueronJSON);
	};
	
	
	Nueral.prototype.setWeight = function(weights, nueronName){ //expect array
	  var location = findNueron(nueronName);
		if(location){
			if(weights.length == nuerons[location]["weights"]){ // check right ammount of weights
				nuerons[location]["weightValues"] = weights;
			}
			else{
				return false; 
			}
		}
		else{
			return false; 
		}
	};
	
	
	Nueral.prototype.setThreshold = function(threshold, nueronName){ //set threshold of nueron
		var location = findNueron(nueronName);
		if(location){
			nuerons[location]["threshold"] = threshold;
		}
		else{
			return false; 
		}
	};
	
	
	
	/********Layer functions************/
	
	Nueral.prototype.addLayer = function(nueronLimit){ //create layer set nueron limit
		var layerJSON = { "name" 				: layers.length + 1,
											"nuerons" 		: [],
											"nueronLimit" : nueronLimit,
											"inputs"			: 0,    
											"outputs" 		: 0,    
										}; // layer object, inputs and outputs are running total.
										
		layers.push(layerJSON); // add layer to array
	};
	
	Nueral.prototype.addNueronToLayer(name, layer){ //add nueron to layer
		var layer = findLayer(layer);
		var nueron = findNueron(name); 
		if(layer != false && nueron != false){ //make sure that if both false doesn't fire
			if(!nuerons[nueron]["layer"] && 
				layers[layer]["nueronLimit"] != layers[layer]["nuerons"].length) //is not part of a layer
			{
				layers[layer]["nuerons"].push(name);
				layers[layer]["inputs"] = layers[layer]["inputs"] + nuerons[nueron]["inputs"];
				layers[layer]["outputs"] = layers[layer]["outputs"] + nuerons[nueron]["outputs"];
				nuerons[nueron]["layer"] = true;
			}
		}
		hiddenLayers++;
	};
	
	
	/********Running private functions************/
	
	function beginNetwork(inputs){ // expect array
	  for(var i = 0; i < hiddenLayers; i++){
			inputs = processLayers(inputs, i); //send inputs to a layer get outputs recycle 
		}
	};
	
	function processLayer(inputs, layerName){ // results from a layer  left to right = top to bottom... yeah!
		var location = findLayer(layerName); //check exsistance
		var outputs  = [];
		for(var i = 0; i < layers[location]["nuerons"].length; i++)
		{
			var processed = processNueron(layers[location]["nuerons"][i], inputs);
			for(var j = 0; j < processed.length; j++){
				outputs.push(processed[j]);
			}
		}
		return outputs;
	};
	
	function processNueron(nueronName, inputs){ // da serious maths man
		var theNueron = findNueron(nueronName);
		var outputs = [];
		for(var
	};

	
	/********Common private functions************/
	
	function findNueron(name){ // take name return index 
		for (var i = 0; i < nuerons.length; i++){
			if(nuerons[i]["name"] == name){
				var store = i;
				return i;
			}
		}
		return false; //not found
	};
	
	function sigmoid(t) { // reference http://www.zacwitte.com/javascript-sigmoid-function
    return 1/(1+Math.pow(Math.E, -t));
	}

	
	function findLayer(name){ // take name return index 
		for (var i = 0; i < layers.length; i++){
			if(layers[i]["name"] == name){
				var store = i;
				return i;
			}
		}
		return false; //not found
	};


	return Nueral;
}) ();