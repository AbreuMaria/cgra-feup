/**
 * MyDome
 * @constructor
 */
 function MyDome(scene,slices,stacks,minS,maxS,minT,maxT) {
 	CGFobject.call(this,scene);
 	
	this.slices=slices;
	this.stacks=stacks;
	this.minS = minS || 0.0;
	this.maxS = maxS || 1.0;
	this.minT = minT || 0.0;
	this.maxT = maxT || 1.0;
	this.texelLS = (this.maxS - this.minS) / this.slices;
	this.texelLT = (this.maxT - this.minT) / this.stacks;
 	this.initBuffers();
 };

 MyDome.prototype = Object.create(CGFobject.prototype);
 MyDome.prototype.constructor = MyDome;

 MyDome.prototype.initBuffers = function() {
	this.vertices = [];
	this.normals =[];
	this.indices =[];
	this.texCoords=[];

	var coordS=this.maxS;
	var ang1 = 0;
	var ang1inc = (2 * Math.PI) / this.slices;
	var ang2inc = Math.PI/(2*this.stacks);

	for (var i = 0; i <= this.slices; i++) 
	{
		var ang2 = 0;
		var coordT=this.minT;

		for (var j = 0; j <= this.stacks; j++)
		{
			var x = Math.cos(ang1) * Math.sin(ang2);
			var y = Math.cos(ang2);
			var z = Math.sin(ang1) * Math.sin(ang2);

			this.vertices.push(x,y,z);
			this.normals.push(x,y,z);
			this.texCoords.push(coordS, coordT);

			ang2+=ang2inc;
			coordT+=this.texelLT;
		}
		
		ang1+=ang1inc;
		coordS-=this.texelLS;
	}

	this.indices = [];

    var nrV = 1;

    for (var i = 0; i < this.slices; i++) 
    {

        for (var j = 0; j < this.stacks; j++) 
        {

            this.indices.push(nrV, nrV + this.stacks, nrV + this.stacks + 1);
            this.indices.push(nrV + this.stacks, nrV, nrV - 1);
            this.indices.push(nrV + this.stacks + 1, nrV + this.stacks, nrV);
            this.indices.push(nrV, nrV + this.stacks, nrV - 1);

            nrV++;
        }

        nrV++;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};