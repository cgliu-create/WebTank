///<reference path="ParticleEffects.ts" />

let particlestuff = new ParticleEffects();
// create a corresponding html div
// as a child in the area html element
// from a specified Block and identifer
function draw(item: Block, id: string) {
    let element = document.createElement("div");
    element.className = "block";
    element.id = id;
    element.style.backgroundColor = item.color;
    element.style.width = item.w+"px";
    element.style.height = item.h+"px";
    element.style.top = item.x+"px";
    element.style.left = item.y+"px";
    document.getElementById("area").appendChild(element);
}
// removes all children from the area html element
function clear(){
    let area = document.getElementById("area");
    while (area.firstChild) {
        area.removeChild(area.lastChild);
    }
}
// draws all particles from Particle Effects
function drawParticles(){
    clear();
    for (let i = 0; i < particlestuff.particles.length; i++) {
        draw(particlestuff.particles[i], "p"+i);
    }
    particlestuff.removeParticles();
}
