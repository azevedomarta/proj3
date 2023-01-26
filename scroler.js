const SCROLL_SPEED = [0.8,0.6,0.8,0.6];

let scrollers = document.querySelectorAll('.scroller');
let state = [];

for (let i = 0; i < scrollers.length; i++) {
    
    let scroller = scrollers[i];
    
    state.push(
        {
            el: scroller,
            pos: -80,
            active: true,
            speed: SCROLL_SPEED[i]
        }
    );

    scroller.addEventListener("mouseenter", function() {
        state[i].active = false;;
    });
    
    scroller.addEventListener("mouseleave", function() {
        state[i].active = true;
    });
}

function update() {
    for (s of state) {
        if (s.active) {
            s.pos = s.pos + s.speed;
            s.el.scroll(0, s.pos);
            
            let top_el = s.el.children[0];
            if (s.pos > top_el.scrollHeight-300) {
                s.el.removeChild(top_el);
                s.el.appendChild(top_el);
                s.pos = 0;
            }
        }
    }

    requestAnimationFrame(update);
}

requestAnimationFrame(update);