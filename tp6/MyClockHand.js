function MyClockHand(scene, size) 
{
	CGFobject.call(this,scene);
	this.angle=0;
	this.size=size || 0.5;
	this.cyl=new MyCylinder(this.scene,26,4);
	this.cyl.initBuffers();

	
	 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.display = function() {
	this.scene.pushMatrix();
	this.scene.rotate((90 - this.angle) * (Math.PI / 180.0), 0, 0, 1);
	this.scene.rotate(Math.PI/4, 1,0,0);
	this.scene.rotate(Math.PI/2, 0,1,0);
	this.scene.scale(0.035,0.02,this.size);
	this.cyl.display();
	this.scene.popMatrix();
 };

 MyClockHand.prototype.setAngle = function(ang) 
{
	this.angle = ang;
};

 MyClockHand.prototype.incAngle = function(ang) 
{
	this.angle += ang;
}