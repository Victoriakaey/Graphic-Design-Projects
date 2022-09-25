class Camera{
    constructor()
    {
        this.g_eye = new Vector3([-4, 0, -29])
        this.g_at = new Vector3([-4, 0, -28])
        this.g_up = new Vector3([0, 1, 0])
        this.g_forwardV = [0]
        this.speed = 0.3
        this.cameraRotateAngle = 0.125
    }

    goForward(){
        let d = new Vector3;
        d.set(this.g_at)
        d.sub(this.g_eye);
        d.normalize()
        d.mul(this.speed)
        this.g_eye.add(d);
        this.g_at.add(d);
    }

    goBackward(){
        let d = new Vector3;
        d.set(this.g_at)
        d.sub(this.g_eye)
        d.normalize()
        d.mul(this.speed)
        this.g_eye.sub(d);
        this.g_at.sub(d);
        console.log(this.g_eye.elements, this.g_at.elements)
    }

    goLeft(){
        let d = new Vector3;
        d.set(this.g_at)
        d.sub(this.g_eye)
        d.elements[0] *= -1
        d.elements[1] *= -1
        d.elements[2] *= -1
        d = Vector3.cross(d, this.g_up);
        d.normalize();
        d.mul(this.speed)
        this.g_eye.sub(d);
        this.g_at.sub(d);
    }

    goRight(){
        let d = new Vector3;
        d.set(this.g_at)
        d.sub(this.g_eye)
        d.elements[0] *= -1
        d.elements[1] *= -1
        d.elements[2] *= -1
        d = Vector3.cross(d, this.g_up);
        d.normalize();
        d.mul(this.speed)
        this.g_eye.add(d);
        this.g_at.add(d);
    }

    turnLeft(){
        let d = new Vector3();
        d.set(this.g_at)
        d.sub(this.g_eye)
        let theta= Math.atan2(d.elements[2], d.elements[0])
        d.elements[0] = Math.cos(theta-this.cameraRotateAngle)
        d.elements[2] = Math.sin(theta-this.cameraRotateAngle)
        d.add(this.g_eye)
        this.g_at = d;
    }

    turnRight(){
        let d = new Vector3()
        d.set(this.g_at)
        d.sub(this.g_eye)
        let theta = Math.atan2(d.elements[2], d.elements[0]);
        d.elements[0] = Math.cos(theta+this.cameraRotateAngle)
        d.elements[2] = Math.sin(theta+this.cameraRotateAngle)
        d.add(this.g_eye)
        this.g_at = d;
        console.log(this.g_at.elements)
    }
}
