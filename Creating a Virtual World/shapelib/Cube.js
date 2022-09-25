class Cube {
    constructor() {
        this.type = 'cube';
        /* this.position = [0.0, 0.0, 0.0]; */
        this.color = [1, 1, 1, 1];
        this.brightSide = 1;
        this.darkSide =1 ;
       /*  this.size = 5.0;
        this.segments = 10; */
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.brightUV = new Float32Array([
            0,0,  1,1,  1,0,
            0,0,  0,1,  1,1,
            0,0,  1,1, 1,0,
            0, 0, 0,1,  1, 1,
            0,0, 0,1, 1,1,
            0,0, 1, 1, 1,0,
            0,0, 0,1, 1,1,
            0,0, 1, 1, 1,0
        ]);
        this.brightVertices = new Float32Array([
            0,0,0,  1,1,0,  1,0,0,
            0.0, 0.0, 0.0,  0.0, 1.0, 0.0,   1.0, 1.0, 0.0,
            0.0, 0.0, 1.0,  1.0, 1.0, 1.0,   1.0, 0.0, 1.0,
            0.0, 0.0, 1.0,  0.0, 1.0, 1.0,   1.0, 1.0, 1.0,
            0.0, 1.0, 0.0,  0.0, 1.0, 1.0,   1.0, 1.0, 1.0,
            0.0, 1.0, 0.0,  1.0, 1.0, 1.0,   1.0, 1.0, 0.0,
            0.0, 0.0, 0.0,  0.0, 0.0, 1.0,   1.0, 0.0, 1.0,
            0.0, 0.0, 0.0,  1.0, 0.0, 1.0,   1.0, 0.0, 0.0
        ]);
        this.darkUV = new Float32Array([
            1, 0, 1, 1, 0, 1,
            1, 0, 0, 1, 0, 0,
            1, 0, 1, 1, 0, 1,
            1, 0, 0,1, 0, 0
        ]);
        this.darkVertices = new Float32Array([
            0.0, 0.0, 0.0,  0.0, 1.0, 0.0,   0.0, 1.0, 1.0,
            0.0, 0.0, 0.0,  0.0, 1.0, 1.0,   0.0, 0.0, 1.0,
            1.0, 0.0, 0.0,  1.0, 1.0, 0.0,   1.0, 1.0, 1.0,
            1.0, 0.0, 0.0,  1.0, 1.0, 1.0,   1.0, 0.0, 1.0
        ]);
    } 

    render() {
        var rgba = this.color;
        gl.uniform1i(u_whichTexture, this.textureNum)
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        gl.uniform4f(u_FragColor, rgba[0]*this.brightSide, rgba[1]*this.brightSide, rgba[2]*this.brightSide, rgba[3]);
        drawTriangle3DUV(this.brightVertices, this.brightUV)

        //Dark Vertices
        let darkside = this.darkSide;
        gl.uniform4f(u_FragColor, rgba[0]*darkside, rgba[1]*darkside, rgba[2]*darkside, rgba[3]);
        drawTriangle3DUV(this.darkVertices, this.darkUV)
    }

    //Render Fast
    renderFF() {
    
        var rgba = this.color;

        gl.uniform1i(u_whichTexture, this.textureNum)
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
        
                //Bright Vertices
        var allUV = []
        var allBrightVertices = []

        //All UV
        //front
        allUV = allUV.concat([0,0,  1,1,  1,0])
        allUV = allUV.concat([0,0,  0,1,  1,1])
        //back
        allUV = allUV.concat([0, 0, 1, 1, 1, 0])
        allUV = allUV.concat([0, 0, 0,1,  1, 1])
        //top
        allUV = allUV.concat([0,0, 0,1, 1,1])
        allUV = allUV.concat([0,0, 1, 1, 1,0])
        //bot
        allUV = allUV.concat([0,0, 0,1, 1,1])
        allUV = allUV.concat([0,0, 1, 1, 1,0])

        gl.uniform4f(u_FragColor, rgba[0]*this.brightSide, rgba[1]*this.brightSide, rgba[2]*this.brightSide, rgba[3]);
        // front
        allBrightVertices = allBrightVertices.concat([0,0,0,  1,1,0,  1,0,0])
        allBrightVertices = allBrightVertices.concat([0.0, 0.0, 0.0,  0.0, 1.0, 0.0,   1.0, 1.0, 0.0])
        // back
        allBrightVertices = allBrightVertices.concat([0.0, 0.0, 1.0,  1.0, 1.0, 1.0,   1.0, 0.0, 1.0])
        allBrightVertices = allBrightVertices.concat([0.0, 0.0, 1.0,  0.0, 1.0, 1.0,   1.0, 1.0, 1.0])
        // top
        allBrightVertices = allBrightVertices.concat([0.0, 1.0, 0.0,  0.0, 1.0, 1.0,   1.0, 1.0, 1.0])
        allBrightVertices = allBrightVertices.concat([0.0, 1.0, 0.0,  1.0, 1.0, 1.0,   1.0, 1.0, 0.0,])
        // bot
        allBrightVertices = allBrightVertices.concat([0.0, 0.0, 0.0,  0.0, 0.0, 1.0,   1.0, 0.0, 1.0])
        allBrightVertices = allBrightVertices.concat([0.0, 0.0, 0.0,  1.0, 0.0, 1.0,   1.0, 0.0, 0.0,])
        drawTriangle3DUV(allBrightVertices, allUV)

                //Dark Vertices
        let darkside = this.darkSide;
        gl.uniform4f(u_FragColor, rgba[0]*darkside, rgba[1]*darkside, rgba[2]*darkside, rgba[3]);
        var allDarkVertices = []
        var allUV = []
        // left
        allUV = allUV.concat([1, 0, 1, 1, 0, 1])
        allUV = allUV.concat([1, 0, 0, 1, 0, 0])
        //right
        allUV = allUV.concat([1, 0, 1, 1, 0, 1])
        allUV = allUV.concat([1, 0, 0,1, 0, 0])
        // left
        allDarkVertices = allDarkVertices.concat([0.0, 0.0, 0.0,  0.0, 1.0, 0.0,   0.0, 1.0, 1.0])
        allDarkVertices = allDarkVertices.concat([0.0, 0.0, 0.0,  0.0, 1.0, 1.0,   0.0, 0.0, 1.0,])
        //right
        allDarkVertices = allDarkVertices.concat([1.0, 0.0, 0.0,  1.0, 1.0, 0.0,   1.0, 1.0, 1.0])
        allDarkVertices = allDarkVertices.concat([1.0, 0.0, 0.0,  1.0, 1.0, 1.0,   1.0, 0.0, 1.0,])
        drawTriangle3DUV(allDarkVertices, allUV)
    }

    renderS() {
/*         var xy = this.position; */
        var rgba = this.color;
/*         var size = this.size;
        var delta = size/200.0; */


        gl.uniform1i(u_whichTexture, this.textureNum)
        
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // front
        gl.uniform4f(u_FragColor, rgba[0]*this.brightSide, rgba[1]*this.brightSide, rgba[2]*this.brightSide, rgba[3]);
        drawTriangle3DUV([0,0,0,  1,1,0,  1,0,0], [0,0,  1,1,  1,0]);
        drawTriangle3DUV([0.0, 0.0, 0.0,  0.0, 1.0, 0.0,   1.0, 1.0, 0.0], [0,0,  0,1,  1,1]);
        
        //back
        drawTriangle3DUV([0.0, 0.0, 1.0,  1.0, 1.0, 1.0,   1.0, 0.0, 1.0], [0, 0, 1, 1, 1, 0]);
        drawTriangle3DUV([0.0, 0.0, 1.0,  0.0, 1.0, 1.0,   1.0, 1.0, 1.0], [0, 0, 0,1,  1, 1]);

        // top
        gl.uniform4f(u_FragColor, rgba[0]*this.brightSide, rgba[1]*this.brightSide, rgba[2]*this.brightSide, rgba[3]);
        drawTriangle3DUV([0.0, 1.0, 0.0,  0.0, 1.0, 1.0,   1.0, 1.0, 1.0], [0,0, 0,1, 1,1]);
        drawTriangle3DUV([0.0, 1.0, 0.0,  1.0, 1.0, 1.0,   1.0, 1.0, 0.0,], [0,0, 1, 1, 1,0]);
        // bot
        drawTriangle3DUV([0.0, 0.0, 0.0,  0.0, 0.0, 1.0,   1.0, 0.0, 1.0], [0,0, 0,1, 1,1]);
        drawTriangle3DUV([0.0, 0.0, 0.0,  1.0, 0.0, 1.0,   1.0, 0.0, 0.0,], [0,0, 1, 1, 1,0]);

        let darkside = this.darkSide;
        gl.uniform4f(u_FragColor, rgba[0]*darkside, rgba[1]*darkside, rgba[2]*darkside, rgba[3]);
        // left
        drawTriangle3DUV([0.0, 0.0, 0.0,  0.0, 1.0, 0.0,   0.0, 1.0, 1.0], [1, 0, 1, 1, 0, 1]);
        drawTriangle3DUV([0.0, 0.0, 0.0,  0.0, 1.0, 1.0,   0.0, 0.0, 1.0,], [1, 0, 0, 1, 0, 0]);
        // right
        drawTriangle3DUV([1.0, 0.0, 0.0,  1.0, 1.0, 0.0,   1.0, 1.0, 1.0], [1, 0, 1, 1, 0, 1]);
        drawTriangle3DUV([1.0, 0.0, 0.0,  1.0, 1.0, 1.0,   1.0, 0.0, 1.0,], [1, 0, 0,1, 0, 0]);


    }
}