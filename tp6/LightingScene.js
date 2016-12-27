var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();
	
	this.enableTextures(true);
	
	//light init and buttons
	this.initLights();
	
	for(i=0; i<this.lights.length ;i++)
	{
		this['switch '+ i]=true;
	}

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL); 

	//clock enabling variable
	this.clockstate=true;

	//animation variables
	this.cFrame=0;
	this.nrFrames=70;
	this.aniSect=0;
	this.cAng=0;
	this.cZ=5;
	this.cY=-0.9;

	//helix animation speed
	this.speed=1;

	this.axis = new CGFaxis(this);

	//scene elements
	this.table = new myTable(this);
	this.prism = new MyCylinder(this,32,20);
	this.cylinder = new MyCylinder(this,8,20);
	this.wall = new MyQuad(this);
	this.wallleft = new MyQuad(this,-0.9,1.9,-0.5,1.5);
	this.floor = new MyQuad(this,0,10,0,12);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0.0, 1.0);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS,0,1,0,1);
	this.clock = new MyClock(this, 12, 1);
	this.paperplane = new MyPaperPlane(this);
	this.drone = new MyDrone(this,64,64);
	this.cargo=new MyCargo(this, 7, 1, 2);
	this.pod= new MyPod(this, 1.3, 0.1, 1.3);

	//various scenes materials, textures and appearances
	this.materialDefault = new CGFappearance(this);
	
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(1,1,1,1);
	this.slidesAppearance.setSpecular(0.2,0.2,0.2,1);
	this.slidesAppearance.setShininess(5);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.6,0.6,0.6,1);
	this.boardAppearance.setSpecular(0.05,0.05,0.05,1);	
	this.boardAppearance.setShininess(200);
	this.boardAppearance.loadTexture("../resources/images/board.png");

	this.cylinderAppearance = new CGFappearance(this);
	this.cylinderAppearance.setAmbient(0.3,0.3,0.3,1);
	this.cylinderAppearance.setDiffuse(1,1,1,1);
	this.cylinderAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.cylinderAppearance.setShininess(200);
	this.cylinderAppearance.loadTexture("../resources/images/col2.png");
	
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.5,0.8,0.3,1);
	this.floorAppearance.setDiffuse(255/255,255/255,255/255,1);
	this.floorAppearance.setSpecular(0.5,0.5,0.5,1);	
	this.floorAppearance.setShininess(120);
	this.floorAppearance.loadTexture("../resources/images/floor.png");

	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(0.5,0.5,0.5,1);
	this.materialWall.setDiffuse(100/255,93/255,51/255,1);
	this.materialWall.setSpecular(0.3,0.3,0.2,1);	
	this.materialWall.setShininess(120);
	this.materialWall.loadTexture("../resources/images/wall.jpg");

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.5,0.5,0.5,1);
	this.windowAppearance.setDiffuse(242/255,242/255,89/255,1);
	this.windowAppearance.setSpecular(0.3,0.3,0.2,1);	
	this.windowAppearance.setShininess(120);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
		
	this.body1=new CGFappearance(this);
	this.body1.loadTexture("../resources/images/map.jpg");

	this.body2=new CGFappearance(this);
	this.body2.loadTexture("../resources/images/forcaportugal.png");
	
	this.body3=new CGFappearance(this);
	this.body3.loadTexture("../resources/images/armytex.png");

	this.body4=new CGFappearance(this);
	this.body4.loadTexture("../resources/images/pig.jpg");

	this.body5=new CGFappearance(this);
	this.body5.loadTexture("../resources/images/turtle.jpg");
	
	this.body6=new CGFappearance(this);
	this.body6.loadTexture("../resources/images/oct1.jpg");

	this.tops1=new CGFappearance(this);
	this.tops1.loadTexture("../resources/images/white.png");

	this.tops2=new CGFappearance(this);
	this.tops2.loadTexture("../resources/images/black.png");
	
	this.tops3=new CGFappearance(this);
	this.tops3.loadTexture("../resources/images/silver.jpg");

	this.tops4=new CGFappearance(this);
	this.tops4.loadTexture("../resources/images/white.png");

	this.tops5=new CGFappearance(this);
	this.tops5.loadTexture("../resources/images/green.jpg");

	this.tops6=new CGFappearance(this);
	this.tops6.loadTexture("../resources/images/white.png");

	this.helix1=new CGFappearance(this);
	this.helix1.loadTexture("../resources/images/silver.jpg");

	this.helix2=new CGFappearance(this);
	this.helix2.loadTexture("../resources/images/green.jpg");

	this.helix3=new CGFappearance(this);
	this.helix3.loadTexture("../resources/images/black.png");

	this.helix4=new CGFappearance(this);
	this.helix4.loadTexture("../resources/images/pink.png");

	this.helix5=new CGFappearance(this);
	this.helix5.loadTexture("../resources/images/gold.jpg");

	this.helix6=new CGFappearance(this);
	this.helix6.loadTexture("../resources/images/silver.jpg");

	this.base1=new CGFappearance(this);
	this.base1.loadTexture("../resources/images/navyblue.jpg");

	this.base2=new CGFappearance(this);
	this.base2.loadTexture("../resources/images/gold.jpg");
	
	this.base3=new CGFappearance(this);
	this.base3.loadTexture("../resources/images/khaki.jpg");

	this.base4=new CGFappearance(this);
	this.base4.loadTexture("../resources/images/pig2.jpg");

	this.base5=new CGFappearance(this);
	this.base5.loadTexture("../resources/images/leaf.jpg");

	this.base6=new CGFappearance(this);
	this.base6.loadTexture("../resources/images/pink.png");

	this.legs1=new CGFappearance(this);
	this.legs1.loadTexture("../resources/images/blue.jpg");

	this.legs2=new CGFappearance(this);
	this.legs2.loadTexture("../resources/images/red.png");
	
	this.legs3=new CGFappearance(this);
	this.legs3.loadTexture("../resources/images/leaf.jpg");

	this.legs4=new CGFappearance(this);
	this.legs4.loadTexture("../resources/images/pink2.png");

	this.legs5=new CGFappearance(this);
	this.legs5.loadTexture("../resources/images/green.jpg");

	this.legs6=new CGFappearance(this);
	this.legs6.loadTexture("../resources/images/oct2.jpg");
	
	//appearance variables for the drone
	this.droneAppearances = [[this.body1, this.tops1, this.helix1, this.base1, this.legs1], [this.body2, this.tops2, this.helix2, this.base2, this.legs2], [this.body3, this.tops3, this.helix3, this.base3, this.legs3], [this.body4, this.tops4, this.helix4, this.base4, this.legs4], [this.body5, this.tops5, this.helix5, this.base5, this.legs5], [this.body6, this.tops6, this.helix6, this.base6, this.legs6]];
	this.currAppearance;
	this.skins='1';

	this.setUpdatePeriod(1/100);
};

