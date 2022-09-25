// ColoredPoint.js (c) 2012 matsuda

var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  varying vec2 v_UV;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_ViewMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }
`

var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  uniform sampler2D u_Sampler4;
  uniform int u_whichTexture;
  void main() {
    if (u_whichTexture == -2) {
      gl_FragColor = u_FragColor;
    } else if (u_whichTexture == -1) {
      gl_FragColor = vec4(v_UV, 1.0, 1.0);
    } else if (u_whichTexture == 0) {
      gl_FragColor = texture2D(u_Sampler0, v_UV);
    } else if (u_whichTexture == 1) {
      gl_FragColor = texture2D(u_Sampler1, v_UV);
    } else if (u_whichTexture == 2) {
      gl_FragColor = texture2D(u_Sampler2, v_UV);
    } else if (u_whichTexture == 3) {
      gl_FragColor = texture2D(u_Sampler3, v_UV);
    }else if (u_whichTexture == 4) {
      gl_FragColor = texture2D(u_Sampler4, v_UV);
    } else {
      gl_FragColor = vec4(1, .2, .2, 1);
    }
  }
`
let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotateMatrix;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
/* let u_Sampler0; */
let u_whichTexture;

//global variable
let g_selectedAngle= 30;
let g_selectedAngle2 = 0;
let g_bodyRotationAnlge = 0;
let g_bodySize = 100;
let g_bodyTranslateX = 0.0;
let g_bodyTranslateY = 0.0;
let g_bodyTranslateZ = 0.0;
let g_headRotationAngle = 0.0;
let g_earRotationAngle = 0.0;
let g_earbrowRotationAnlge = 0.0;
let g_eyeMovement = 0.0;
let g_leftArmRotationAngle = 0.0;
let g_leftMidArmSpin = 0.0;
let g_leftMidArmBend = 0.0;
let g_leftLowHand = 0.0;
let g_rightArmRotationAngle = 0.0;
let g_rightMidArmSpin = 0.0;
let g_rightMidArmBend = 0.0;
let g_rightLowHand = 0.0;
let g_leftLegAngle = 0.0;
let g_leftLowerLegAngle = 0.0;
let g_rightLegAngle = 0.0;
let g_rightLowerLegAngle = 0.0;
let g_eyeSize = 4.0;
let g_eyeSize2 = 4.0;
let g_headRotationDownWard = 0.0;
let g_leftMidArmSpread = 0.0;
let g_rightMidArmSpread = 0.0;
let g_found = false;
let g_headRotateToggle=0;
let g_animation=1; //0 means off, 1 means on

let g_headCounter = 0;
const G_HEAD_ROTATION_SPEED = 0.8

let g_camera;
let g_cameraAngle = 230;
// 0=eating Ice Cream
let g_activity = 1;

function resetAllVariables() {
  g_selectedAngle= 30;
  g_selectedAngle2 = 0;
  g_bodyRotationAnlge = 0;
  g_bodySize = 100;
  g_bodyTranslateX = 0.0;
  g_bodyTranslateY = 0.0;
  g_bodyTranslateZ = 0.0;
  g_headRotationAngle = 0.0;
  g_earRotationAngle = 0.0;
  g_earbrowRotationAnlge = 0.0;
  g_eyeMovement = 0.0;
  g_leftArmRotationAngle = 0.0;
  g_leftMidArmSpin = 0.0;
  g_leftMidArmBend = 0.0;
  g_leftLowHand = 0.0;
  g_rightArmRotationAngle = 0.0;
  g_rightMidArmSpin = 0.0;
  g_rightMidArmBend = 0.0;
  g_rightLowHand = 0.0;
  g_leftLegAngle = 0.0;
  g_leftLowerLegAngle = 0.0;
  g_rightLegAngle = 0.0;
  g_rightLowerLegAngle = 0.0;
  g_headRotateToggle=0;
  g_eyeSize = 4.0;
  g_eyeSize2 = 4.0;
  g_headRotationDownWard = 0.0;
  g_leftMidArmSpread = 0.0;
  g_rightMidArmSpread = 0.0;
}


function setUpWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  // gl = getWebGLContext(canvas);
  gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
}

function connectVariableToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
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
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if (!u_whichTexture) {
    console.log('Failed to get the storage location of u_whichTexture');
    return;
  }

  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler1');
    return false;
  }

  u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
  if (!u_Sampler3) {
    console.log('Failed to get the storage location of u_Sampler3');
    return false;
  }

  u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
  if (!u_Sampler4) {
    console.log('Failed to get the storage location of u_Sampler4');
    return false;
  }

  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if (!u_Sampler2) {
    console.log('Failed to get the storage location of u_Sampler2');
    return false;
  }
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}


