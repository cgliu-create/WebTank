// class that holds
// useful math functions
class MyMath{
    constructor(){}
    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    toRadians(degrees: number) {
        let pi = Math.PI;
        return degrees * (pi / 180);
    }
}

