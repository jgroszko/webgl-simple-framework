/*************************/
/* requestAnimationFrame */
/*************************/

// shim layer with setTimeout fallback
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

/*********************/
/* MDN Bind Polyfill */
/*********************/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

/***************/
/* Application */
/***************/
var Application = function(){
    this.canvas = document.querySelector('canvas');
    this.gl = this.canvas.getContext("webgl");
    this.shaderProgram = new ShaderProgram(this.gl, "vertex_shader", "fragment_shader");
    this.camera = new Camera(this.gl, this.canvas);
    
    this.cubeMMatrix = mat4.identity(mat4.create());
    this.cube = new Cube(this.gl, this.shaderProgram);
    
    this.viewportWidth = this.canvas.width;
    this.viewportHeight = this.canvas.height;
    
    this.gl.clearColor(0.0, 0.0, 0.4, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    
    this.shaderProgram.uniformValues.uAmbientColor = [0.3, 0.3, 0.3];
    this.shaderProgram.uniformValues.uDirectionalColor = [0.3, 0.3, 0.3];
    this.shaderProgram.uniformValues.uLightingDirection = [0.25, 0.75, 0.25];
    
    this.draw();
};

Application.prototype.draw = function() {
    window.requestAnimFrame(this.draw.bind(this));
    
    this.gl.viewport(0, 0, this.viewportWidth, this.viewportHeight);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    this.camera.apply(this.shaderProgram, this.cubeMMatrix);
    this.cube.draw();
};

(function() {
    var app = new Application();
})();
