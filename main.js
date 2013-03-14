	var population; 
	var flag = true;
	var planLength = 8; //constant
	var tests = [[-1, -1, -1],
							 [-1, -1, 1],
							 [-1, 1, -1],
							 [1, -1, -1],
							 [-1, 1, 1],
							 [1, 1, -1],
							 [1, -1, 1],
							 [1, 1, 1]];
	var fitness = [];
							 
$(window).load(function() 
	{
		doggy = new Dog(); //setup dog
		plan = new Plan(); // setup plan
		ga = new Ga(); // setup GA
		enviroment = new Enviroment(); // settup enviroment
		nueralNetwork = new Nueral(); // setup network
		
		setupNueralNetwork(); // do once setup network 
		
		
		
	});
	
	
	function runIt(){
		ga.reset();
		ga.start(); //get a population
		population = [];
		population = ga.getPopulation().slice(); //get the population
		for(var x = 0; x < 50; x++){
			for(var i = 0; i < population.length; i++)
			{
				setWeights(population[i]); //set weights
				for(var j = 0; j < tests.length; j++){
					nueralNetwork.run(tests[j]); 
					var rule = tests[j].toString().replace(/,/g, '').replace(/-1/g, 0);
					var value = nueralNetwork.getOutputs().toString().replace(/,/g, '');
					plan.setRule(rule, value);
				}
				dogRun();
			}
			console.log(fitness);
			ga.fitness(fitness); // inform ga of fitnesses of soultions
			fitness = [];
			ga.rouletteSelection(); //roulette it new population
			population = [];
			population = ga.getPopulation().slice(); //new population
		}
		//finish on best
		setWeights(ga.getBest()); //set weights
				for(var j = 0; j < tests.length; j++){
					nueralNetwork.run(tests[j]); 
					var rule = tests[j].toString().replace(/,/g, '').replace(/-1/g, 0);
					var value = nueralNetwork.getOutputs().toString().replace(/,/g, '');
					plan.setRule(rule, value);
		}
		dogRun();
		ga.chart();
		fitness = [];
	}
	
	function dogRun() {
		doggy.reset();
		enviroment.reset();
		while(enviroment.oneTick()){
			var sensors = doggy.sensors().toString().replace(/,/g , "");
			switch(plan.getRule(sensors))
			{
				case "00":
				break;
				case "01":
					doggy.turn("right");
				break;
				case "10":
					doggy.turn("left");
				break;
				case "11":
					doggy.moveFoward();
				break;
				default:
				break;
			}
		}
		fitness.push(doggy.trail());
	}
	
	
	function setWeights(weights) //take in array of [32] and then populate
	{
	/*** set weights ***/
		//need GA to generate 
		nueralNetwork.setWeight([weights[0],weights[1], weights[2]] , 1);
		nueralNetwork.setWeight([weights[3],weights[4], weights[5]] , 2);
		nueralNetwork.setWeight([weights[6],weights[7], weights[8]] , 3);
		nueralNetwork.setWeight([weights[9],weights[10], weights[11]] , 4);
		nueralNetwork.setWeight([weights[12],weights[13], weights[14]] , 5); //3 * 5
		nueralNetwork.setWeight([weights[15],weights[16], weights[17], weights[18], weights[19]] , 6);
		nueralNetwork.setWeight([weights[20],weights[21], weights[22], weights[23], weights[24]] , 7); // 5 * 2
		
		//bias 
		nueralNetwork.setBiasWeight(1, weights[25]);
		nueralNetwork.setBiasWeight(2, weights[26]);
		nueralNetwork.setBiasWeight(3, weights[27]);
		nueralNetwork.setBiasWeight(4, weights[28]);
		nueralNetwork.setBiasWeight(5, weights[29]);
		nueralNetwork.setBiasWeight(6, weights[30]);
		nueralNetwork.setBiasWeight(7, weights[31]); // + 7 
		
		//32 total weights 
	}
	
	function setupNueralNetwork()
	{
		/** set bias **/
		nueralNetwork.setBias(0.1);
		
		/** Layers **/
		nueralNetwork.addLayer(5); //1st layer
		nueralNetwork.addLayer(2); //2nd layer
		
		/*** layer 1 ***/
		nueralNetwork.addNueron(3 , 2); 
		nueralNetwork.addNueron(3 , 2);
		nueralNetwork.addNueron(3 , 2);
		nueralNetwork.addNueron(3 , 2);
		nueralNetwork.addNueron(3 , 2);
		
		
		
		nueralNetwork.addNueronToLayer(1 , 1);
		nueralNetwork.addNueronToLayer(2 , 1);
		nueralNetwork.addNueronToLayer(3 , 1);
		nueralNetwork.addNueronToLayer(4 , 1);
		nueralNetwork.addNueronToLayer(5 , 1);
		
		
		/*** layer 2 ***/
		
		nueralNetwork.addNueron(5 , 2); 
		nueralNetwork.addNueron(5 , 2);
		
		nueralNetwork.addNueronToLayer(6 , 2);
		nueralNetwork.addNueronToLayer(7 , 2);
		
		
		/*** connections ***/ 
		nueralNetwork.connectTo(1 , [6 , 7]);
		nueralNetwork.connectTo(2 , [6 , 7]);
		nueralNetwork.connectTo(3 , [6 , 7]);
		nueralNetwork.connectTo(4 , [6 , 7]);
		nueralNetwork.connectTo(5 , [6 , 7]);
		
		
	}