var header = document.querySelector('header');
var tweetContainer = document.querySelector('.tweetContainer');
const WORLD_MAP = 'https://i.imgur.com/dGpBs3s.png';

var renderer = new THREE.WebGLRenderer({ alpha: true });
const cW = document.body.clientWidth;
const cH = document.body.clientHeight;
var heightScale = 1.25;
renderer.setSize(cW,cH/heightScale);

header.height=cH/heightScale;
tweetContainer.height=cH/heightScale;
header.style.height=cH/heightScale+"px";
tweetContainer.style.height=cH/heightScale+"px";

header.insertBefore(renderer.domElement, header.firstChild);

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x222222 );
var camera = new THREE.PerspectiveCamera(45, cW*heightScale/cH , 0.1, 1000);

camera.position.z = 400;

var geometry = new THREE.SphereGeometry(70,10,10);

var material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
material.map = THREE.ImageUtils.loadTexture(WORLD_MAP);

var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

var pointerOne = new THREE.PointLight(0x404040);

var light = new THREE.AmbientLight( 0xe5e5e5 );
scene.add( light );

pointerOne.position.set(-100,-90,130);

// Add to the scene the same way as before.

scene.add(pointerOne);

var render = function () {
  sphere.rotation.y -= .005;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
};

render();

function fadeIn(el) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

function fadeOut(el) {
  el.style.opacity = 1;

  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity - (new Date() - last) / 400;
    last = +new Date();

    if (+el.style.opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

var leftTweet = tweetContainer.querySelector(".leftTweet");
var rightTweet = tweetContainer.querySelector(".rightTweet");
var isleft = true;
var tweets;

function animTweets() {
  if(isleft) {
    isleft = false;
    var left = tweets[Math.floor(tweets.length*Math.random())];
    if(left) {
      leftTweet.querySelector(".tweet").textContent = left.text;
      leftTweet.querySelector(".tweeter").textContent = left.user.name+' says:';
      leftTweet.querySelector(".tweeter_pic").src = left.user.profile_image_url;
      fadeIn(leftTweet);
      setTimeout(fadeOut.bind(null, leftTweet), 5000);
    }
  } else {
    isleft = true;
    var right = tweets[Math.floor(tweets.length*Math.random())];
    if(right) {
      rightTweet.querySelector(".tweet").textContent = right.text;
      rightTweet.querySelector(".tweeter").textContent = right.user.name+' says:';
      rightTweet.querySelector(".tweeter_pic").src = right.user.profile_image_url;
      fadeIn(rightTweet);
      setTimeout(fadeOut.bind(null, rightTweet), 5000);
    }
  }
  setTimeout(animTweets, 5000);
}

function getTweets() {
  var request = new XMLHttpRequest();
  request.open('GET', 'tweets.php', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      tweets = JSON.parse(request.responseText);
      animTweets();
    }
  };
  request.onerror = function() {};
  request.send();
}

getTweets();

function register() {
  document.querySelector("pwat-button").click();
}
