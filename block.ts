///<reference path="MyMath.ts" />
// class that holds data on
// - position
// - dimensions
// - color
class Block{
    public x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    constructor(
        x: number, y: number, 
        w: number, h: number, 
        color: string){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;
    }    
    set changex(val: number){ this.x = val;}
    set changey(val: number){ this.y = val;}
    set changew(val: number){ this.w = val;}
    set changeh(val: number){ this.h = val;}
    set changecolor(color: string){ this.color = color;}
    get centerx(){ return this.x + this.w/2;}
    get centery(){ return this.y + this.h/2;}
}
// class that holds data on
// - block
//  - position, dimensions, color
// - spd in the x direction
// - spd in the y direction
// - function move() to change position accordingly
class MoveBlock extends Block{
    spdx: number;
    spdy: number;
    spd: number;
    dir: number;
    constructor(
        x: number, y: number, 
        w: number, h: number, 
        color:string, 
        spd:number, dir:number){
        super(x, y, w, h, color);
        this.spd = spd;
        this.dir = dir;
        this.spdx = this.spdy = 0;
        this.determineSpeed();
    }
    set changespdx(val: number){ this.spdx = val;}
    set changespdy(val: number){ this.spdy = val;}
    set changespd(val: number){ this.spd = val;}
    set changedir(val: number){ this.dir = val;}
    determineSpeed(){
        let mymath = new MyMath();
        this.changespdx = Math.floor(this.spd * Math.sin(mymath.toRadians(this.dir)));
        this.changespdy = Math.floor(this.spd * Math.cos(mymath.toRadians(this.dir)));
    }
    move(){
        this.changex = this.x + this.spdx;
        this.changey = this.y + this.spdy;
    }
    turnLeft(){
        let d = this.dir - 45;
        if (d == -360){ d = 0;}
        this.changedir = d;
        this.determineSpeed();
    }
    turnRight(){
        let d = this.dir + 45;
        if (d == 360){ d = 0;}
        this.changedir = d;
        this.determineSpeed();
    }
    accelerate(){
        this.changespd = this.spd+10;
        this.determineSpeed();
    }
    decelerate(){
        this.changespd = this.spd-10;
        this.determineSpeed();
    }
}
