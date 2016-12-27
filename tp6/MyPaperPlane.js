/**
 * MyPaperPlane
 * @constructor
 */
 function MyPaperPlane(scene) {
 	CGFobject.call(this,scene);

 	this.initBuffers();
 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;

 MyPaperPlane.prototype.initBuffers = function() {
this.vertices = [
 	0, 0, 0,
 	-1, 0, 4,
 	1, 0, 4,
 	0, -0.5, 4,
 	-0.3, 0, 4,
 	0.3, 0, 4, 
 	];

 	this.indices = [
 	0, 1, 4,
 	1, 0, 4,

 	0, 5, 2,
 	5, 0, 2,

 	0, 5, 3,
 	5, 0, 3,
 	
 	0, 4, 3,
 	4, 0, 3,

 	];

 	this.normals = [
 	0,0,1,
 	0,0,-1,
    0,0,-1,
    0,0,-1,
    0,0,1,
    0,0,1
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	
 };
