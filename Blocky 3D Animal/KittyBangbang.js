// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`


// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_GlobalRotateMatrix;

// Globals related UI elements
let g_selectedColor = [1.0,1.0,1.0,1.0];
let g_selectedSize = 5;
let g_globalAngle = 35;
let g_headAngle = 0;
let g_headAnimation = true;
let g_tailAngle = 0;
let g_tailAnimation = true;
let g_legAngle = 0;
let g_legAnimation = true;
let g_feetAngle = 0;
let g_feetAnimation = true;


function setupWebGL() {
    // Retrieve <canvas> element
    canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    // gl = getWebGLContext(canvas);
    gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Get the storage location of a_Position
    a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // Get the storage location of u_FragColor
    u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) {
        console.log('Failed to get the storage location of u_FragColor');
        return;
    }

    // Get the storage location of u_ModelMatrix
    u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if(!u_ModelMatrix){
        console.log('Failed to get the storage location of u_ModelMatrix');
        return;
    }

    // Get the storage location of u_GlobalRotateMatrix
    u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
    if(!u_GlobalRotateMatrix){
        console.log('Failed to get the storage location of u_GlobalRotateMatrix');
        return;
    }
}

function addActionsForHtmlUI() {

    // Button Events
    document.getElementById('animationonHeadOnButton').onclick = function() { g_headAnimation=true; };
    document.getElementById('animationonHeadOffButton').onclick = function() { g_headAnimation=false; };
    document.getElementById('animationonTailOnButton').onclick = function() { g_tailAnimation=true; };
    document.getElementById('animationonTailOffButton').onclick = function() { g_tailAnimation=false; };
    document.getElementById('animationonLegOnButton').onclick = function() { g_legAnimation=true; };
    document.getElementById('animationonLegOffButton').onclick = function() { g_legAnimation=false; };
    document.getElementById('animationonFeetOnButton').onclick = function() { g_feetAnimation=true; };
    document.getElementById('animationonFeetOffButton').onclick = function() { g_feetAnimation=false; };

    // Slider Events
	  document.getElementById('headSlide').addEventListener('mousemove',  function() {g_headAngle = this.value; renderAllShapes(); });
    document.getElementById('tailSlide').addEventListener('mousemove',  function() {g_tailAngle = this.value; renderAllShapes(); });
    document.getElementById('legSlide').addEventListener('mousemove',  function() {g_legAngle = this.value; renderAllShapes(); });
    document.getElementById('feetSlide').addEventListener('mousemove',  function() {g_feetAngle = this.value; renderAllShapes(); });

    // Angle Slider Events
	document.getElementById('angleSlide').addEventListener('mousemove', function() {g_globalAngle = this.value; renderAllShapes(); });
}

function main() {

    // Set up canvas and gl variables
    setupWebGL();
    // Set up GLSL shader programs and connect GLSL variables
    connectVariablesToGLSL();

    // Set up actions for the HTML UI elements
    addActionsForHtmlUI();

    // Specify the color for clearing <canvas>
    gl.clearColor(0.9, 0.2, 0.33, 1.0);

    requestAnimationFrame(tick);
}

var g_startTime=performance.now()/1000.0;
var g_seconds=performance.now()/1000.0-g_startTime;

// Called by browser repeatedly whenever its time
function tick() {
    // Save the current time
    g_seconds=performance.now()/1000.0-g_startTime;

    // Update Animation Angles
    updateAnimationAngles();

    // Draw everything
    renderAllShapes();

    // Tell the browser to update again when it has time
    requestAnimationFrame(tick);
}

function updateAnimationAngles() {

    if (g_headAnimation) {
        g_headAngle = (10*Math.sin(g_seconds*2));
    }
    if (g_tailAnimation) {
        g_tailAngle = (45*Math.sin(g_seconds*2));
    }
    if (g_legAnimation) {
        g_legAngle = (15*Math.sin(g_seconds*2));
    }
    if (g_feetAnimation) {
        g_feetAngle = (5*Math.sin(g_seconds*2));
    }
}

