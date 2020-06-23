///<reference path="Player.ts" />

let myplayer = new Player(100, 100, 100, 100, "", 0, 0);

function drawAll(){
    drawParticles();
    myplayer.move();
    myplayer.drawPlayer();
}

function shoot(){
    let x = myplayer.centerx - 10;
    let y = myplayer.centery - 10;
    let w = 20;
    let h = 20;
    let spd = 20;
    let dir = myplayer.dir;
    let life = 20;
    let bullet = new Particle(x,y,w,h,"red", spd, dir, life);
    particlestuff.particles.push(bullet);
}

// interaction with html
document.addEventListener("DOMContentLoaded", ()=>{
    document.getElementById("kaboom").onclick = ()=>{
        particlestuff.kaboom(100, 100, "red", 20);
    };
    setInterval(drawAll, 100);
});

document.addEventListener("keydown", function(event) {
    if (event.key == "ArrowLeft") {
        myplayer.turnLeft();
    }
    if (event.key == "ArrowRight") {
        myplayer.turnRight();
    }
    if (event.key == "ArrowDown") {
        myplayer.decelerate();
    }
    if (event.key == "ArrowUp") {
        myplayer.accelerate();
    }
    if (event.keyCode == 32) {
        shoot();
        particlestuff.changefancy = 0;
    }
});