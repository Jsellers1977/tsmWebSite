var canvas = document.querySelector("#scene"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = { x: 0, y: 0 },
  radius = 1;

var colors = ["#468966", "#FFF0A5", "#FFB03B", "#B64926", "#8E2800"];

var copy = document.querySelector("#copy");

var ww = (canvas.width = window.innerWidth);
var wh = (canvas.height = window.innerHeight);

function Particle(x, y) {
  this.x = Math.random() * ww;
  this.y = Math.random() * wh;
  this.dest = {
    x: x,
    y: y
  };
  this.r = Math.random() * 5 + 2;
  this.vx = (Math.random() - 0.5) * 20;
  this.vy = (Math.random() - 0.5) * 20;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * 0.05 + 0.94;

  this.color = colors[Math.floor(Math.random() * 6)];
}

Particle.prototype.render = function() {
  this.accX = (this.dest.x - this.x) / 1000;
  this.accY = (this.dest.y - this.y) / 1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt(a * a + b * b);
  if (distance < radius * 70) {
    this.accX = (this.x - mouse.x) / 100;
    this.accY = (this.y - mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }
};

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

function initScene() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold " + ww / 10 + "px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(copy.value, ww / 2, wh / 2);

  var data = ctx.getImageData(0, 0, ww, wh).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];
  for (var i = 0; i < ww; i += Math.round(ww / 150)) {
    for (var j = 0; j < wh; j += Math.round(ww / 150)) {
      if (data[(i + j * ww) * 4 + 3] > 150) {
        particles.push(new Particle(i, j));
      }
    }
  }
  amount = particles.length;
}

function onMouseClick() {
  radius++;
  if (radius === 5) {
    radius = 0;
  }
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
}

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license used for interactive text on canvas
/* <!--

Copyright (c) 2018 James Sellers- URL TO ORIGINAL

Permission is hereby granted, free of charge, to any person 
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall 
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.

--> */

(function() {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
})();

(function() {
  // Get the buttons.
  var startBtn = document.getElementById("button");
  /*var resetBtn = document.getElementById('resetBtn');*/
  // A variable to store the requestID.
  var requestID;
  // Canvas
  var canvas = document.getElementById("canvas");
  // 2d Drawing Context.
  var ctx = canvas.getContext("2d");

  // Variables to for the drawing position and object.
  var posX = 0;
  var W = 246;
  var H = 60;
  var circles = [];

  //Get canvas size
  canvas.width = 246;
  canvas.height = 60;

  // Animate.
  function animate() {
    requestID = requestAnimationFrame(animate);
    //Fill canvas with black color
    //ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, W, H);

    //Fill the canvas with circles
    for (var j = 0; j < circles.length; j++) {
      var c = circles[j];

      //Create the circles
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = "rgba(" + c.r + ", " + c.g + ", " + c.b + ", 0.5)";
      ctx.fill();

      c.x += c.vx;
      c.y += c.vy;
      c.radius -= 0.02;

      if (c.radius < 0) circles[j] = new create();
    }
  }

  //Random Circles creator
  function create() {
    //Place the circles at the center

    this.x = W / 2;
    this.y = H / 2;

    //Random radius between 2 and 6
    this.radius = 2 + Math.random() * 3;

    //Random velocities
    this.vx = -5 + Math.random() * 10;
    this.vy = -5 + Math.random() * 10;

    //Random colors
    this.r = Math.round(Math.random()) * 255;
    this.g = Math.round(Math.random()) * 255;
    this.b = Math.round(Math.random()) * 255;
  }

  for (var i = 0; i < 500; i++) {
    circles.push(new create());
  }

  // Event listener for the start button.
  startBtn.addEventListener("mouseover", function(e) {
    e.preventDefault();

    // Start the animation.
    requestID = requestAnimationFrame(animate);
  });

  // Event listener for the stop button.
  startBtn.addEventListener("mouseout", function(e) {
    e.preventDefault();

    // Stop the animation;
    cancelAnimationFrame(requestID);

    e.preventDefault();

    // Reset the X position to 0.
    posX = 0;

    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the initial box on the canvas.
    ctx.fillRect(posX, 0, boxWidth, canvas.height);
  });
});
