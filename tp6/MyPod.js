
/**
 * MyPod
 * @param gl {WebGLRenderingContext}
 * @constructor
 * function to make a cable with a hook
 */

function MyPod(scene, x, y, z) 
{
 	CGFobject.call(this,scene);
	this.scene = scene;

	this.x = x;
	this.y = y;
	this.z = z;

	this.hasCargo=false;
	this.isWater=false;
	
	this.pod= new MyQuad(scene);
	this.pod.initBuffers();
	
	this.podTex = new CGFappearance(this.scene);
	this.podTex.loadTexture("../resources/images/beachtowel.jpg");

	this.waterTex = new CGFappearance(this.scene);
	this.waterTex.loadTexture("../resources/images/water.jpg");
}

 MyPod.prototype = Object.create(CGFobject.prototype);
 MyPod.prototype.constructor = MyPod;

 MyPod.prototype.display = function() {
	
	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);
		this.scene.rotate(-Math.PI/2,1,0,0);
 		this.scene.scale(2.3,2.3,2.3);
 		if(this.isWater==true)
 		{
			this.waterTex.apply();
 		}
 		else
 		{
 			this.podTex.apply();
 		}
		this.pod.display();
 	this.scene.popMatrix();
	
 }

 MyPod.prototype.getPodPos = function() 
 {
 	 var podPos=[this.x, this.y, this.z];
     return podPos;
 }
 