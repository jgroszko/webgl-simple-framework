/**********/
/* Camera */
/**********/

var Camera = function(gl, canvas) {
    this.gl = gl;
    this.canvas = canvas;
    
    this.viewMatrix = mat4.lookAt([5.0, 5.0, 5.0],
                                  [0.0, 0.0, 0.0],
                                  [0.0, 1.0, 0.0]);
    this.perspectiveMatrix = mat4.perspective(45,
                                              canvas.width / canvas.height,
                                              0.1, 100.0);
    
    this.pvMatrix = mat4.multiply(this.perspectiveMatrix, this.viewMatrix, mat4.create());
    
    // So we're not allocating a new matrix on every apply()
    this.nMatrix = mat4.create();
};

Camera.prototype.apply = function(shader, mMatrix) {
    shader.uniformValues.uPVMatrix = this.pvMatrix;
    
    shader.uniformValues.uMMatrix = mMatrix;
    
    shader.uniformValues.uNMatrix = mat4.transpose(mat4.inverse(mMatrix, this.nMatrix));
};
