var Ga = (function(){
	var population = new Array();
	var fitnesses = new Array(); //all the fitnesses
	var ofspring = new Array(); 
	var fitnessMax = new Array();
	var fitnessAverage = new Array();
	var keep = new Array();
	var crossOverFlag = true;
	var muationFlip = 1.5; //between 1 - 100% 
	var totalFitness = 0; //total sum of fitness
	var maxGroupSize = 32; //max size of an person
	var maxPopulation = 12; //max size of population
	var tournment = true; //toggle tournmentSelection
	var iteration = 50; //number of iterations
	
	function Ga(){
	
	};
	
	Ga.prototype.start = function() {
		populate();	
	};
	
	Ga.prototype.crossFlag = function () {
		crossOverFlag = (crossOverFlag == true) ? false : true;
	};
	
	Ga.prototype.getBest = function() {
		return keep;
	};
	
	Ga.prototype.getPopulation = function() {
		return population;
	};
	
	Ga.prototype.setMut = function (value) {
		muationFlip = value; 
	};
	

	
	Ga.prototype.rouletteSelection = function(){ //mixup the population
		keep = new Array();
		keep = (tournment) ? keepBest() : null;
		roulette(); // the magic
		population = ofspring; //new population
		population[maxPopulation - 1] = (keep != null)  ? keep : population[maxPopulation - 1];
		ofspring = [];
		fitnesses = []; //reset fitness
		totalFitness = 0; //reset total
	};
	
	Ga.prototype.toggleKeep = function(set){
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


	Ga.prototype.fitness = function(fitness) { //set population fitness
		fitnesses = new Array();
		fitnesses = fitness.slice();
		totalFit();
		chartData();
		
	};

	/*** private functions ***/

	function keepBest() {
		var theBest = population[fitnesses.indexOf(fitnessMax[fitnessMax.length - 1])];
		return theBest;
	};
	
	function totalFit() {
		$.each(fitnesses, function() {
			totalFitness = totalFitness + this; //population fitness
		});
	};
	
	function populate() { //populate the population!
		var bitToPopulate;
		var group = []; //set of weights 
		while (population.length != maxPopulation){
			while(group.length != maxGroupSize){
				bitToPopulate = getRandomArbitary(-1, 1); // between -1 - 1 weight
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
		if(crossOverFlag){
			crossover();
		}
		else{
			flipOnly();
		}
	};// chill the fuck out
	

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
		ofspring = children.slice(); // :') I shed a tear everytime
	};
	
	function flipOnly () { //for the man with nothing to hide.. but still wants to.
		var loopCount = ofspring.length;
		var index = 0;
		var children = [];
		while (loopCount != index)
		{
			var child = []; 
			child = ofspring[index].slice(); //take the kid
			children.push(bitFlipping(child)); // make him a man
			index++; //go get the rest
		}
		ofspring = children.slice(); //dem kids be crazy
	}

	function bitFlipping (flippy) { //so angry could flip tables 
		var mutation = Math.floor((Math.random() * (100 + 1)+ 1)); // mutation chance
		var count = flippy.length; //length of indivual
		for(count; count > 0; count--) {
		 if (mutation <= muationFlip){
			 flippy[count] = getRandomArbitary (-1, 1);
		 }
			mutation = Math.floor((Math.random() * (100 + 1)+ 1)); //flip dat coin
		}
		return flippy;
	};
	
	function getRandomArbitary (min, max) {
		return Math.random() * (max - min) + min;
	};
	
	function chartData(){ //take fitnesses makes averages max etc
	 var max, average, store = [];
		store = fitnesses.slice();
		store.sort(function(a,b){return a-b});
		max = store[store.length -1];
		average = totalFitness / fitnesses.length;
		fitnessMax.push(max);
		fitnessAverage.push(average);
	}
	
	/** Create chart **/
	Ga.prototype.chart = function () {
	var chart;
	chart = new Highcharts.Chart({
		chart: {
				renderTo: 'chart',
				type: 'line'
		},
		title: {
				text: 'Fitness overtime',
				x: -20 //center
		},
		subtitle: {
				text: 'over 50 iterations',
				x: -20
		},
		xAxis: {
				title: {
						text: 'Number of iterations'
				},
		},
		yAxis: {
				title: {
						text: 'Fitness'
				},
				plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
				}]
		},
		tooltip: {
				formatter: function() {
								return '<b>'+ this.series.name +'</b><br/>'+
								this.x +': '+ this.y;
				}
		},
		legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -10,
				y: 100,
				borderWidth: 0
		},
		series: [{
				name: 'Average Fitness',
				data: fitnessAverage
		},{
				name: 'Max Fitness',
				data: fitnessMax
		}]
	});
	};
	

	return Ga;
}) ();