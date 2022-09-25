class KittyBangbang
{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.angle = 0;
    }

    render() {

  // core of the body; all body part are relative to this core body.
  var body = new Cube();
  body.brightSide = 0.98;
  body.textureNum = -2;
  /* body.matrix.translate(g_bodyTranslateX/100.0, g_bodyTranslateY/100.0+0.1, g_bodyTranslateZ/100.0); */
  body.matrix.translate(this.x, 0.1, this.y);
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
}
