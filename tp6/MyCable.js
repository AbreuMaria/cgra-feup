
/**
 * MyCable
 * @param gl {WebGLRenderingContext}
 * @constructor
 * function to make a cable with a hook
 */

function MyCable(scene, x, y, z) 
{
 	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;

	this.scalefactor=1.1;
	
	this.cable= new MyCylinder(scene,3,10);
	this.hook= new MyHook(scene,10,10);
	
	this.cableTex = new CGFappearance(this.scene);
	this.cableTex.loadTexture("../resources/images/rope.jpg");
}

 MyCable.prototype = Object.create(CGFobject.prototype);
 MyCable.prototype.constructor = MyCable;

 MyCable.prototype.display = function() {
	
	//cable
	this.scene.pushMatrix();
	this.scene.rotate(Math.PI/2,1,0,0);
 	this.scene.scale(0.1,0.1,this.scalefactor);
	this.cableTex.apply();
	this.cable.display();
 	this.scene.popMatrix();
	
	//hook
	this.scene.pushMatrix();
	this.scene.translate(0,-this.scalefactor,0);
	this.scene.scale(1.5,1.5,1.5);
	this.hook.display();
	this.scene.popMatrix();
	
 }
