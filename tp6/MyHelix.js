/**
 * MyHelix
 * @constructor
 */
 function MyHelix(scene,stacks,slices,type) {
 	CGFobject.call(this,scene);

	this.helixAng=90*degToRad;
	this.dtime=0;
	this.prevtime=0;
	this.initial=0;
	this.updInt=10;
	this.base1=new MyCylinder(scene,stacks/2,slices/2);
	this.base1.initBuffers();
	this.state="static";
	this.type=type;
	
	this.stacks=stacks;
	this.slices=slices;
 };

 MyHelix.prototype = Object.create(CGFobject.prototype);
 MyHelix.prototype.constructor = MyHelix;

 MyHelix.prototype.display = function() {
	

	this.scene.pushMatrix();
 	this.scene.rotate(this.helixAng,0,1,0);
 	this.scene.scale(1.3,0.001,0.1);
	this.base1.display();
	this.scene.popMatrix();

 };

 MyHelix.prototype.update = function(vel,currTime)
{	
	this.dtime = currTime-this.prevtime;
	this.prevtime = currTime;
	
	if (this.initial == 0)
	{
		this.dtime = 0;
		this.initial++;
	}

	if(this.dtime>=this.updInt)
	{
		switch(this.type)
		{
			case "front/back":
				this.helixAng=this.helixAng+((2*Math.PI)/vel)*(this.dtime/1000%60)*this.scene.speed;
				break;

			case "side":
				this.helixAng=this.helixAng-((2*Math.PI)/vel)*(this.dtime/1000%60)*this.scene.speed;
				break;
		}
		this.prevtime=currTime;
	}
}

