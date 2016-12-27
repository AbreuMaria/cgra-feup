function MyHook(scene,stacks,slices) {
 	CGFobject.call(this,scene);

	this.hook1=new MyLeg(scene,6);
	this.hook2=new MyLeg(scene,6);
	this.hook3=new MyLeg(scene,6);
	this.top=new MyDome(scene,stacks,slices);

	this.topTex = new CGFappearance(this.scene);
	this.topTex.loadTexture("../resources/images/black.png");

	this.hookTex = new CGFappearance(this.scene);
	this.hookTex.loadTexture("../resources/images/silver.jpg");

 };

 MyHook.prototype = Object.create(CGFobject.prototype);
 MyHook.prototype.constructor = MyHook;

 MyHook.prototype.display = function() 
 {
 	//top of the hook
 	this.scene.pushMatrix();
 	this.scene.translate(0,-0.03,0);
	this.scene.rotate(180*degToRad, 1, 0, 0);
	this.scene.scale(-0.06,-0.06,-0.06);
	this.topTex.apply();
	this.top.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(180*degToRad, 1, 0, 0);
	this.scene.rotate(-190*degToRad, 0, 1, 0);
	this.scene.rotate(30*degToRad, 0, 0, 1);
	this.scene.scale(0.24,0.1,0.25);
	this.hookTex.apply();
	this.hook1.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(180*degToRad, 1, 0, 0);
	this.scene.rotate(45*degToRad, 0, 1, 0);
	this.scene.rotate(30*degToRad, 0, 0, 1);
	this.scene.scale(0.24,0.1,0.25);
	this.hookTex.apply();
	this.hook2.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.rotate(180*degToRad, 1, 0, 0);
	this.scene.rotate(-80*degToRad, 0, 1, 0);
	this.scene.rotate(30*degToRad, 0, 0, 1);
	this.scene.scale(0.24,0.1,0.25);
	this.hookTex.apply();
	this.hook3.display();
	this.scene.popMatrix();
 };

 /*MyClock.prototype.update = function(currTime) 
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
*/