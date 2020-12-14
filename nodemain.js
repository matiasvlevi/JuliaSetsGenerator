const { createCanvas } = require('canvas');

class Complex {
    constructor(r,i) {
        this.r = r;
        this.i = i;
    }
    log() {
        //console.log(this.r+" + "+this.i+"i");
    }
    static square(c) {

        let real = c.r*c.r;
        let i1 = c.r*c.i;
        let i2 = c.i*c.i;
        let i3 = c.i*c.r;
        let nc = new Complex(round((real-i2)*10000)/10000,round((i1+i3)*10000)/10000);

        return nc;
    }
    render() {
        text("("+round(this.r*100)/100+"+"+round(this.i*100)/100+"i)",this.r*zoom,this.i*zoom)
        ellipse(this.r*zoom,this.i*zoom,1,1);
    }
    add(c2) {

        this.r += c2.r;
        this.i += c2.i;


    }
}
let zoom = 1;
let wnx = window.innerWidth;
let wny = window.innerHeight;
let points = [];
let pixels = [];
let nb = 256;
let sx;
let sy;
let lightFactor = 2;
function customQuadratic(x,h) {
    let a = -0.125490196078/lightFactor;
    return a*pow(x-h,2)+255;


}
function scaleColor(value) {
    let n1 = map(value,0,nb,0,255*6)
    let n = constrain(n1,0,255);
    let g = customQuadratic(n,127.5);
    let b = customQuadratic(n,127.5/2);
    let r = customQuadratic(n,3*(127.5/2));
    return color(r,g,b);
}
let img;
//createCanvas(wnx,wny);
for (let a = 0; a < 24; a++) {
    for (let r = 0; r < wnx; r++) {

        for (let i = 0; i < wny; i++) {
            let c = new Complex((r-wnx/2)*0.0025,(i-(wny/2))*0.0025);
            c.add(new Complex(-0.5,0))
            let max = 0;
            for (let j = 0; j < nb; j++) {

                c.add(Complex.square(c));
                c.add(new Complex(0.0416667*a,0.1))

                if (c.i == Infinity || c.r == Infinity) {
                    //console.log("to infinity");
                    max = j;
                    //console.log(r,i,max)
                    j = nb;

                }

            }

            pixels[(wnx*i)+r] = scaleColor(max);


        }

    }
    //pixels.splice(pixels.length-1,1)
    img = createImage(wnx,wny);
    img.loadPixels();
    for (let x = 0; x < wnx; x++) {
        for (let y = 0; y < wny; y++) {
            c = pixels[(wnx*y)+x];

            img.set(x,y, c);


        }
    }
    img.updatePixels();
    img.save('frame'+a+'_juliaset1','png');
}