//Draw every shape that is supposed to be in the canvas
function renderAllShapes() {

    // Check the time at the start of this function
    var startTime = performance.now();

    // Pass the matrix to u_ModelMatrix attribute
    var globalRotMat = new Matrix4().rotate(g_globalAngle,0,1,0);
    gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw buildings around the cat
    var building1 = new Cube();
    building1.color = [1,1,1,1];
    building1.matrix.translate(-0.8,-1,0.7);
    var buildingCoordinatesMat = new Matrix4(building1.matrix);
    building1.matrix.scale(0.3,5,-0.45);
    building1.matrix.translate(-0.15,-0.1,-0.7);
    building1.render();

    var building2 = new Cube();
    building2.color = [0,0,0,1];
    building2.matrix.translate(-0.8,-1,-0.7);
    var buildingCoordinatesMat2 = new Matrix4(building2.matrix);
    building2.matrix.scale(0.3,5,-0.45);
    building2.matrix.translate(-0.15,-0.1,-0.4);
    building2.render();

    var building3 = new Cube();
    building3.color = [0,0,0,1];
    building3.matrix.translate(-0.7,-1,0.9);
    var buildingCoordinatesMat3 = new Matrix4(building3.matrix);
    building3.matrix.scale(0.3,5,-0.45);
    building3.matrix.translate(-0.15,-0.1,-0.4);
    building3.render();

    var building4 = new Cube();
    building4.color = [1,1,1,1];
    building4.matrix.translate(0.3,-0.7,0.7);
    var buildingCoordinatesMat4 = new Matrix4(building4.matrix);
    building4.matrix.scale(0.3,5,-0.45);
    building4.matrix.translate(-0.15,-0.12,-0.7);
    building4.render();

    var building5 = new Cube();
    building5.color = [0,0,0,1];
    building5.matrix.translate(0.5,-0.7,0.7);
    var buildingCoordinatesMat5 = new Matrix4(building5.matrix);
    building5.matrix.scale(0.3,5,-0.45);
    building5.matrix.translate(-0.15,-0.12,-0.7);
    building5.render();

    // Draw head
    var head = new Cube();
    head.color = [0,0,0,1];
    head.matrix.translate(0,-0.12,0);
    head.matrix.rotate(-5,1,0,0);
    head.matrix.rotate(-g_headAngle,0,0,1);
    var headCoordinatesMat = new Matrix4(head.matrix);
    head.matrix.scale(0.3,0.3,0.3);
    head.matrix.translate(-0.5,-0.1,-0.7);
    head.render();

    // Draw ear
    var leftEar = new Cube();
    leftEar.color = [1,1,1,1];
    leftEar.matrix = headCoordinatesMat;
    leftEar.matrix.translate(-0.15,0.27,-0.1);
    leftEar.matrix.rotate(0,0,0,1);
    leftEar.matrix.scale(0.1,0.1,0.1);
    leftEar.render();
    var leftInnerEar = new Cube();
    leftInnerEar.color = [1,0.75,0.7,1];
    leftInnerEar.matrix = new Matrix4(headCoordinatesMat);
    leftInnerEar.matrix.translate(0.1,0,-0.1);
    leftInnerEar.matrix.rotate(0,0,0,1);
    leftInnerEar.matrix.scale(0.7,0.7,0.3);
    leftInnerEar.render();

    var rightEar = new Cube();
    rightEar.color = [0,0,0,1];
    rightEar.matrix = new Matrix4(headCoordinatesMat);
    rightEar.matrix.translate(2,-0,0);
    rightEar.matrix.rotate(0,0,0,1);
    rightEar.matrix.scale(1,1,1);
    rightEar.render();
    var rightInnerEar = new Cube();
    rightInnerEar.color = [1,0.75,0.7,1];
    rightInnerEar.matrix = new Matrix4(headCoordinatesMat);
    rightInnerEar.matrix.translate(2.2,0,-0.1);
    rightInnerEar.matrix.rotate(0,0,0,1);
    rightInnerEar.matrix.scale(0.7,0.7,0.3);
    rightInnerEar.render();

    // Draw face
    var leftEye = new Cube();
    leftEye.color = [1,1,0,1];
    leftEye.matrix = new Matrix4(headCoordinatesMat);
    leftEye.matrix.translate(0.35,-1.6,-0.7);
    leftEye.matrix.scale(0.6,0.7,-0.5);
    leftEye.render();
    var rightEye = new Cube();
    rightEye.color = [1,1,0,1];
    rightEye.matrix = new Matrix4(headCoordinatesMat);
    rightEye.matrix.translate(2,-1.6,-0.7);
    rightEye.matrix.scale(0.6,0.7,-0.5);
    rightEye.render();

    var nose = new Cube();
    nose.color = [1,0,0,1];
    nose.matrix = new Matrix4(headCoordinatesMat);
    nose.matrix.translate(1.35,-2.1,-0.7);
    nose.matrix.scale(0.3,0.3,-0.5);
    nose.render();

    // cat whiskers
    var leftUp = new Cube();
    leftUp.color = [1,1,1,1];
    leftUp.matrix = new Matrix4(headCoordinatesMat);
    leftUp.matrix.translate(-0.3,-2,-0.7);
    leftUp.matrix.scale(1,0.1,-0.5);
    leftUp.render();
    var leftMid = new Cube();
    leftMid.color = [1,1,1,1];
    leftMid.matrix = new Matrix4(headCoordinatesMat);
    leftMid.matrix.translate(-0.3,-2.2,-0.7);
    leftMid.matrix.scale(1,0.1,-0.5);
    leftMid.render();
    var leftDown = new Cube();
    leftDown.color = [1,1,1,1];
    leftDown.matrix = new Matrix4(headCoordinatesMat);
    leftDown.matrix.translate(-0.3,-2.4,-0.7);
    leftDown.matrix.scale(1,0.1,-0.5);
    leftDown.render();

    var rightUp = new Cube();
    rightUp.color = [1,1,1,1];
    rightUp.matrix = new Matrix4(headCoordinatesMat);
    rightUp.matrix.translate(2.3,-2,-0.7);
    rightUp.matrix.scale(1,0.1,-0.5);
    rightUp.render();
    var rightMid = new Cube();
    rightMid.color = [1,1,1,1];
    rightMid.matrix = new Matrix4(headCoordinatesMat);
    rightMid.matrix.translate(2.3,-2.2,-0.7);
    rightMid.matrix.scale(1,0.1,-0.5);
    rightMid.render();
    var rightDown = new Cube();
    rightDown.color = [1,1,1,1];
    rightDown.matrix = new Matrix4(headCoordinatesMat);
    rightDown.matrix.translate(2.3,-2.4,-0.7);
    rightDown.matrix.scale(1,0.1,-0.5);
    rightDown.render();

    // Draw body
    var body = new Cube();
    body.color = [1,1,1,1];
    body.matrix.translate(-0.2,-0.45,0);
    body.matrix.rotate(-5,1,0,0);
    var bodyCoordinatesMat = new Matrix4(body.matrix);
    body.matrix.scale(0.4, 0.3, 0.2);
    body.render();
    var body2 = new Cube();
    body2.color = [0,0,0,1];
    body2.matrix = new Matrix4(bodyCoordinatesMat);
    body2.matrix.translate(0,0,0.2);
    body2.matrix.scale(0.4, 0.3, 0.2);
    body2.render();
    var body3 = new Cube();
    body3.color = [1,1,1,1];
    body3.matrix = new Matrix4(bodyCoordinatesMat);
    body3.matrix.translate(0,0,0.4);
    var body3CoordinatesMat = new Matrix4(body3.matrix);
    body3.matrix.scale(0.4, 0.3, 0.2);
    body3.render();

    // Draw tail (Orange => Black => Orange)
    var tail1 = new Cube();
    tail1.color = [0,0,0,1];
    tail1.matrix.translate(-0.005,-0.15,0.55);
    tail1.matrix.rotate(-g_tailAngle,0,0,1);
    var tail1CoordinatesMat = new Matrix4(tail1);
    tail1.matrix.scale(0.1,0.1,0.1);
    tail1.render();
    var tail2 = new Cube();
    tail2.color = [1,1,1,1];
    tail2.matrix = new Matrix4(tail1CoordinatesMat);
    tail2.matrix.translate(-0.005,-0.05,0.55);
    tail2.matrix.rotate(-g_tailAngle,0,0,1);
    tail2.matrix.scale(0.1,0.1,0.1);
    tail2.render();
    var tail3 = new Cube();
    tail3.color = [0,0,0,1];
    tail3.matrix = new Matrix4(tail1CoordinatesMat);
    tail3.matrix.translate(-0.005,0.05,0.55);
    tail3.matrix.rotate(-g_tailAngle,0,0,1);
    tail3.matrix.scale(0.1,0.1,0.1);
    tail3.render();
    var tail4 = new Cube();
    tail4.color = [1,1,1,1];
    tail4.matrix = new Matrix4(tail1CoordinatesMat);
    tail4.matrix.translate(-0.005,0.15,0.55);
    tail4.matrix.rotate(-g_tailAngle,0,0,1);
    tail4.matrix.scale(0.1,0.1,0.1);
    tail4.render();

    // Draw leg (LeftFront => LeftBack  => RightFront => RightBack)
    var leftFrontLeg = new Cube();
    leftFrontLeg.color = [0,0,0,1];
    leftFrontLeg.matrix = new Matrix4(bodyCoordinatesMat);
    leftFrontLeg.matrix.translate(0.05,-0.05,0.05);
    leftFrontLeg.matrix.rotate(-g_legAngle,1,0,0);
    var leftFrontLegCoordinatesMat = new Matrix4(leftFrontLeg.matrix);
    leftFrontLeg.matrix.scale(0.1,0.1,0.1);
    leftFrontLeg.render();
    var leftFrontFeet = new Cube();
    leftFrontFeet.color = [1,1,1,1];
    leftFrontFeet.matrix = new Matrix4(leftFrontLegCoordinatesMat);
    leftFrontFeet.matrix.translate(0,-0.05,0);
    leftFrontFeet.matrix.rotate(-g_feetAngle,1,0,0);
    leftFrontFeet.matrix.scale(0.1,0.05,0.1);
    leftFrontFeet.render();

    var leftBackLeg = new Cube();
    leftBackLeg.color = [1,1,1,1];
    leftBackLeg.matrix = new Matrix4(body3CoordinatesMat);
    leftBackLeg.matrix.translate(0.05,-0.05,0.05);
    leftBackLeg.matrix.rotate(-g_legAngle,1,0,0);
    var leftBackLegCoordinatesMat = new Matrix4(leftBackLeg.matrix);
    leftBackLeg.matrix.scale(0.1,0.1,0.1);
    leftBackLeg.render();
    var leftBackFeet = new Cube();
    leftBackFeet.color = [0,0,0,1];
    leftBackFeet.matrix = new Matrix4(leftBackLegCoordinatesMat);
    leftBackFeet.matrix.translate(0,-0.05,0);
    leftBackFeet.matrix.rotate(-g_feetAngle,1,0,0);
    leftBackFeet.matrix.scale(0.1,0.05,0.1);
    leftBackFeet.render();

    var rightFrontLeg = new Cube();
    rightFrontLeg.color = [1,1,1,1];
    rightFrontLeg.matrix = new Matrix4(bodyCoordinatesMat);
    rightFrontLeg.matrix.translate(0.25,-0.05,0.05);
    rightFrontLeg.matrix.rotate(-g_legAngle,1,0,0);
    var rightFrontLegCoordinatesMat = new Matrix4(rightFrontLeg.matrix);
    rightFrontLeg.matrix.scale(0.1,0.1,0.1);
    rightFrontLeg.render();
    var rightFrontFeet = new Cube();
    rightFrontFeet.color = [0,0,0,1];
    rightFrontFeet.matrix = new Matrix4(rightFrontLegCoordinatesMat);
    rightFrontFeet.matrix.translate(0,-0.05,0);
    rightFrontFeet.matrix.rotate(-g_feetAngle,1,0,0);
    rightFrontFeet.matrix.scale(0.1,0.05,0.1);
    rightFrontFeet.render();

    var rightBackLeg = new Cube();
    rightBackLeg.color = [0,0,0,1];
    rightBackLeg.matrix = new Matrix4(body3CoordinatesMat);
    rightBackLeg.matrix.translate(0.25,-0.05,0.05);
    rightBackLeg.matrix.rotate(-g_legAngle,1,0,0);
    var rightBackLegCoordinatesMat = new Matrix4(rightBackLeg.matrix);
    rightBackLeg.matrix.scale(0.1,0.1,0.1);
    rightBackLeg.render();
    var rightBackFeet = new Cube();
    rightBackFeet.color = [1,1,1,1];
    rightBackFeet.matrix = new Matrix4(rightBackLegCoordinatesMat);
    rightBackFeet.matrix.translate(0,-0.05,0);
    rightBackFeet.matrix.rotate(-g_feetAngle,1,0,0);
    rightBackFeet.matrix.scale(0.1,0.05,0.1);
    rightBackFeet.render();

    // Check the time at the end of the function, and show on web page
    var duration = performance.now() - startTime;
    sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration)/10, "numdot");
}

// Set the text of a HTML element
function sendTextToHTML(text, htmlID) {
    var htmlElm = document.getElementById(htmlID);
    if (!htmlElm) {
        console.log("Failed to get " + htmlID + " from HTML");
        return;
    }
    htmlElm.innerHTML = text;
}
