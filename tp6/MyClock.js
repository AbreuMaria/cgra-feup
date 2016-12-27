function MyClock(scene, slices,stacks) {
 	CGFobject.call(this,scene);
	this.cyl=new MyCylinder(scene,slices,stacks);
	this.cyl.initBuffers();
 	this.top1=new MyCircle(scene,slices);
 	this.top1.initBuffers();

 	this.hHand=new MyClockHand(scene, 0.5);
 	this.hHand.initBuffers();
 	
 	this.minHand=new MyClockHand(scene,0.8);
 	this.minHand.initBuffers();
 	
 	this.sHand=new MyClockHand(scene, 0.9);
 	this.sHand.initBuffers();
 	
 	this.hHandTex=new CGFappearance(this.scene);
 	this.hHandTex.setAmbient(1,1,1,1);
	this.hHandTex.setDiffuse(0/255,0/255,0/255,1.0);
	this.hHandTex.setSpecular(0,0,0,1);
	
	this.minHandApp=new CGFappearance(this.scene);
 	this.minHandApp.setAmbient(1,1,1,1);
	this.minHandApp.setDiffuse(255/255,255/255,73/255,1.0);
	this.minHandApp.setSpecular(0,0,0,1);
	
	this.sHandApp=new CGFappearance(this.scene);
 	this.sHandApp.setAmbient(1,1,1,1);
	this.sHandApp.setDiffuse(100/255,0/255,5/255,1.0);
	this.sHandApp.setSpecular(0,0,0,1);
 	
 	this.clockTex = new CGFappearance(this.scene);
	this.clockTex.setAmbient(1,1,1,1);
	this.clockTex.setDiffuse(255/255,255/255,255/255,1.0);
	this.clockTex.setSpecular(1,1,1,1);
	this.clockTex.loadTexture("../resources/images/clock.png");

 	this.lastUpd=0;
 	this.updInt=1000;

 	this.incS=360/60;
	this.incM=this.incS/60;
	this.incH=this.incM/12;

 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {
	this.scene.pushMatrix();
	this.cyl.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.clockTex.apply();
	this.top1.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.sHandApp.apply();
	this.sHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.minHandApp.apply();
	this.minHand.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0,1);
	this.hHandTex.apply();
	this.hHand.display();
	this.scene.popMatrix();
 };

 MyClock.prototype.update = function(currTime) 
{

 if(this.lastUpd==0)
 {
 	var secP=Math.round(currTime/1000)%60;
 	var minP=Math.round(currTime/1000/60)%60;
 	var hrP=Math.round(currTime/1000/60/60)%12;
 	
 	this.sHand.setAngle(secP*this.incS);
 	this.minHand.setAngle(minP*this.incS + secP*this.incM);
 	this.hHand.setAngle(hrP*(360/12)+minP*this.incM+secP*this.incH);

 	this.lastUpd=currTime;
 }

 if(currTime-this.lastUpd>=this.updInt)
 {
 	this.sHand.incAngle(this.incS);
 	this.minHand.incAngle(this.incM);
 	this.hHand.incAngle(this.incH);

 	this.lastUpd=currTime;
 }
}