///<reference path="block.ts" />
///<reference path="MyMath.ts" />
// class that holds data on
// - move block
//  - position, dimensions, color
//  - spdx, spdy
//  - function move() to change position accordingly
// - duration
// - function update() to decrement duration and returns if duration is 0
class Particle extends MoveBlock{
    duration: number;
    constructor(
        x: number, y: number, 
        w: number, h: number, 
        color:string, 
        spd:number, dir:number, 
        duration:number){
        super(x, y, w, h, color, spd, dir);
        this.duration = duration;
    }
    set time(val: number){ this.duration = val;}
    update(){
        this.move();
        this.time = this.duration - 1;
        return this.duration == 0;
    }
}
// class that contains a list of particles
// allows manipulation of those particles
class ParticleEffects{
    particles: Particle[];
    fancy: number;
    constructor(){
        this.particles = [];
        this.fancy = 0;
    }
    set changefancy(val: number){ this.fancy = val;}
    // adds a random particle to the list
    addRandomParticle(x: number, y: number, color: string){
        let mymath = new MyMath();
        let spd = mymath.getRandomInt(2, 5);
        let dir = mymath.getRandomInt(0, 360);
        let size = mymath.getRandomInt(2, 10);
        let life = mymath.getRandomInt(10, 50);
        let p = new Particle(x, y, size, size, color, spd, dir, life)
        p.determineSpeed();
        this.particles.push(p);
    }
    addSpecificParticle(p:Particle){
        p.determineSpeed();
        this.particles.push(p);
    }
    // calls the update function on all particles in the list
    // update is used to filter particles that have a duration that is up
    // these particles are recorded and then removed
    removeParticles(){
        let toRemove = [];
        for (let i = this.particles.length-1; i >= 0; i--) {
            if(this.particles[i].update()){
                toRemove.push(i);
                if(this.fancy != 10){
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
    kaboom(x: number, y: number, color: string, num: number){
        for (let i = 0; i < num; i++) {
            this.addRandomParticle(x, y, color);
        }
    }
}
