/**
 * myTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function myTable(scene) {
	CGFobject.call(this,scene);
	this.quad=new MyUnitCubeQuad(this.scene);
	this.quad.initBuffers();
	
	this.woodM = new CGFappearance(this.scene);
	this.metalM = new CGFappearance(this.scene);
	this.woodM.setAmbient(0.8,0.8,0.3,1);
	this.woodM.setDiffuse(153/255,76/255,0/255,1.0);
	this.woodM.setSpecular(0.05,0.05,0.05,1);
	this.woodM.setShininess(120);
	this.woodM.loadTexture("../resources/images/table.png");

	this.metalM.setAmbient(0.1,0.9,1,1);
	this.metalM.setDiffuse(143/255,143/255,143/255,1.0);
	this.metalM.setSpecular(1,1,1,1);
	this.metalM.setShininess(240);


};

myTable.prototype = Object.create(CGFobject.prototype);
myTable.prototype.constructor=myTable;

myTable.prototype.display = function () {
	//perna esquerda frontal
	this.scene.pushMatrix();
	this.scene.translate(-2.25, 1.85, 1.25);
	this.scene.scale(0.3, 3.5, 0.3);
	this.metalM.apply();
	this.quad.display();
	this.scene.popMatrix();
	
	//perna esquerda traseira
	this.scene.pushMatrix();
	this.scene.translate(-2.25, 1.85, -1.25);
	this.scene.scale(0.3, 3.5, 0.3);
	this.quad.display();
	this.scene.popMatrix();
	
	//perna direita frontal
	this.scene.pushMatrix();
	this.scene.translate(2.25, 1.85, 1.25);
	this.scene.scale(0.3, 3.5, 0.3);
	this.quad.display();
	this.scene.popMatrix();

	//perna direita traseira
	this.scene.pushMatrix();
	this.scene.translate(2.25, 1.85, -1.25);
	this.scene.scale(0.3, 3.5, 0.3);
	this.quad.display();
	this.scene.popMatrix();
	
	//tampo da mesa
	this.scene.pushMatrix();
	this.scene.translate(0, 3.55, 0);
	this.scene.scale(5, 0.3, 3);
	this.woodM.apply();
	this.quad.display();
	this.scene.popMatrix();
};
