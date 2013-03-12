$(window).load(function() 
	{
		doggy = new Dog();
		plan = new Plan();
		ga = new Ga();
		enviroment = new Enviroment();
		nueralNetwork = new Nueral();
	});
	
	
	function setupNueralNetwork()
	{
		/** set bias **/
		nueralNetwork.setBias(1);
		
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
		
		/*** set weights ***/
		//need GA to generate 
		nueralNetwork.setWeight([0.4, 0.3, 0.2] , 1);
		nueralNetwork.setWeight([0.4, 0.3, 0.2] , 2);
		nueralNetwork.setWeight([0.4, 0.3, 0.2] , 3);
		nueralNetwork.setWeight([0.4, 0.3, 0.2] , 4);
		nueralNetwork.setWeight([0.4, 0.3, 0.2] , 5);
		nueralNetwork.setWeight([0.5, 0.1] , 6);
		nueralNetwork.setWeight([0.5, 0.1] , 7);
		
		//bias 
		nueralNetwork.setBiasWeight(1, 0);
		nueralNetwork.setBiasWeight(2, 0);
		nueralNetwork.setBiasWeight(3, 0);
		nueralNetwork.setBiasWeight(4, 0);
		nueralNetwork.setBiasWeight(5, 0);
		nueralNetwork.setBiasWeight(6, 0);
		nueralNetwork.setBiasWeight(7, 0);
	}