function initTextures() {
    var sky = new Image();
    var block = new Image();
    var grass1 = new Image();
    var grass = new Image();
    var trap = new Image();

    if (!sky) {
      console.log('Failed to create the sky object');
      return false;
    }

    if (!block) {
        console.log('Failed to create the block object');
        return false;
    }

    if (!grass1) {
        console.log('Failed to create the grass1 object');
        return false;
    }

    if (!grass) {
        console.log('Failed to create the grass object');
        return false;
    }

    if (!trap) {
        console.log('Failed to create the trap object');
        return false
    }

    sky.onload = function() {sendImagetoTEXTURE0(sky);};
    block.onload = function() {sendImagetoTEXTURE1(block);};
    grass1.onload = function() {sendImagetoTEXTURE2(grass1)}
    grass.onload = function() {sendImagetoTEXTURE3(grass)}
    trap.onload = function() {sendImagetoTEXTURE4(trap)}

    block.src = 'textureResources/block.jpg';
    sky.src = 'textureResources/sky.jpg';
    grass1.src = 'textureResources/grass1.jpg';
    grass.src = 'textureResources/grass.jpg';
    trap.src = 'textureResources/trap.jpg';

    console.log(sky)
    console.log(block)
    console.log(grass1)
    console.log(grass)
    console.log(trap)

    return true
  }

function sendImagetoTEXTURE0(image) { // artic sea
let texture = gl.createTexture()
if (!texture) {
    console.log('Failed to create the texture object')
    return false;
}

gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texParameteri(gl.TEXTURE_2D,  gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
gl.uniform1i(u_Sampler0, 0)

console.log('finished loadTexture0');
}

function sendImagetoTEXTURE1(image) { // snowBlock
    let texture = gl.createTexture()
    if (!texture) {
        console.log('Failed to create the texture object')
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D,  gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler1, 1)

    console.log('finished loadTexture0');
}

function sendImagetoTEXTURE2(image) { // snowBlock
    let texture = gl.createTexture()
    if (!texture) {
        console.log('Failed to create the texture object')
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.activeTexture(gl.TEXTURE2); //here
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D,  gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler2, 2) //here

    console.log('finished loadTexture0');
}

function sendImagetoTEXTURE3(image) { // snowBlock
    let texture = gl.createTexture()
    if (!texture) {
        console.log('Failed to create the texture object')
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.activeTexture(gl.TEXTURE3); //here
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D,  gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler3, 3) //here

    console.log('finished loadTexture0');
}


function sendImagetoTEXTURE4(image) { // snowBlock
    let texture = gl.createTexture()
    if (!texture) {
        console.log('Failed to create the texture object')
        return false;
    }

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.activeTexture(gl.TEXTURE4); //here
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D,  gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform1i(u_Sampler4, 4) //here

    console.log('finished loadTexture0');
}
