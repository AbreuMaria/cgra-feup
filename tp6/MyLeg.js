/**
 * MyLeg
 * @constructor
 */
 function MyLeg(scene,slices) {
 	CGFobject.call(this,scene);
	this.slices=slices
 	this.initBuffers();
 };

 MyLeg.prototype = Object.create(CGFobject.prototype);
 MyLeg.prototype.constructor = MyLeg;

 MyLeg.prototype.initBuffers = function() {
	
	this.vertices = [];
	this.indices = [];
	this.texCoords=[];
	this.normals =[];

	var ang;
	var inc=0.06;
	var width=0.2;
	var portion; //will represent the 2 segments of the parabolic curve


	for (portion=-1; portion<=1; portion+=1) 
	{
		this.vertices.push(0, 0, -width);
		this.texCoords.push(0, 0);
		this.normals.push(0, 1, 0);
		this.vertices.push(0, 0, width);
		this.texCoords.push(1, 0);
		this.normals.push(0, 1, 0);

		for(var i=1; i<15; i++)
		{
			var vertX=i*inc;
			var vertY=(vertX*vertX);
			this.vertices.push(vertX,vertY,width);
			width=-width;

			this.texCoords.push(width*15, vertY);

			var gradient=-(vertX/vertY);
			ang=Math.atan(gradient);
			this.normals.push(Math.cos(ang),Math.sin(ang),0);

		}

		this.vertices.push(1,1,width);
		this.texCoords.push(1,1);
		this.normals.push(Math.cos(Math.atan(-1)),Math.sin(Math.atan(-1)),0);
		this.vertices.push(1,1,-width);
		this.texCoords.push(1,0);
		this.normals.push(Math.cos(Math.atan(-1)),Math.sin(Math.atan(-1)),0);
	}


	var h=18;	
	for(i=2;i<16;i++)
	{
		this.indices.push(h+0+i,h+2+i,h+1+i);
		this.indices.push(h+0+i,h+1+i,h+2+i);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 	
 };
