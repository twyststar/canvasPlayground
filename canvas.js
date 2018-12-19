const canvas = document.getElementById('homeCanvas');
const c = canvas.getContext('2d');

//Full window height and width
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Squares
// fillRect(begin horizontal, begin vertical, width, height)
// last rgba value is opacity
c.fillStyle="rgba(0,0,0, 0.5)";
c.fillRect(100, 100, 100, 100);
c.fillStyle="red";
c.fillRect(150, 150, 100, 100);
c.fillStyle="blue";
c.fillRect(200, 200, 100, 100);

//Lines
c.beginPath();
//crosses blue square
c.moveTo(200, 200);
c.lineTo(300, 300);
//crosses red square
c.moveTo(150, 250);
c.lineTo(250, 150);
c.stroke();

//Arc/Circle
// c.arc(x:Int, y:Int, r:Int, startAngle:Float, endAngle:Float, anticlockwise?:Bool)
// x:Int, y:Int, <- starting position for center of circle
// r: radius
// startAngle/endAngle = radians (2*PI radians = 360 degrees)

// full circle
c.beginPath();
c.arc(400, 400, 30, 0, Math.PI*2, false);
c.stroke();
c.fillStyle = "rgba(0,0,0, 0.5)";
c.fill();
// Half circle, flat bit up and with line across
c.beginPath();
c.arc(400, 500, 30, Math.PI *1, 0, 1, false);
c.moveTo(370, 500);
c.lineTo(430, 500);
c.stroke();
c.fillStyle = "red";
c.fill();
// Half circle, flat bit down and with line across
c.beginPath();
c.arc(460, 500, 30, 0, Math.PI * 1, 1, );
c.moveTo(430, 500);
c.lineTo(490, 500);
c.stroke();
c.fillStyle = "blue";
c.fill();
//Pie slice curve on bottom right
// This fill doesn't work....
c.beginPath()
c.arc(300, 500, 30, 0, Math.PI * .5, false);
c.fillStyle = "green";
c.fill();
c.moveTo(300, 500);
c.lineTo(330, 500);
c.moveTo(300, 500);
c.lineTo(300, 530);
c.stroke();

