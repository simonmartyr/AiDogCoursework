var Ga = (function(){
	var population = new Array();
	var fitnesses = new Array(); //all the fitnesses
	var ofspring = new Array(); 
	var fitnessMax = new Array();
	var fitnessAverage = new Array();
	var muationFlip = 1.5; //between 1 - 100% 
	var totalFitness = 0; //total sum of fitness
	var maxGroupSize = 8; //max size of an person
	var maxPopulation = 10; //max size of population
	var tournment = true; //toggle tournmentSelection
	var iteration = 50; //number of iterations
	
	function Ga(){
	
	};
	
	Ga.prototype.start = function() {
		populate();	
	};
	
	Ga.prototype.getPopulation = function() {
		return population;
	};
	
	Ga.prototype.totalFitness = function () {
		for(var i = 0; i < population.length; i++){
			fitnesses.push(fitness(population[i])); //each fitness
		}
		$.each(fitnesses, function() {
			totalFitness = totalFitness + this; //population fitness
		});
	};
	
	Ga.prototype.rouletteSelection = function(){ //mixup the population
		var keep = (tournment) ? keepBest() : null;
		roulette(); // the magic
		population = ofspring; //new population
		population[maxPopulation - 1] = (keep != null)  ? keep : population[maxPopulation - 1];
		ofspring = [];
		fitnesses = []; //reset fitness
		totalFitness = 0; //reset total
	};
	
	Ga.prototype.setTournment = function(set){
		tournment = set;
	};
	
	Ga.prototype.setIterations = function(iterations) {
		iteration = iterations; 
	};
	
	Ga.prototype.reset = function(){
		population = [];
		fitnessMax = [];
		fitnessAverage = [];
	};


	Ga.prototype.fitness = function(fitness) { // amount of trail found due to thoes weights 
	 var count = group.length;
	 var groupFitness = 0;
	 for(count; count > 0; count--) {
		 if (group[count -1] == group[count -2])
			groupFitness = groupFitness + 2;
		count--;	
		}
	 return groupFitness
	};


	function keepBest() {
		var theBest = population[fitnesses.indexOf(fitnessMax[fitnessMax.length - 1])];
		console.log(theBest); // debug
		return theBest;
	};
	
	function populate() { //populate the population!
		var bitToPopulate;
		var group = [];
		while (population.length != maxPopulation){
			while(group.length != maxGroupSize){
				bitToPopulate = Math.floor(Math.random() * 2); // random 1 or 0
				group.push(bitToPopulate);
			}
			population.push(group); 
			group = [];
		}
	};
	
	function roulette() {
		ofspring = [];
		var flag = 1, runningTotal = 0, toCheck;
		var randomCheck = Math.floor(Math.random() * (totalFitness + 1)); 
		while (flag == 1) 
		{
			toCheck = Math.floor(Math.random() * fitnesses.length);
			runningTotal = runningTotal + fitnesses[toCheck];
			if(runningTotal >= randomCheck) 
			{
				ofspring.push(population[toCheck]) // parent to be used
				runningTotal = 0;
				if(ofspring.length == (maxPopulation))
					flag = 0; // we found our parents
			}
		}  
		crossover();
	};

	function crossover () {
		var loopCount = ofspring.length;
		var index = 0;
		var children = [];
		var point = Math.floor((Math.random() * (maxGroupSize + 1))+ 1); // flip point 
		while (loopCount != index)
		{
			var child = [];
			child = ofspring[index].slice(0, point);
			child = child.concat(ofspring[index + 1].slice(point, maxGroupSize));
			children.push(bitFlipping(child));
			child = ofspring[index + 1].slice(0, point);
			child = child.concat(ofspring[index].slice(point, maxGroupSize))
			children.push(bitFlipping(child));
			index = index + 2;
			point = Math.floor((Math.random() * (maxGroupSize + 1))+ 1); //change point
		}
		ofspring = children; // :') I shed a tear everytime
	};

	function bitFlipping (flippy) { //so angry could flip tables 
		var mutation = Math.floor((Math.random() * (100 + 1)+ 1)); // mutation chance
		var count = flippy.length;
		for(count; count > 0; count--) {
		 if (mutation <= muationFlip){
			 flippy[count] = (flippy[count] == 0) ? 1 : 0;
		 }
			mutation = Math.floor((Math.random() * (100 + 1)+ 1)); //flip dat coin
		}
		return flippy;
	};
	

	return Ga;
}) ();