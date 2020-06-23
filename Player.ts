///<reference path="Graphics.ts" />

class Player extends MoveBlock{
    
    constructor(
        x: number, y: number, 
        w: number, h: number, 
        color:string, 
        spd:number, dir:number, ){
        super(x, y, w, h, color, spd, dir);
    }

    drawPlayer(){
        let element = document.createElement("img");
        element.className = "block";
        element.id = "player";
        element.alt = "error";
        console.log(this.dir);
        if (this.dir == 45 || this.dir == -315){
            element.src = "Player45.png";
        } else if (this.dir == 90 || this.dir == -270){
            element.src = "Player90.png";
        } else if (this.dir == 135 || this.dir == -225){
            element.src = "Player135.png";
        } else if (this.dir == 180 || this.dir == -180){
            element.src = "Player180.png";
        } else if (this.dir == 225 || this.dir == -135){
            element.src = "Player225.png";
        } else if (this.dir == 270 || this.dir == -90){
            element.src = "Player270.png";
        } else if (this.dir == 315 || this.dir == -45){
            element.src = "Player315.png";
        } else { 
            element.src = "Player0.png";
        }
        element.style.width = this.w+"px";
        element.style.height = this.h+"px";
        element.style.top = this.x+"px";
        element.style.left = this.y+"px";
        document.getElementById("area").appendChild(element);
    }
}
