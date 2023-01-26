const app = {
  width: 0,
  height: 0,
  flakes: []
}

const MIN_SPEED = 1;
const MAX_SPEED = 3;
const FLAKE_SPEED = {x: 0.75, y: 1};
const FLAKE_OFFSET = {x: -300, y: 0};

function init() {
  const storm = document.querySelector(".snowstorm");
 
  generate_fake_divs(storm, "snowflake", 100);
 
  const flakes = document.querySelectorAll(".snowflake");
 
  for (const flake of flakes) {
     app.flakes.push({
      el: flake,
      x: 0,
      y: 0,
      z: 0,
      opacity: 0,
      speed: {x: 0, y: 0}
    });
  }
  
  app.width = storm.clientWidth;
  app.height = storm.clientHeight;
  
  for (const flake of app.flakes) {
    reset_flake(flake);
  }
  
  window.requestAnimationFrame(update);
}

function reset_flake(flake) {
  
  let speed = MIN_SPEED + (Math.random() * MAX_SPEED - MIN_SPEED);
  flake.speed.x = FLAKE_SPEED.x * speed;
  flake.speed.y = FLAKE_SPEED.y * speed;
  flake.x = FLAKE_OFFSET.x + (Math.random() * (app.width - flake.el.clientWidth));
  flake.y = FLAKE_OFFSET.y - flake.el.clientHeight;
  flake.z = -1 + (Math.random() * 2);
  flake.opacity = 1.1 + (Math.random() * 1.1)
}

function update() {
  for (const flake of app.flakes) {

    flake.x += flake.speed.x;    
    flake.y += flake.speed.y;
    if (flake.y > app.height) {
      reset_flake(flake);
    }

    flake.el.style.opacity = flake.opacity;
    flake.el.style.transform = `translate3D(${flake.x}px, ${flake.y}px, ${flake.z}px)`;
  }
  
  window.requestAnimationFrame(update);
}

function generate_fake_divs(parent, class_name, ndivs) {
  for (let i=0; i<ndivs; i++) {
    let div = document.createElement("div");
    div.className = class_name;
    parent.append(div);
  }
}

document.addEventListener("DOMContentLoaded", init);