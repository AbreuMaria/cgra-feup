/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene,stacks,slices) {
 	CGFobject.call(this,scene);
    
    this.droneX=7.4;
	this.droneY=4.5;
	this.droneZ=7.5;


	this.helixAng=90*degToRad;
	this.droneAng=-150*degToRad;
	
	this.incDir=0.1;
	this.incRot=5*degToRad;
	
	this.dtime=0;
	this.prevtime=0;
	this.initial=0;
	this.updInt=10;
	this.helixfront= new MyHelix(scene,stacks/4,slices/4,"front/back");
	this.helixback= new MyHelix(scene,stacks/4,slices/4,"front/back");
	this.helixleft= new MyHelix(scene,stacks/4,slices/4,"side");
	this.helixright= new MyHelix(scene,stacks/4,slices/4,"side");
	this.leanAngle=0;
	this.maxleanfwd=20*degToRad;
	this.maxleanbwd=-20*degToRad;

	this.stacks=stacks;
	this.slices=slices;
	
	this.body=new MyDome(scene,stacks,slices);
	this.body.initBuffers();

	this.helixbase=new MyDome(scene,stacks/4,slices/4);
	this.helixbase.initBuffers();
 	
 	this.arm1= new MyCylinder(scene,stacks/2,slices/2);
 	this.arm1.initBuffers();
 	
 	this.base1=new MyCylinder(scene,stacks/2,slices/2);
	this.base1.initBuffers();
	
	this.top= new MyCircle(scene,slices);
	this.top.initBuffers();
	
	this.leg= new MyLeg(scene,slices);
	this.leg.initBuffers();
	
	this.legbase= new MyUnitCubeQuad(scene);
	this.legbase.initBuffers();

	this.cable = new MyCable(scene,this.droneX,this.droneY,this.droneZ);
	
	this.state="static";
	

 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.display = function() {
 
	 //cable
 	this.scene.pushMatrix();
	this.cable.display();
 	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(this.leanAng,1,0,0);
	//Body
	this.scene.pushMatrix();
	this.scene.currAppearance[0].apply();
	this.body.display();
 	this.scene.popMatrix();
	
	//Legs
 	this.scene.pushMatrix();
 	this.scene.rotate(180*degToRad,1,0,0);
 	this.scene.translate(0.7,-0.02,-0.4);
	this.scene.scale(1,1.5,0.5);
	this.scene.currAppearance[4].apply();
	this.leg.display();
 	this.scene.popMatrix();
 	
 	this.scene.pushMatrix();
 	this.scene.rotate(180*degToRad,1,0,0);
 	this.scene.translate(0.7,-0.05,0.4);
	this.scene.scale(1,1.5,0.5);
	this.scene.currAppearance[4].apply();
	this.leg.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.rotate(180*degToRad,1,0,0);
 	this.scene.rotate(-180*degToRad,0,1,0);
 	this.scene.translate(0.7,-0.05,-0.4);
	this.scene.scale(1,1.5,0.5);
	this.scene.currAppearance[4].apply();
	this.leg.display();
 	this.scene.popMatrix();
 	
 	this.scene.pushMatrix();
 	this.scene.rotate(180*degToRad,1,0,0);
 	this.scene.rotate(-180*degToRad,0,1,0);
 	this.scene.translate(0.7,-0.05,0.4);
	this.scene.scale(1,1.5,0.5);
	this.scene.currAppearance[4].apply();
	this.leg.display();
 	this.scene.popMatrix();
	
	//Leg Base
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI/2,0,0,1);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.scene.translate(-1.48,0,1.75);
	this.scene.scale(0.1, 3, 0.1);
	this.scene.currAppearance[4].apply();
	this.legbase.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(Math.PI/2,0,0,1);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.scene.translate(-1.48,0,-1.75);
	this.scene.scale(0.1, 3, 0.1);
	this.scene.currAppearance[4].apply();
	this.legbase.display();
	this.scene.popMatrix();

	//Arms
 	this.scene.pushMatrix();
 	this.scene.rotate(-180*degToRad,0,1,0);
 	this.scene.translate(0,0,-3);
 	this.scene.scale(0.1,0.1,6);
 	this.scene.currAppearance[4].apply();
	this.arm1.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad,0,1,0);
 	this.scene.translate(0,0,-3);
 	this.scene.scale(0.1,0.1,6);
 	this.scene.currAppearance[4].apply();
	this.arm1.display();
 	this.scene.popMatrix();
	
	//Helix Cylinders
	
	//front helix cylinder
	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad,1,0,0);
 	this.scene.translate(0,3,-0.2);
 	this.scene.scale(0.3,0.3,0.3);
	this.scene.currAppearance[3].apply();
	this.base1.display();
 	this.scene.popMatrix();
	
	//back helix cylinder 	
	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad,1,0,0);
 	this.scene.translate(0,-3,-0.2);
 	this.scene.scale(0.3,0.3,0.3);
	this.base1.display();
 	this.scene.popMatrix();
	
	//right helix cylinder(relative to initial position)
	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad,1,0,0);
 	this.scene.translate(-3,0,-0.2);
 	this.scene.scale(0.3,0.3,0.3);
	this.base1.display();
 	this.scene.popMatrix();
	
	//left helix cylinder(relative to initial position)
 	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad,1,0,0);
 	this.scene.translate(3,0,-0.2);
 	this.scene.scale(0.3,0.3,0.3);
	this.base1.display();
 	this.scene.popMatrix();

 

	
	//Helix Cylinder Upper Tops
	
	//front helix cylinder upper top
 	this.scene.pushMatrix();
 	this.scene.rotate(-90*degToRad,1,0,0);
 	this.scene.translate(0,-3,0.2);
 	this.scene.scale(0.3,0.3,0.3);
	this.scene.currAppearance[1].apply();
	this.top.display();
 	this.scene.popMatrix();
	
	//back helix cylinder upper top
 	this.scene.pushMatrix();
 	this.scene.rotate(-90*degToRad,1,0,0);
 	this.scene.translate(0,3,0.2);
 	this.scene.scale(0.3,0.3,0.3);
	this.scene.currAppearance[3].apply();
	this.top.display();
 	this.scene.popMatrix();

	//right helix cylinder upper top(relative to initial position)
	this.scene.pushMatrix();
 	this.scene.rotate(-90*degToRad,1,0,0);
 	this.scene.translate(-3,0,0.2);
 	this.scene.scale(0.3,0.3,0.3);
	this.top.display();
 	this.scene.popMatrix();
	
	//left helix cylinder upper top(relative to initial position)
 	this.scene.pushMatrix();
 	this.scene.rotate(-90*degToRad,1,0,0);
 	this.scene.translate(3,0,0.2);
 	this.scene.scale(0.3,0.3,0.3);
	this.top.display();
 	this.scene.popMatrix();


 	//Helix Cylinder Lower Tops
 	
	//front helix cylinder lower top
	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad,1,0,0);
 	this.scene.translate(0,3,0.1);
 	this.scene.scale(0.3,0.3,0.3);
 	this.scene.currAppearance[3].apply();
	this.top.display();
 	this.scene.popMatrix();

	//back helix cylinder lower top
 	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad,1,0,0);
 	this.scene.translate(0,-3,0.1);
 	this.scene.scale(0.3,0.3,0.3);
	this.top.display();
 	this.scene.popMatrix();

	//right helix cylinder upper top(relative to initial position)
	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad,1,0,0);
 	this.scene.translate(-3,0,0.1);
 	this.scene.scale(0.3,0.3,0.3);
	this.top.display();
 	this.scene.popMatrix();
	
	//left helix cylinder lower top(relative to initial position)
 	this.scene.pushMatrix();
 	this.scene.rotate(90*degToRad,1,0,0);
 	this.scene.translate(3,0,0.1);
 	this.scene.scale(0.3,0.3,0.3);
	this.top.display();
 	this.scene.popMatrix();
 

 	//Helix Bases
	
	//front helix base
 	this.scene.pushMatrix();
 	this.scene.translate(0,0.2,3);
 	this.scene.scale(0.1,0.1,0.1);
	this.scene.currAppearance[3].apply();
	this.helixbase.display();
 	this.scene.popMatrix();
 
	//back helix base
	this.scene.pushMatrix();
 	this.scene.translate(0,0.2,-3);
 	this.scene.scale(0.1,0.1,0.1);
	this.helixbase.display();
 	this.scene.popMatrix();

 	//right helix base(relative to initial position)
	this.scene.pushMatrix();
 	this.scene.translate(-3,0.2,0);
 	this.scene.scale(0.1,0.1,0.1);
	this.helixbase.display();
 	this.scene.popMatrix();

	//left helix base(relative to initial position)
	this.scene.pushMatrix();
 	this.scene.translate(3,0.2,0);
 	this.scene.scale(0.1,0.1,0.1);
	this.helixbase.display();
 	this.scene.popMatrix(); 
	
 	 //Helixes
	 
	 //front helix
 	this.scene.pushMatrix();
 	this.scene.translate(0,0.2,2.99);
 	this.scene.currAppearance[2].apply();
	this.helixfront.display();
 	this.scene.popMatrix();

	//back helix
	this.scene.pushMatrix();
 	this.scene.translate(0,0.2,-2.99);
	this.helixback.display();
 	this.scene.popMatrix();
	
	//right helix(relative to initial position)
	this.scene.pushMatrix();
 	this.scene.translate(-3,0.2,0);
	this.helixright.display();
 	this.scene.popMatrix();
	
	//left helix(relative to initial position)
 	this.scene.pushMatrix();
 	this.scene.translate(3,0.2,0);
	this.helixleft.display();
 	this.scene.popMatrix();
	
	this.scene.popMatrix();

 };

 MyDrone.prototype.update = function(currTime)
{	
	this.checkAttach();
	switch(this.state)
	{
	case("static"):
		this.helixback.update(1,currTime);
		this.helixfront.update(1,currTime);
		this.helixright.update(1,currTime);
		this.helixleft.update(1,currTime);
		this.leanAng=0;
		break;

	case("rotateRight"):
		this.helixback.update(0.2,currTime);
		this.helixfront.update(0.2,currTime);
		this.helixright.update(10,currTime);
		this.helixleft.update(10,currTime);
		this.leanAng=0;
		break;

	case("rotateLeft"):
		this.helixback.update(0.2,currTime);
		this.helixfront.update(0.2,currTime);
		this.helixright.update(10,currTime);
		this.helixleft.update(10,currTime);
		this.leanAng=0;
		break;

	case("moveUp"):
		this.leanAng=0;
		break;

	case("moveDown"):
		this.leanAng=0;
		break;
	}

	this.dtime = currTime-this.prevtime;
	this.prevtime = currTime;
	
	if (this.initial == 0)
	{
		this.dtime = 0;
		this.initial++;
	}

	if(this.dtime>=this.updInt)
	{
		switch(this.state)
		{
			case("moveForward"):
				this.helixback.update(10,currTime);
				this.helixfront.update(0.2,currTime);
				this.helixright.update(1,currTime);
				this.helixleft.update(1,currTime);
				this.leanAng=this.leanAng-2*Math.PI*(this.dtime/1000%60);
				if(this.leanAng<=this.maxleanfwd)
				this.leanAng=this.maxleanfwd;
				break;
				
			case("moveBackwards"):
				this.helixback.update(0.2,currTime);
				this.helixfront.update(10,currTime);
				this.helixright.update(1,currTime);
				this.helixleft.update(1,currTime);
				this.leanAng=this.leanAng+2*Math.PI*(this.dtime/1000%60);
				if(this.leanAng>=this.maxleanbwd)
				this.leanAng=this.maxleanbwd;
				break;
		}
		prevtime=currTime;
	}
}

MyDrone.prototype.getHookPos = function(){
	var hookPos=[this.droneX,this.droneY-this.cable.scalefactor-0.2,this.droneZ];
	return hookPos;
}

MyDrone.prototype.checkAttach = function()
{
	var hookPos=this.getHookPos();
	var cargoPos = this.scene.cargo.getCargoPos();
	if((cargoPos[0]-0.70)<hookPos[0])
		if((cargoPos[0]+0.70)>hookPos[0])
			if((cargoPos[1]-0.70)<hookPos[1])
				if((cargoPos[1]+0.70)>hookPos[1])
					if((cargoPos[2]-0.70)<hookPos[2])
						if((cargoPos[2]+0.70)>hookPos[2])
							if(this.scene.cargo.isAttached===false)
							{
								this.scene.cargo.isAttached=true;
								this.scene.cargo.isDuck=true;
							}
							
}

