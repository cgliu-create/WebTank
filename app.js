"use strict";
// class that holds
// useful math functions
class MyMath {
    constructor() { }
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    toRadians(degrees) {
        let pi = Math.PI;
        return degrees * (pi / 180);
    }
}
///<reference path="MyMath.ts" />
// class that holds data on
// - position
// - dimensions
// - color
class Block {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }
    set changex(val) { this.x = val; }
    set changey(val) { this.y = val; }
    set changew(val) { this.w = val; }
    set changeh(val) { this.h = val; }
    set changecolor(color) { this.color = color; }
    get centerx() { return this.x + this.w / 2; }
    get centery() { return this.y + this.h / 2; }
}
// class that holds data on
// - block
//  - position, dimensions, color
// - spd in the x direction
// - spd in the y direction
// - function move() to change position accordingly
class MoveBlock extends Block {
    constructor(x, y, w, h, color, spd, dir) {
        super(x, y, w, h, color);
        this.spd = spd;
        this.dir = dir;
        this.spdx = this.spdy = 0;
        this.determineSpeed();
    }
    set changespdx(val) { this.spdx = val; }
    set changespdy(val) { this.spdy = val; }
    set changespd(val) { this.spd = val; }
    set changedir(val) { this.dir = val; }
    determineSpeed() {
        let mymath = new MyMath();
        this.changespdx = Math.floor(this.spd * Math.sin(mymath.toRadians(this.dir)));
        this.changespdy = Math.floor(this.spd * Math.cos(mymath.toRadians(this.dir)));
    }
    move() {
        this.changex = this.x + this.spdx;
        this.changey = this.y + this.spdy;
    }
    turnLeft() {
        let d = this.dir - 45;
        if (d == -360) {
            d = 0;
        }
        this.changedir = d;
        this.determineSpeed();
    }
    turnRight() {
        let d = this.dir + 45;
        if (d == 360) {
            d = 0;
        }
        this.changedir = d;
        this.determineSpeed();
    }
    accelerate() {
        this.changespd = this.spd + 10;
        this.determineSpeed();
    }
    decelerate() {
        this.changespd = this.spd - 10;
        this.determineSpeed();
    }
}
///<reference path="block.ts" />
///<reference path="MyMath.ts" />
// class that holds data on
// - move block
//  - position, dimensions, color
//  - spdx, spdy
//  - function move() to change position accordingly
// - duration
// - function update() to decrement duration and returns if duration is 0
class Particle extends MoveBlock {
    constructor(x, y, w, h, color, spd, dir, duration) {
        super(x, y, w, h, color, spd, dir);
        this.duration = duration;
    }
    set time(val) { this.duration = val; }
    update() {
        this.move();
        this.time = this.duration - 1;
        return this.duration == 0;
    }
}
// class that contains a list of particles
// allows manipulation of those particles
class ParticleEffects {
    constructor() {
        this.particles = [];
        this.fancy = 0;
    }
    set changefancy(val) { this.fancy = val; }
    // adds a random particle to the list
    addRandomParticle(x, y, color) {
        let mymath = new MyMath();
        let spd = mymath.getRandomInt(2, 5);
        let dir = mymath.getRandomInt(0, 360);
        let size = mymath.getRandomInt(2, 10);
        let life = mymath.getRandomInt(10, 50);
        let p = new Particle(x, y, size, size, color, spd, dir, life);
        p.determineSpeed();
        this.particles.push(p);
    }
    addSpecificParticle(p) {
        p.determineSpeed();
        this.particles.push(p);
    }
    // calls the update function on all particles in the list
    // update is used to filter particles that have a duration that is up
    // these particles are recorded and then removed
    removeParticles() {
        let toRemove = [];
        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].update()) {
                toRemove.push(i);
                if (this.fancy != 10) {
                    let p = this.particles[i];
                    this.kaboom(p.x, p.y, p.color, 10);
                    this.changefancy = this.fancy + 1;
                }
            }
        }
        for (let pos of toRemove) {
            this.particles.splice(pos, 1);
        }
    }
    // creates a specified number of random particles of a specified color from a specified position
    // explosion!
    kaboom(x, y, color, num) {
        for (let i = 0; i < num; i++) {
            this.addRandomParticle(x, y, color);
        }
    }
}
///<reference path="ParticleEffects.ts" />
let particlestuff = new ParticleEffects();
// create a corresponding html div
// as a child in the area html element
// from a specified Block and identifer
function draw(item, id) {
    let element = document.createElement("div");
    element.className = "block";
    element.id = id;
    element.style.backgroundColor = item.color;
    element.style.width = item.w + "px";
    element.style.height = item.h + "px";
    element.style.top = item.x + "px";
    element.style.left = item.y + "px";
    document.getElementById("area").appendChild(element);
}
// removes all children from the area html element
function clear() {
    let area = document.getElementById("area");
    while (area.firstChild) {
        area.removeChild(area.lastChild);
    }
}
// draws all particles from Particle Effects
function drawParticles() {
    clear();
    for (let i = 0; i < particlestuff.particles.length; i++) {
        draw(particlestuff.particles[i], "p" + i);
    }
    particlestuff.removeParticles();
}
///<reference path="Graphics.ts" />
class Player extends MoveBlock {
    constructor(x, y, w, h, color, spd, dir) {
        super(x, y, w, h, color, spd, dir);
    }
    drawPlayer() {
        let element = document.createElement("img");
        element.className = "block";
        element.id = "player";
        element.alt = "error";
        console.log(this.dir);
        if (this.dir == 45 || this.dir == -315) {
            element.src = "Player45.png";
        }
        else if (this.dir == 90 || this.dir == -270) {
            element.src = "Player90.png";
        }
        else if (this.dir == 135 || this.dir == -225) {
            element.src = "Player135.png";
        }
        else if (this.dir == 180 || this.dir == -180) {
            element.src = "Player180.png";
        }
        else if (this.dir == 225 || this.dir == -135) {
            element.src = "Player225.png";
        }
        else if (this.dir == 270 || this.dir == -90) {
            element.src = "Player270.png";
        }
        else if (this.dir == 315 || this.dir == -45) {
            element.src = "Player315.png";
        }
        else {
            element.src = "Player0.png";
        }
        element.style.width = this.w + "px";
        element.style.height = this.h + "px";
        element.style.top = this.x + "px";
        element.style.left = this.y + "px";
        document.getElementById("area").appendChild(element);
    }
}
///<reference path="Player.ts" />
let myplayer = new Player(100, 100, 100, 100, "", 0, 0);
function drawAll() {
    drawParticles();
    myplayer.move();
    myplayer.drawPlayer();
}
function shoot() {
    let x = myplayer.centerx - 10;
    let y = myplayer.centery - 10;
    let w = 20;
    let h = 20;
    let spd = 20;
    let dir = myplayer.dir;
    let life = 20;
    let bullet = new Particle(x, y, w, h, "red", spd, dir, life);
    particlestuff.particles.push(bullet);
}
// interaction with html
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("kaboom").onclick = () => {
        particlestuff.kaboom(100, 100, "red", 20);
    };
    setInterval(drawAll, 100);
});
document.addEventListener("keydown", function (event) {
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
