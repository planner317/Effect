let cnv = document.getElementById("cnv");
/**  @type {CanvasRenderingContext2D} */
let ctx = cnv.getContext("2d");
let w = cnv.width = 512;
let h = cnv.height = 256;
let img = ctx.createImageData(w, h);
let data = img.data;
let frame = 0;

let amp = [];
let vel = [];

for (let x = 0; x < w; x++) {
    amp.push([]);
    vel.push([]);
    for (let y = 0; y < h; y++) {       
        amp[x][y] = (y/h + x/w)/2 < 0.5
       
        // if (x%200 >100 )  amp[x][y] = 1
        // else amp[x][y] = 0
        // if (y%200 <100) amp[x][y] = !amp[x][y]

        // amp[x][y] = Math.random()
        
        vel[x][y] = 0;
    }
}
 
update()
function update() {
    requestAnimationFrame(update)
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            amp[x][y] += vel[x][y];
            let dataIndex = (y * w + x) * 4;
            let color = amp[x][y] * 255;
            data[dataIndex] = data[dataIndex + 1] = data[dataIndex + 2] = color;
            data[dataIndex + 3] = 255;
        }
    }
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            let div = 0;
            let force = 0;
            if (x - 1 >= 0) {
                force += amp[x - 1][y];     // слева
                div++;
            }
            if (x + 1 < w) {
                force += amp[x + 1][y];     // справа
                div++;
            }
            if (y - 1 >= 0) {
                force += amp[x][y - 1];     // сверху
                div++;
            }
            if (y + 1 < h) {
                force += amp[x][y + 1];     // снизу
                div++;
            }
            vel[x][y] += (force / div - amp[x][y])
        }
    }
    ctx.putImageData(img, 0, 0);
}