/********/
/* Cube */
/********/

var Cube = function(gl, shaderProgram) {
    this.gl = gl;
    this.shaderProgram = shaderProgram;
    
    var vertexData = [
	    -1.0, -1.0,  1.0,  0.0, 0.0, 1.0,
	1.0, -1.0,  1.0,  0.0, 0.0, 1.0,
	1.0,  1.0,  1.0,  0.0, 0.0, 1.0,
	    -1.0,  1.0,  1.0,  0.0, 0.0, 1.0,
	    -1.0, -1.0, -1.0,  0.0, 0.0, -1.0,
	    -1.0,  1.0, -1.0,  0.0, 0.0, -1.0,
	1.0,  1.0, -1.0,  0.0, 0.0, -1.0,
	1.0, -1.0, -1.0,  0.0, 0.0, -1.0,
	    -1.0,  1.0, -1.0,  0.0, 1.0, 0.0,
	    -1.0,  1.0,  1.0,  0.0, 1.0, 0.0,
	1.0,  1.0,  1.0,  0.0, 1.0, 0.0,
	1.0,  1.0, -1.0,  0.0, 1.0, 0.0,
	    -1.0, -1.0, -1.0,  0.0, -1.0, 0.0,
	1.0, -1.0, -1.0,  0.0, -1.0, 0.0,
	1.0, -1.0,  1.0,  0.0, -1.0, 0.0,
	    -1.0, -1.0,  1.0,  0.0, -1.0, 0.0,
	1.0, -1.0, -1.0,  -1.0, 0.0, 0.0,
	1.0,  1.0, -1.0,  -1.0, 0.0, 0.0,
	1.0,  1.0,  1.0,  -1.0, 0.0, 0.0,
	1.0, -1.0,  1.0,  -1.0, 0.0, 0.0,
	    -1.0,  1.0, -1.0,  1.0, 0.0, 0.0,
	    -1.0,  1.0,  1.0,  1.0, 0.0, 0.0,
	    -1.0, -1.0,  1.0,  1.0, 0.0, 0.0,
	    -1.0, -1.0, -1.0,  1.0, 0.0, 0.0
    ];
    
    this.vertexCount = 24;
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
    
    var indexData = [
	0, 1, 2,    0, 2, 3,
	4, 5, 6,    4, 6, 7,
	8, 9, 10,   8, 10, 11,
	12, 13, 14, 12, 14, 15,
	16, 17, 18, 16, 18, 19,
	20, 21, 22, 20, 22, 23
    ];
    
    this.indexCount = 36;
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STATIC_DRAW);
    
    shaderProgram.uniformValues.uColor = [0.8, 0.8, 0.8, 1.0];
};

Cube.prototype.draw = function() {
    var gl = this.gl;
    
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(this.shaderProgram.getAttribLocation("aVertexPosition"),
                           3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 6,
                           0);
    gl.vertexAttribPointer(this.shaderProgram.getAttribLocation("aNormal"),
                           3, gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 6,
                           Float32Array.BYTES_PER_ELEMENT * 3);
    
    this.shaderProgram.apply();
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
};