LightingScene.prototype.initCameras = function() 
{
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};


/*
* Function to stop/resume the clock's movement
*/

LightingScene.prototype.TimeMaster = function()
{ 
	if(this.clockstate===true)
	this.clockstate=false;
	else this.clockstate=true;
	
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);

	this.shader.bind;
	

	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[4].setPosition(0, 4,7.5, 1.0);


	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(255, 255, 255, 1.0);

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1, 1, 1, 1);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].setQuadraticAttenuation(0);

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(255, 255, 255, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1);

	this.lights[4].setAmbient(0.7, 0.7, 0.7, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(150, 150, 150, 1.0);
	this.lights[4].setQuadraticAttenuation(1);
	
	
	this.shader.unbind;
};

/*
* Function to update all the lights in the scene, necessary for the light buttons
*/

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

/*
* Function that deals with several animations, including the clock movement, the paperplane
* trajectory, the light switches and also with the drone skins
*/

LightingScene.prototype.update = function(currTime)
{
		//stopping/resuming the clock

		if(this.clockstate===true)
			this.clock.update(currTime);
		this.cFrame++;

		//drone animations
		this.drone.update(currTime);
		
		//paperplane movement

		if((this.cFrame >= this.nrFrames) && (this.aniSect<2))
		{
			this.aniSect++;
			this.cFrame=0;
		}

		switch(this.aniSect)
		{
			case 0:
				this.cZ-=21/this.nrFrames;
				this.cAng+=Math.PI/22/this.nrFrames;
				break;

			case 1:
				this.cY-=7.1/this.nrFrames;
				if(this.cAng > -(90*degToRad))
				{
					this.cAng-=Math.PI/10;
				}
				break;

			case 2:
				this.cAng=(180*degToRad);
				break;
		}
		

		//updating light switches
			
		for(i=0; i<this.lights.length ;i++)
		{
				if(this['switch '+ i]===true)
					this.lights[i].enable();
				else this.lights[i].disable();
		}
		

		//updating drone skins
		
		switch(this.skins)
		{

			case '0':
			this.currAppearance = this.droneAppearances[0];
			break;

			case '1':
			this.currAppearance = this.droneAppearances[1];
			break;

			case '2':
			this.currAppearance = this.droneAppearances[2];
			break;
			
			case '3':
			this.currAppearance = this.droneAppearances[3];
			break;

			case '4':
			this.currAppearance = this.droneAppearances[4];
			break;

			case '5':
			this.currAppearance = this.droneAppearances[5];
			break;

			default:
			break;

		}
		
		//check for cargo landing

		this.landPod();
}

