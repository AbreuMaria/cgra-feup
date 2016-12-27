/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'TimeMaster');	

	// add a group of controls (and open/expand by defult)
	
	var group=this.gui.addFolder("Lights");
	group.open();
	var i;

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	for(i=0; i<this.scene.lights.length ;i++)
		group.add(this.scene, 'switch '+ i);
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', 0.1, 2.0);

	this.gui.add(this.scene, 'skins', {'Earth Theme':0, 'National Theme':1, 'Army Theme':2,'Pig Theme':3,'Turtle Theme':4,'Octopus Theme':5});
	

	return true;
};


MyInterface.prototype.processKeyDown = function(event) {
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboard.call(this,event);
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
	case (65):	
		case (97):
			this.scene.moveDrone('a');
			this.scene.drone.state="rotateLeft";
			break;
		case (68):
		case (100):
			this.scene.moveDrone('d');	
			this.scene.drone.state="rotateRight";
			break;
		case (83):
		case (115):	
			this.scene.moveDrone('s');
			this.scene.drone.state="moveBackwards";
			break;
		case (87):
		case (119):	
			this.scene.moveDrone('w');
			this.scene.drone.state="moveForward";
			break;
		case (73):
		case (105):	
			this.scene.moveDrone('i');
			this.scene.drone.state="moveUp";
			break;
		case (74):
		case (106):	
			this.scene.moveDrone('j');
			this.scene.drone.state="moveDown";
			break;
		case(108):
		case(80):
			this.scene.moveDrone('l');
			break;
		case(112):
		case(76):
			this.scene.moveDrone('p');
			break;

	};
};

MyInterface.prototype.processKeyUp = function(event) {
	// call CGFinterface default code (omit if you want to override)
	//CGFinterface.prototype.processKeyboard.call(this,event);
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):	
		case (97):
			this.scene.drone.state="static";
			break;
		case (68):
		case (100):	
			this.scene.drone.state="static";
			break;
		case (83):
		case (115):	
			this.scene.drone.state="static";
			break;
		case (87):
		case (119):	
			this.scene.drone.state="static";
			break;
		case (73):
		case (115):
			this.scene.drone.state="static";	
			break;
		case (74):
		case (116):
			this.scene.drone.state="static";
			break;


	};
};

