/**
 * CylinderPrimitive
 * @constructor
 */
 function CylinderPrimitive(scene, base_r, top_r, height, slices, stacks, minS, maxS, minT, maxT) {
 	CGFobject.call(this,scene);
	
 	this.base_r=base_r; //origin
 	this.top_r=top_r;
 	this.height=height;
	this.slices = slices;
	this.stacks = stacks;
	this.minS = minS || 0.0;
	this.maxS = maxS || 1.0;
	this.minT = minT || 0.0;
	this.maxT = maxT || 1.0;
	this.incT=(this.maxT - this.minT)/this.stacks;
	this.incS=(this.maxS - this.minS)/this.slices;
 	this.initBuffers();
 };

 CylinderPrimitive.prototype = Object.create(CGFobject.prototype);
 CylinderPrimitive.prototype.constructor = CylinderPrimitive;

 CylinderPrimitive.prototype.initBuffers = function() {

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords  = [];

 	var ang=0;
 	
 	var vi=1;
 	var angInc=(2*Math.PI) / this.slices;
 	var stackInc = 1.0 / this.stacks;
 	var difRad=(this.top_r - this.base_r)/this.stacks;
 	var iniRad=this.base_r;
 	var s = this.minS;

	for(var i=0; i <= this.slices; i++)
	{
		var x1=Math.cos(ang);
		var y1=Math.sin(ang);
		var t=this.minT;
		var z=0;

		for(var a=0; a <= this.stacks; a++){
			this.vertices.push(x1,y1,z);
			this.normals.push(x1,y1,0);
			this.texCoords.push(s,t);
			z=stackInc+z;
			t=this.incT+t;
		}
		ang+=angInc;
		s+=this.incS;
		
	}

    for (var i = 0; i < this.slices; i++) {

        for (var j = 0; j < this.stacks; j++) {

            this.indices.push(vi, vi + this.stacks, vi + this.stacks + 1);
            this.indices.push(vi + this.stacks, vi, vi - 1);
            this.indices.push(vi + this.stacks + 1, vi + this.stacks, vi);
            this.indices.push(vi, vi + this.stacks, vi - 1);

            vi++;
        }

        vi++;
    }
		
	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
	
 	
 };

