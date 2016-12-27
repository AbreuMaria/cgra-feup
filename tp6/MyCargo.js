function MyCargo(scene, x, y, z) {
 	CGFobject.call(this, scene);

    this.x=x;
    this.y=y;
    this.z=z;
    this.cargoAng=-0;
 	this.cargo = new MyUnitCubeQuad(scene);
 	this.cargo.initBuffers();

 	this.isAttached=false;
 	this.isDuck=false;

 	this.cargoTex= new CGFappearance(this.scene);
	this.cargoTex.loadTexture("../resources/images/box.jpg");

	this.duckTex= new CGFappearance(this.scene);
	this.duckTex.loadTexture("../resources/images/duck.jpg");
 };

 MyCargo.prototype = Object.create(CGFobject.prototype);
 MyCargo.prototype.constructor = MyCargo;

 MyCargo.prototype.display = function() 
 {
     this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        this.scene.rotate(this.cargoAng,0,1,0);
        this.scene.scale(1.5, 1.5, 1.5);
        if(this.isDuck==true)
        {
            this.duckTex.apply();
            this.isDuck=true;
        }
        else
        {
           this.cargoTex.apply();
        }
        this.cargo.display();
     this.scene.popMatrix();
 }

 MyCargo.prototype.getCargoPos = function()
 {
     var cargoPos=[this.x, this.y, this.z];
     return cargoPos;
 }