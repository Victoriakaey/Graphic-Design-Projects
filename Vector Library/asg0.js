// "use strict";
// DrawTriangle.js (c) 2012 matsuda
function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('cnv1');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue (set 0, turn blue into black)
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color
}

function drawVector(v, color){
  var cx = canvas.width / 2;
  var cy = canvas.height / 2;
  // console.log(color, v);
  var c = document.getElementById("cnv1");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx+v.elements[0]*20, cy-v.elements[1]*20);
  ctx.strokeStyle = color;
  ctx.stroke();
}

// Math.PI for π; Math.acos() for cos^(-1)(x) = alpha
// Degree = Radian measure × (180°/π).
// Formula for angle between:
// dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha)
// -> x = cos(alpha) = dot(v1, v2) / (||v1|| * ||v2||)
// -> alpha = cos^(-1)(x)
function angleBetween(v1, v2){
  var x = Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude()); // for storing dot(v1, v2) / (||v1|| * ||v2||)
  var degree = Math.acos(x) * (180 / Math.PI);
  return degree;
}

// area = 1/2 * ||v1 x v2|| = 0.5 * ||v1 x v2||
function areaTriangle(v1, v2){
  // let v3 = Vector3.cross(v1, v2);
  // console.log(v3, v3.magnitude());
  // var area = 0.5 * (v3.magnitude());
  // return area;
  var v3 = Vector3.cross(v1, v2);
  var area = 0.5 * v3.magnitude();
  return area;
}

function handleDrawEvent(){
  // clear the canvas
  // Retrieve <canvas> element
  var canvas = document.getElementById('cnv1');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }
  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');
  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue (set 0, turn blue into black)
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color
  let v1x = document.getElementById("x").value;
  let v1y = document.getElementById("y").value;
  let v2x = document.getElementById("vx").value;
  let v2y = document.getElementById("vy").value;
  let v1 = new Vector3([v1x, v1y, 0]);
  drawVector(v1, 'red');
  let v2 = new Vector3([v2x, v2y, 0]);
  drawVector(v2, 'blue');
}

function handleDrawOperationEvent(){
  // clear the canvas
  // Retrieve <canvas> element
  var canvas = document.getElementById('cnv1');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }
  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');
  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue (set 0, turn blue into black)
  ctx.fillRect(0, 0, canvas.width, canvas.height);        // Fill a rectangle with the color
  let v1x = document.getElementById("x").value;
  let v1y = document.getElementById("y").value;
  let v2x = document.getElementById("vx").value;
  let v2y = document.getElementById("vy").value;
  let option = document.getElementById("operation-select").value
  let s = document.getElementById("scalar").value;
  let v3 = new Vector3();
  let v1 = new Vector3([v1x, v1y, 0]);
  drawVector(v1, 'red');
  let v2 = new Vector3([v2x, v2y, 0]);
  drawVector(v2, 'blue');
  if (option == "add"){
   v3 = v1.add(v2); // v3 = v1 + v2
   drawVector(v3, 'green');
  }
  if (option == "subtract"){
   v3 = v1.sub(v2); // v3 = v1 - v2
   drawVector(v3, 'green');
  }
  if (option == "multiply"){
   v3 = v1.mul(s); // v3 = v1 * s
   v4 = v2.mul(s); // v4 = v2 * s
   drawVector(v3, 'green');
   drawVector(v4, 'green');
  }
  if (option == "divide"){
    v3 = v1.div(s); // v3 = v1 / s
    v4 = v2.div(s); // v4 = v2 / s
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  }
  if (option == "magnitude"){
    // print the maginitue result of this operation to the console
    console.log("Magnitude v1:", v1.magnitude());
    console.log("Magnitude v2:", v2.magnitude());
  }
  // draw normalized v1, v2 in green
  if (option == "normalize"){
    v3 = v1.normalize(); // v3 = v1 / s
    v4 = v2.normalize(); // v4 = v2 / s
    drawVector(v3, 'green');
    drawVector(v4, 'green');
  }
  // output angle between v1, v2
  if (option == "angle-between"){
    var angle = angleBetween(v1, v2);
    console.log("Angle: ", angle);
  }
  if (option == "area"){
    var area = areaTriangle(v1, v2);
    console.log("Area of the triangle: ", area);
  }
}