function AddActionsToHTMLUI() {

  // change angle
  document.getElementById('angleSlide').addEventListener('input', function() {g_selectedAngle = this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('angleSlide2').addEventListener('input', function() {g_selectedAngle2 = this.value; renderAllShapesOfKittyBangbang()})
  // slides for whole body
  document.getElementById('bodyRotationAngleSlide').addEventListener('input', function() {g_bodyRotationAnlge = this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('bodySizeSlide').addEventListener('input', function() { g_bodySize = this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('bodyTranslateX').addEventListener('input', function() { g_bodyTranslateX = this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('bodyTranslateY').addEventListener('input', function() { g_bodyTranslateY = this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('bodyTranslateZ').addEventListener('input', function() { g_bodyTranslateZ = this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('headRotationSlide').addEventListener('input', function() { g_headRotationAngle =this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('headRotationSlide2').addEventListener('input', function() { g_headRotationDownWard =this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('rightearRotationSlide').addEventListener('input', function() { g_earRotationAngle=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('earbrowRotationSlide').addEventListener('input', function() { g_earbrowRotationAnlge=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('leftshoulderRotationSlide').addEventListener('input', function() { g_leftArmRotationAngle=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('rightshoulderRotationSlide').addEventListener('input', function() { g_rightArmRotationAngle=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('leftMidArmUprightSlide').addEventListener('input', function() { g_leftMidArmSpin=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('rightMidArmUprightSlide').addEventListener('input', function() { g_rightMidArmSpin=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('leftLowHandSlide').addEventListener('input', function() { g_leftLowHand=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('rightLowHandSlide').addEventListener('input', function() { g_rightLowHand=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('leftMidArmBendSlide').addEventListener('input', function() { g_leftMidArmBend=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('rightMidArmBendSlide').addEventListener('input', function() { g_rightMidArmBend=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('eyeMovementSlide').addEventListener('input', function() { g_eyeMovement=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('leftLegRotationSlide').addEventListener('input', function() { g_leftLegAngle=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('leftLowerLegRotationSlide').addEventListener('input', function() { g_leftLowerLegAngle=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('rightLegRotationSlide').addEventListener('input', function() { g_rightLegAngle=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('rightLowerLegRotationSlide').addEventListener('input', function() { g_rightLowerLegAngle=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('eyeSizeSlide').addEventListener('input', function() { g_eyeSize=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('eyeSizeSlide2').addEventListener('input', function() { g_eyeSize2=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('leftMidArmSpreadSlide').addEventListener('input', function() { g_leftMidArmSpread=this.value; renderAllShapesOfKittyBangbang()})
  document.getElementById('rightMidArmSpreadSlide').addEventListener('input', function() { g_rightMidArmSpread=this.value; renderAllShapesOfKittyBangbang()})
  /* document.getElementById('clear').addEventListener('click', function() {clearCanvas()}) */
  // animation on or off
  document.getElementById('animation').addEventListener('click', function() {
    g_animation = g_animation ? 0 : 1;
    let element = document.getElementById('animation');
    if (g_animation === 1) {
      element.innerHTML = 'Off'
    } else if (g_animation === 0){
      element.innerHTML = 'On'
    }
  })
  document.getElementById('reload').addEventListener('click', function() {location.reload()})
  document.getElementById('still').addEventListener('click', function() {
    resetAllVariables();
    if (g_animation === 1) {document.getElementById('animation').click()};
  })
  document.getElementById('eating').addEventListener('click', function() {g_activity = 0; resetAllVariables()})
  document.getElementById('standing').addEventListener('click', function() {g_activity = 1; resetAllVariables()})
  document.getElementById('sleeping').addEventListener('click', function() {g_activity = 2; resetAllVariables()})

  document.getElementById('running').addEventListener('click', function() {g_camera.speed = 1; document.getElementById('movingMode').innerHTML = 'running'})
  document.getElementById('walking').addEventListener('click', function() {g_camera.speed = 0.3; document.getElementById('movingMode').innerHTML = 'walking'})
}


function main() {
  setUpWebGL();
  connectVariableToGLSL();
  g_camera = new Camera();
  AddActionsToHTMLUI();

  document.onkeydown = keydown;
  initTextures();


  gl.clearColor(0.0, 0, 0, 1.0);
  requestAnimationFrame(tick);
  renderAllShapes();
}

function keydown(ev)
{
  if (ev.keyCode == 68) { // D
    console.log('D')
    g_camera.goLeft()

  }
  if (ev.keyCode == 65) { // A
    console.log('A')
    g_camera.goRight()
  }
  if (ev.keyCode == 87) { // W
    console.log('W')
    g_camera.goForward()
  }
  if (ev.keyCode == 83) { // S
    console.log('S')
    g_camera.goBackward()
  }
  if (ev.keyCode == 69) { //E
    console.log('E')
    g_camera.turnRight()
  }
  if (ev.keyCode == 81) { //Q
    console.log('Q')
    g_camera.turnLeft()
  }
}

var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now()/1000.0 - g_startTime;

function tick() {
  g_seconds = performance.now()/1000.0 - g_startTime;
  /* console.log(g_seconds); */
  animateOrStillAngles();
  renderAllShapes();
  requestAnimationFrame(tick);
}

function animateOrStillAngles() {

  if (g_animation === 1) {
    if (g_activity === 0) {
      if (g_headRotateToggle===0) {
        if (Math.random() <= 0.002) {
          g_headRotateToggle = 1
        }
      } else {
        if (g_headCounter%2 === 0){
          g_headRotationAngle += G_HEAD_ROTATION_SPEED;
        } else {
          g_headRotationAngle -= G_HEAD_ROTATION_SPEED;
        }
        if (Math.abs(g_headRotationAngle) >= 45) {
          g_headCounter += 1;
        }
        if (g_headRotationAngle >= 0 && g_headCounter === 2) {
          g_headRotateToggle = 0;
          g_headCounter = 0;
        }
      }
      // moving quickly
      g_earbrowRotationAnlge = Math.sin(g_seconds/2.5)*10;
      g_earRotationAngle = 5+Math.sin(2*g_seconds)*5;
      g_eyeMovement = 5*Math.sin(g_seconds);
      g_leftArmRotationAngle = 51 + Math.sin(g_seconds/2)*5
      g_leftLowHand = 12+Math.sin(g_seconds/2)*5
      g_leftMidArmBend = 46+Math.sin(g_seconds)*5
      g_leftMidArmSpin = -56
    } else if (g_activity === 1) {
      g_eyeSize2 = 1.5 + 0.5*Math.sin(g_seconds);
      g_earRotationAngle = 5+Math.sin(2*g_seconds)*5;
      g_leftArmRotationAngle = 180;
      g_leftMidArmSpread = 10*Math.sin(3*g_seconds)
    } else if (g_activity === 2) {
      g_leftLegAngle = 79;
      g_rightLegAngle = 90;

      g_leftMidArmSpread = -3 + 3*Math.sin(g_seconds)
      g_rightMidArmSpread = 3 - 2*Math.sin(g_seconds)
      g_rightLowerLegAngle = -20 + 10*Math.sin(g_seconds/2);

      g_headRotationDownWard = -9+3*Math.sin(g_seconds);
      g_eyeSize = 1.8+0.5*Math.sin(g_seconds);
      g_eyeSize2 = 1.8+0.5*Math.sin(g_seconds);
    }
  }
}


function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);
  return [x, y];
}

function clearCanvas() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  g_shapeList = [];
}

// Render For Shapes
function renderAllShapes() {
  var startTime = performance.now();
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT)

  var projectionMatrix = new Matrix4();
  projectionMatrix.setPerspective(60, canvas.width/canvas.height, .1, 100)
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projectionMatrix.elements);

  var viewMatrix = new Matrix4();
  //eye(eye's position), at(look at position), up(screen is rotating))
  viewMatrix.setLookAt(
    g_camera.g_eye.elements[0],g_camera.g_eye.elements[1],g_camera.g_eye.elements[2],
    g_camera.g_at.elements[0],g_camera.g_at.elements[1],g_camera.g_at.elements[2],
    g_camera.g_up.elements[0],g_camera.g_up.elements[1],g_camera.g_up.elements[2]);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

  var globalRotateMatrix = new Matrix4().rotate(-g_selectedAngle, 0, 1, 0);
  globalRotateMatrix.rotate(-g_selectedAngle2, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotateMatrix.elements);


  if (Math.abs(g_camera.g_at.elements[0]-10.5) <= 1 && Math.abs(g_camera.g_at.elements[2]-34.2) <= 1 && g_found === false) {
    alert('YOU FOUND KITTY BANGBANG! Play and interact with him now!!!')
    g_found = true;
  }
  // Rendering Objects----------
  var ground = new Cube()
  ground.color = [1, 0, 0, 1]
  ground.textureNum = 1;
  ground.matrix.translate(5, -20.85, 0)
  ground.matrix.scale(55, 40, 53);
  ground.matrix.translate(-.5, -.5, -.5)
  ground.render()
  var sky = new Cube()
  sky.color = [0, 0, 1, 1]
  sky.textureNum = 0;
  sky.matrix.translate(0, 10,0)
  sky.matrix.scale(80, 80, 80)
  sky.matrix.translate(-.5, -.5, -.5)
  sky.render()

  drawMap();
  var duration = performance.now() - startTime;
  sendTextTo('ms: ' + Math.floor(duration) + 'fps: ' + Math.floor(1000/duration), 'perfData');
}

function renderAllShapesOfKittyBangbang() {

  // core of the body; all body part are relative to this core body.
  var body = new Cube();
  body.brightSide = 0.98;
  body.textureNum = -2;
  body.matrix.translate(g_bodyTranslateX/100.0, g_bodyTranslateY/100.0+0.1, g_bodyTranslateZ/100.0);
  body.matrix.scale(g_bodySize/100.0, g_bodySize/100.0, g_bodySize/100.0);
  body.matrix.rotate(-g_bodyRotationAnlge, 0, 1, 0);
  body.matrix.scale(0.65, 0.65, 0.4)
  body.matrix.translate(-0.5, -0.5, -.5);
  body.render();

  // Draw head
  var head = new Cube();
  head.color = [0,0,0,1];
  head.matrix.translate(0,-0.12,0);
  head.matrix.rotate(-5,1,0,0);
  head.matrix.rotate(-g_headRotationAngle,0,0,1);
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
  // tail1.matrix.rotate(-g_tailAngle,0,0,1);
  var tail1CoordinatesMat = new Matrix4(tail1);
  tail1.matrix.scale(0.1,0.1,0.1);
  tail1.render();
  var tail2 = new Cube();
  tail2.color = [1,1,1,1];
  tail2.matrix = new Matrix4(tail1CoordinatesMat);
  tail2.matrix.translate(-0.005,-0.05,0.55);
  // tail2.matrix.rotate(-g_tailAngle,0,0,1);
  tail2.matrix.scale(0.1,0.1,0.1);
  tail2.render();
  var tail3 = new Cube();
  tail3.color = [0,0,0,1];
  tail3.matrix = new Matrix4(tail1CoordinatesMat);
  tail3.matrix.translate(-0.005,0.05,0.55);
  // tail3.matrix.rotate(-g_tailAngle,0,0,1);
  tail3.matrix.scale(0.1,0.1,0.1);
  tail3.render();
  var tail4 = new Cube();
  tail4.color = [1,1,1,1];
  tail4.matrix = new Matrix4(tail1CoordinatesMat);
  tail4.matrix.translate(-0.005,0.15,0.55);
  // tail4.matrix.rotate(-g_tailAngle,0,0,1);
  tail4.matrix.scale(0.1,0.1,0.1);
  tail4.render();

  // Draw leg (LeftFront => LeftBack  => RightFront => RightBack)
  var leftFrontLeg = new Cube();
  leftFrontLeg.color = [0,0,0,1];
  leftFrontLeg.matrix = new Matrix4(bodyCoordinatesMat);
  leftFrontLeg.matrix.translate(0.05,-0.05,0.05);
  leftFrontLeg.matrix.rotate(-g_leftLegAngle,1,0,0);
  var leftFrontLegCoordinatesMat = new Matrix4(leftFrontLeg.matrix);
  leftFrontLeg.matrix.scale(0.1,0.1,0.1);
  leftFrontLeg.render();
  var leftFrontFeet = new Cube();
  leftFrontFeet.color = [1,1,1,1];
  leftFrontFeet.matrix = new Matrix4(leftFrontLegCoordinatesMat);
  leftFrontFeet.matrix.translate(0,-0.05,0);
  leftFrontFeet.matrix.rotate(-g_leftLowerLegAngle,1,0,0);
  leftFrontFeet.matrix.scale(0.1,0.05,0.1);
  leftFrontFeet.render();

  var leftBackLeg = new Cube();
  leftBackLeg.color = [1,1,1,1];
  leftBackLeg.matrix = new Matrix4(body3CoordinatesMat);
  leftBackLeg.matrix.translate(0.05,-0.05,0.05);
  leftBackLeg.matrix.rotate(-g_leftLegAngle,1,0,0);
  var leftBackLegCoordinatesMat = new Matrix4(leftBackLeg.matrix);
  leftBackLeg.matrix.scale(0.1,0.1,0.1);
  leftBackLeg.render();
  var leftBackFeet = new Cube();
  leftBackFeet.color = [0,0,0,1];
  leftBackFeet.matrix = new Matrix4(leftBackLegCoordinatesMat);
  leftBackFeet.matrix.translate(0,-0.05,0);
  leftBackFeet.matrix.rotate(-g_leftLowerLegAngle,1,0,0);
  leftBackFeet.matrix.scale(0.1,0.05,0.1);
  leftBackFeet.render();

  var rightFrontLeg = new Cube();
  rightFrontLeg.color = [1,1,1,1];
  rightFrontLeg.matrix = new Matrix4(bodyCoordinatesMat);
  rightFrontLeg.matrix.translate(0.25,-0.05,0.05);
  rightFrontLeg.matrix.rotate(-g_leftLegAngle,1,0,0);
  var rightFrontLegCoordinatesMat = new Matrix4(rightFrontLeg.matrix);
  rightFrontLeg.matrix.scale(0.1,0.1,0.1);
  rightFrontLeg.render();
  var rightFrontFeet = new Cube();
  rightFrontFeet.color = [0,0,0,1];
  rightFrontFeet.matrix = new Matrix4(rightFrontLegCoordinatesMat);
  rightFrontFeet.matrix.translate(0,-0.05,0);
  rightFrontFeet.matrix.rotate(-g_rightLowerLegAngle,1,0,0);
  rightFrontFeet.matrix.scale(0.1,0.05,0.1);
  rightFrontFeet.render();

  var rightBackLeg = new Cube();
  rightBackLeg.color = [0,0,0,1];
  rightBackLeg.matrix = new Matrix4(body3CoordinatesMat);
  rightBackLeg.matrix.translate(0.25,-0.05,0.05);
  rightBackLeg.matrix.rotate(-g_leftLegAngle,1,0,0);
  var rightBackLegCoordinatesMat = new Matrix4(rightBackLeg.matrix);
  rightBackLeg.matrix.scale(0.1,0.1,0.1);
  rightBackLeg.render();
  var rightBackFeet = new Cube();
  rightBackFeet.color = [1,1,1,1];
  rightBackFeet.matrix = new Matrix4(rightBackLegCoordinatesMat);
  rightBackFeet.matrix.translate(0,-0.05,0);
  rightBackFeet.matrix.rotate(-g_rightLowerLegAngle,1,0,0);
  rightBackFeet.matrix.scale(0.1,0.05,0.1);
  rightBackFeet.render();
}

function sendTextTo(text, htmlID) {
  var dest = document.getElementById(htmlID);
  if (!dest) {
    console.log(`ERROR: ID ${htmlID} dose not exist in HTML file`);
    return -1;
  }
  dest.innerHTML = text;
}

function drawTriangles(vertices) {
  let n = 3;
  // create vertices buffer
  let vertexBuffer = gl.createBuffer();
  if (!vertexBuffer){
    console.log('ERROR, the buffer is not created');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  /* const a = ;
  console.log(a) */
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
  /* gl.bindBuffer(gl.ARRAY_BUFFER, null) */

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function drawTriangles3D(vertices) {

  let n = vertices.length/3;
  // create vertices buffer
  let vertexBuffer = gl.createBuffer();
  if (!vertexBuffer){
    console.log('ERROR, the buffer is not created');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  /* const a = ;
  console.log(a) */
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
  /* gl.bindBuffer(gl.ARRAY_BUFFER, null) */

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

var g_vertexBuffer = null
function initVertexBuffer() {
  // create vertices buffer
  let vertexBuffer = gl.createBuffer();
  if (!vertexBuffer){
    console.log('ERROR, the buffer is not created');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  /* const a = ;
  console.log(a) */
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
}

function drawTriangle3DUV(vertices, uv) {

  let n = vertices.length/3;
  if (g_vertexBuffer == null) {
    initVertexBuffer();
  }

  /* gl.bindBuffer(gl.ARRAY_BUFFER, null) */
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

  var uvBuffer = gl.createBuffer();
  if (!uvBuffer) {
    console.log('Failed to create the buffer object')
    return -1;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, uv, gl.DYNAMIC_DRAW);

  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(a_UV);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}
