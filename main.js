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
		nueralNetwork.addLayer(3); //1st layer
		nueralNetwork.addLayer(2); //2nd layer
		
		/*** layer 1 ***/
		nueralNetwork.addNueron(1 , 2); 
		nueralNetwork.addNueron(1 , 2);
		nueralNetwork.addNueron(1 , 2);
		
		nueralNetwork.addNueronToLayer(1 , 1);
		nueralNetwork.addNueronToLayer(2 , 1);
		nueralNetwork.addNueronToLayer(3 , 1);
		
		
		/*** layer 2 ***/
		
		nueralNetwork.addNueron(3 , 1); 
		nueralNetwork.addNueron(3 , 1);
		
		nueralNetwork.addNueronToLayer(4 , 2);
		nueralNetwork.addNueronToLayer(5 , 2);
	}