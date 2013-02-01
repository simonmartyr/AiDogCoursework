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
	
	function reset(){
		population = [];
		fitnessMax = [];
		fitnessAverage = [];
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

	function fitness(group) {
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
		console.log(theBest);
		return theBest;
	};
	

	return Ga;
}) ();