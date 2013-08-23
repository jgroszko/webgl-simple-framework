/******************/
/* Shader Program */
/******************/
var ShaderProgram = function(gl, vertexShaderId, fragmentShaderId) {
  var fragmentShader = this._getShader(gl, fragmentShaderId),
      vertexShader = this._getShader(gl, vertexShaderId),
      shaderProgram = gl.createProgram();
    
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
    
  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(gl.getShaderInfoLog(shaderProgram));
    return null;
  }
  
  gl.useProgram(shaderProgram);

  this.uniformLocations = {};
  this.uniformValues = {};

  this.attribLocations = {};

  this.gl = gl;
  this.shaderProgram = shaderProgram;
};

ShaderProgram.prototype.getAttribLocation = function(name) {
  if(!(name in this.attribLocations)) {
    this.attribLocations[name] = this.gl.getAttribLocation(this.shaderProgram, name);

  if(this.attribLocations[name] === -1) {
    console.log("Unable to find attribute " + name);
      }
  }
  
  return this.attribLocations[name];
};

ShaderProgram.prototype.enableAttributes = function() {
  for(var attrname in this.attribLocations) {
    if(this.attribLocations[attrname] >= 0) {
      this.gl.enableVertexAttribArray(this.attribLocations[attrname]);
    }
  }
};

ShaderProgram.prototype.getUniformLocation = function(name) {
  if(!(name in this.uniformLocations)) {
    var loc = this.gl.getUniformLocation(this.shaderProgram, name);

    if(loc === null) {
      console.log("Unable to find uniform " + name);
      return null;
    }

    this.uniformLocations[name] = loc;
  }

  return this.uniformLocations[name];
};

ShaderProgram.prototype.applyUniforms = function() {
  var gl = this.gl;

  for(var name in this.uniformValues) {
    var location = this.getUniformLocation(name);
    if(location === null) {
      console.log("Skipping " + name);
      continue;
    }

    if(typeof this.uniformValues[name] === "boolean" ||
       typeof this.uniformValues[name] === "number") {
      gl.uniform1i(location, this.uniformValues[name]);
    }
    else if(this.uniformValues[name].length >= 16) {
      gl.uniformMatrix4fv(location, false, this.uniformValues[name]);
    }
    else if(this.uniformValues[name].length == 4) {
      gl.uniform4fv(location, this.uniformValues[name]);
    }
    else if(this.uniformValues[name].length == 3) {
      gl.uniform3fv(location, this.uniformValues[name]);
    }
  }
};

ShaderProgram.prototype.apply = function() {
  this.gl.useProgram(this.shaderProgram);

  this.applyUniforms();
  this.enableAttributes();
};

ShaderProgram.prototype._getShader = function(gl, id) {
  var elem = document.getElementById(id);
  var source = "";
  var k = elem.firstChild;
  while(k) {
    if(k.nodeType == 3) {
      source += k.textContent;
    }
    k = k.nextSibling;
  }
    
  var shader;
  if(elem.type == 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else if(elem.type == 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }
  else {
    return null;
  }
    
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
    
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }
  
  return shader;
};