/*
* Function that allows the movement of the drone thanks to user input through the keyboard
* keys 'WASD' (directions) and 'IJ' (up or down)
*/


LightingScene.prototype.moveDrone = function(char) 
{
	
	switch(char){
		case 'i':
		this.drone.droneY+=this.drone.incDir;
		break;
		
		case 'j':
		this.drone.droneY-=this.drone.incDir;
		break;
		
		case 'a':
		this.drone.droneAng+=this.drone.incRot;
		if(this.cargo.isAttached)
		this.cargo.cargoAng+=this.drone.incRot;
		break;
		
		case 's':
		this.drone.droneX-=this.drone.incDir*Math.sin(this.drone.droneAng);
		this.drone.droneZ-=this.drone.incDir*Math.cos(this.drone.droneAng);
		break;
		
		case 'w':
		this.drone.droneX+=this.drone.incDir*Math.sin(this.drone.droneAng);
		this.drone.droneZ+=this.drone.incDir*Math.cos(this.drone.droneAng);
	
		break;
		
		case 'd':
		this.drone.droneAng-=this.drone.incRot;
		if(this.cargo.isAttached)
		this.cargo.cargoAng-=this.drone.incRot;
		break;
		
		case 'l':
		this.drone.cable.scalefactor-=0.1;
		break;

		case 'p':
		this.drone.cable.scalefactor+=0.1;
		break;
		default:
		break;
	}
	
	//move cargo with drone
	if(this.cargo.isAttached){
		var hookPos=this.drone.getHookPos();
		this.cargo.x=hookPos[0];
		this.cargo.y=hookPos[1]+0.6;
		this.cargo.z=hookPos[2];
	}
}

LightingScene.prototype.landPod = function(){
	var podPos=this.pod.getPodPos();
	var cargoPos=this.cargo.getCargoPos();

	var d=Math.sqrt(2);

	if(podPos[0]-d<cargoPos[0])
		if(podPos[0]+d>cargoPos[0])
			if(podPos[1]-d<cargoPos[1])
				if(podPos[1]+d>cargoPos[1])
					if(podPos[2]-d<cargoPos[2])
						if(podPos[2]+d>cargoPos[2])
						{
							this.cargo.isAttached=false;
							this.pod.isWater=true;
							this.cargo.x=this.pod.x;
							this.cargo.y=this.pod.y+0.8;
							this.cargo.z=this.pod.z;
						}
							

}

LightingScene.prototype.display = function() {
	this.shader.bind;

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

		//Pod
	this.pushMatrix();
	   	this.pod.display();
	this.popMatrix();

		//Cargo box
	this.pushMatrix();
		this.cargo.display();
	this.popMatrix();

		//Drone
	this.pushMatrix();
		this.translate(this.drone.droneX,this.drone.droneY,this.drone.droneZ);
		this.rotate(this.drone.droneAng,0,1,0);
		this.scale(0.6,0.6,0.6);
		this.drone.display();		
	this.popMatrix();
	   
	   //PaperPlane
	this.pushMatrix();
		this.translate(7.5, 5.7, 6);
		this.scale(0.37,0.7,0.6);
		this.rotate(90*degToRad, 0, 1, 0);
		this.translate(-3, this.cY, this.cZ);
		this.rotate(this.cAng, 1, 0, 0);
		this.paperplane.display();
	this.popMatrix();
	  
	   //Clock
	this.pushMatrix();
		this.translate(7.3,7.3,0);
		this.scale(0.7,0.7,0.3);
		this.clock.display();
	this.popMatrix();
	
	   //Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	   //Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.wallleft.display();
	this.popMatrix();

	   //Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialWall.apply();
		this.wall.display();
	this.popMatrix();

	   //First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	   //Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	   //Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	   //Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	   //Prism
	this.pushMatrix();
		this.translate(2,1,14);
		this.rotate(Math.PI/2,1,0,0);
		this.translate(0,0,-6);
		this.scale(1,1,7);
		this.cylinderAppearance.apply();
		this.prism.display();
	this.popMatrix();
	
	   //Cylinder
	this.pushMatrix();
		this.translate(2,1,1);
		this.rotate(Math.PI/2,1,0,0);
		this.translate(12,0,-6);
		this.scale(1,1,7);
		this.cylinder.display();
	this.popMatrix();


	// ---- END Primitive drawing section

	this.shader.unbind;
};
