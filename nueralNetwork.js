var Nueral = (function(){
	var nuerons = []; //array of all nuerons 
	var layers 	= [];
	var outputs = [0, 0];
	var inputs 	= [];
	var bias 		= 0;
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
	
	Nueral.prototype.getOutputs = function() { // return output 2 01, 00 etc
		return outputs; 
	};
	
	Nueral.prototype.run = function(inputs) { //expected 3 input array input
		beginNetwork(inputs);
	};
	
	Nueral.prototype.setBias = function (value) {
		bias = value; 
	};
	
	
	Nueral.prototype.getAll = function(){
		console.log(nuerons);
		console.log(layers);
		console.log(hiddenLayers);
	};
	
	/********Nueron functions************/
	
	Nueral.prototype.addNueron = function(inputs, outputs){ //data to be processed. 
		var nueronJSON = {"name"	 	: nuerons.length + 1,  //1 - *
											"inputs" 	: inputs, //number of 
											"iputAr"	: [],
											"weights" : inputs, //number of
											"outputs" : outputs, //number of
											"weightValues" : "",  //value of each connection
											"bias"		: "", //weight for bias 
											"connectedTo" : [],  //which nueron to send data. 
											"layer"		: false //nueron in a layer
											}; //nueronObject
			nuerons.push(nueronJSON); //all nuerons
	};
	
	
	Nueral.prototype.setWeight = function(weights, nueronName){ //expect array
	  var location = findNueron(nueronName);
		if(!isNaN(location)){
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
	
	Nueral.prototype.connectTo = function(nueronName, connections){
		var location = findNueron(nueronName);
		if(!isNaN(location)){
			if(connections.length == nuerons[location]["outputs"]){ // check right ammount of weights
				nuerons[location]["connectedTo"] = connections;
			}
			else{
				return false; 
			}
		}
		else{
			return false; 
		}
	};
	
	Nueral.prototype.setBiasWeight = function(nueronName, value){
		var location = findNueron(nueronName);
		if(!isNaN(location)){
			nuerons[location]["bias"] = value;
			return true;
		}
		else{
			return false;
		}
	}
	
	
	
	
	
	/********Layer functions************/
	
	Nueral.prototype.addLayer = function(nueronLimit){ //create layer set nueron limit
		var layerJSON = { "name" 				: layers.length + 1,
											"nuerons" 		: [],
											"nueronLimit" : nueronLimit,
											"inputs"			: 0,    
											"outputs" 		: 0,    
										}; // layer object, inputs and outputs are running total.
										
		layers.push(layerJSON); // add layer to array
		hiddenLayers++;
	};
	
	Nueral.prototype.addNueronToLayer = function(name, layer){ //add nueron to layer
		var layer = findLayer(layer);
		var nueron = findNueron(name); 
		if(!isNaN(layer) && !isNaN(nueron)){ //make sure that if both false doesn't fire
			if(!nuerons[nueron]["layer"] && 
				layers[layer]["nueronLimit"] != layers[layer]["nuerons"].length) //is not part of a layer
			{
				layers[layer]["nuerons"].push(name);
				layers[layer]["inputs"] = layers[layer]["inputs"] + nuerons[nueron]["inputs"];
				layers[layer]["outputs"] = layers[layer]["outputs"] + nuerons[nueron]["outputs"];
				nuerons[nueron]["layer"] = true;
			}
		}
	};
	
	
	/********Running private functions************/
	
	function beginNetwork(inputs){ // expect array
		for(var j = 0; j < inputs; j++){
			setNextInputs(layers[0]["nuerons"], inputs[j]); //setup first time inputs	
		}
		
	  for(var i = 0; i < hiddenLayers; i++){
			processLayer(i + 1); //the cycle begins start from 1  
		}
	};
	
	function processLayer(layerName){ // results from a layer  left to right = top to bottom... yeah!
		var location = findLayer(layerName); //check exsistance
		if(!isNaN(location)){
			for(var i = 0; i < layers[location]["nuerons"].length; i++) //process all neurons in a layer
			{
				processNueron(layers[location]["nuerons"][i + 1]); //start from 1
			}
		}
	};
	
	function processNueron(nueronName){ // da serious maths man.. this is serious
		var theNueron = findNueron(nueronName);
		var output = 0;
		if(!isNaN(theNueron)){ //check nueron 
		  for(var i = 0; i < nuerons[theNueron]["inputs"].length; i++){
				output += inputs[i]  * nuerons[theNueron]["weightValues"][i]; //process connections
			}
			output += bias * nuerons[theNueron]["bias"];  //process bias
			output = sigmoid(output); //sigmoid the result of connections
			if(nuerons[theNueron]["connectedTo"].length != 0){ //if we have connections update them to have the new input
					setNextInputs(nuerons[theNueron]["connectedTo"], output);
			}
			else {
				outputs = (output > 0) ? 1 : 0;
				outputs.push(output); //else this is the result of our nueral network,
			}
		}
	};
	
	function setNextInputs(nueronList, input){
		for(var i = 0; i < nuerons.length; i++){
			nuerons[nueronList[i]]["inputs"].push(input); //update inputs from outputs. 
		}
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
	};

	
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