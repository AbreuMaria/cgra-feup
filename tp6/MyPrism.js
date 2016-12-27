/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];

 	var ang=0;
 	
 	var vi=0;
 	var angInc=(2*Math.PI) / this.slices;
 	var stackInc = 1.0 / this.stacks;

	for(var i=0; i<this.slices; i++)
	{
		var x1=Math.cos(ang);
		var y1=Math.sin(ang);

		var x2=Math.cos(ang+angInc);
		var y2=Math.sin(ang+angInc);

		var nx=Math.cos(ang+angInc/2);
		var ny=Math.sin(ang+angInc/2);

		var z=0;

		for(var a=0; a<= this.stacks; a++){
			this.vertices.push(x1,y1,z);
			this.vertices.push(x2,y2,z);
		
			this.normals.push(nx,ny,0);
			this.normals.push(nx,ny,0);
				
			
			

			z=stackInc+z;
		
			
		}
		ang+=angInc;
		
	}
			
	for (var i = 0; i < this.slices; i++) {
		 for (var j = 0; j < this.stacks; j++) {

			this.indices.push(0+vi);
			this.indices.push(1+vi);
			this.indices.push(2+vi);
	
			this.indices.push(3+vi);
			this.indices.push(2+vi);
			this.indices.push(1+vi);
			vi=vi+2;
		}
		vi=vi+2;
	}
		
	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
	
 	
 };
