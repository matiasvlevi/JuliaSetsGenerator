const {createCanvas, Image} = require('canvas');
require('mathjs');
const prompt = require('prompt')
const fs = require('fs');
let lightFactor = 2;
let resmult = 1;
let wnx = 1920*resmult;
let wny = 1080*resmult;
let canvas;
let ctx;;
let nb = 64;
let colScaleMult = (6*nb)/256
class Complex {
    constructor(r,i) {
        this.r = r;
        this.i = i;
    }
    static square(c) {

        let real = c.r*c.r;
        let i1 = c.r*c.i;
        let i2 = c.i*c.i;
        let i3 = c.i*c.r;
        let nc = new Complex(Math.round((real-i2)*10000)/10000,Math.round((i1+i3)*10000)/10000);

        return nc;
    }
    add(c2) {

        this.r += c2.r;
        this.i += c2.i;


    }
}
function map(x,a,b,c,d) {
    return (x-a)/(b-a) * (d-c) + c;
}
function constrain(x,a,b) {
    if (x >= b) {
        return b;
    } else if (x <= a) {
        return a;
    } else {
        return x;
    }
}
function getColorIndicesForCoord(x, y, width) {
  let red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}
function customQuadratic(x,h) {
    let a = -0.125490196078/lightFactor;
    return a*Math.pow(x-h,2)+255;


}
function scaleColor(value) {
    let n1 = map(value,0,nb,0,255*colScaleMult)
    let n = constrain(n1,0,255);
    let g = customQuadratic(n,127.5);
    let b = customQuadratic(n,127.5/2);
    let r = customQuadratic(n,3*(127.5/2));
    return [r,g,b];
}
function downloadImg(imgData,name,i) {
    ctx.putImageData(imgData,0,0);
    const buffer = canvas.toBuffer('image/png');
    if (!fs.existsSync(name)) {
        fs.mkdirSync('./'+name)
    }
    fs.writeFileSync('./'+name+'/frame_'+i+'.png', buffer);
    console.log('Downloaded frame '+i);
}

let imgData;
function renderVideo(frames,name) {
    for (let a = 0; a < frames; a++) {
        imgData = ctx.createImageData(wnx,wny);

        for (let r = 0; r < wnx; r++) {

            for (let i = 0; i < wny; i++) {
                let c = new Complex((r-wnx/2)*(0.0025/resmult),(i-(wny/2))*(0.0025/resmult));
                c.add(new Complex(-0.5,0))
                let max = 0;
                for (let j = 0; j < nb; j++) {

                    c.add(Complex.square(c));
                    c.add(new Complex(Math.cos((Math.PI*2/frames)*a),Math.sin((Math.PI*2/frames)*a)))

                    if (c.i == Infinity || c.r == Infinity || isNaN(c.r) || isNaN(c.i)) {
                        //console.log("to infinity");
                        max = j;
                        //console.log(r,i,max)
                        j = nb;

                    }

                }

                //pixels[(wnx*i)+r] = scaleColor(max);
                let colorIndices = getColorIndicesForCoord(r, i, wnx);

                let redIndex = colorIndices[0];
                let greenIndex = colorIndices[1];
                let blueIndex = colorIndices[2];
                let alpha = colorIndices[3];
                let pcolor = scaleColor(max);

                imgData.data[redIndex] = pcolor[0];
                imgData.data[greenIndex] = pcolor[1];
                imgData.data[blueIndex] = pcolor[2];
                imgData.data[alpha] = 255;
                //ctx.putImageData(imgData);

            }

        }
        downloadImg(imgData,name,a);

    }
}
prompt.message = ''
prompt.delimiter = ':'

function start() {
    prompt.get({

        properties: {

            ClipName: {
                description: '',
                message: '',
                required: true

            },
            FrameCount: {
                description: '',
                message: '',
                required: true
            },
            ResolutionMultiplier: {
                description: '',
                message: '',
                required: true
            }
        }
      }, function (err, result) {

        //let input = result.$.split(" ");;
        let name = result.ClipName;
        let param = result.FrameCount;
        resmult = result.ResolutionMultiplier;
        wnx = 1920*resmult;
        wny = 1080*resmult;
        canvas = createCanvas(wnx,wny)
        ctx = canvas.getContext('2d');
        renderVideo(param,name);

        prompt.stop();


    });
    prompt.start();
}

start();
