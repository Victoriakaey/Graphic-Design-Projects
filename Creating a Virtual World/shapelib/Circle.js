class Circle {
    constructor() {
        this.type = 'circle';
        this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        this.size = 5.0;
        this.segments = 10;
    } 

    render() {
        var xy = this.position;
        var rgba = this.color;
        var size = this.size;
        var delta = size/200.0;

        // send the color of the circle
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // size
        gl.uniform1f(u_Size, size);

        let angleStep = 360/this.segments;
        for (let angle = 0; angle < 360; angle += angleStep) {
            // let cp = [xy[0], xy[1]]
            let angle1 = angle;
            let angle2 = angle + angleStep;
            let point1 = [xy[0] + Math.cos(angle1*Math.PI/180)*delta, xy[1]+Math.sin(angle1*Math.PI/180)*delta];
            let point2 = [xy[0] + Math.cos(angle2*Math.PI/180)*delta, xy[1]+Math.sin(angle2*Math.PI/180)*delta];
            drawTriangles([xy[0], xy[1], point1[0], point1[1], point2[0], point2[1]]);
        }
    }
}