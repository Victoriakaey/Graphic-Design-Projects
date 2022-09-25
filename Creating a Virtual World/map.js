const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 2, 2, 0, 0, 1],
    [1, 0, 2, 2, 0, 0, 2, 0, 0, 2, 0, 0, 2, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 1],
    [1, 0, 0, 2, 2, 2, 0, 2, 0, 2, 0, 0, 2, 0, 0, 1],
    [1, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 1], //mid
    [1, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 3, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

function drawMap(){
    var snowBox = new Cube();
    var iceBox = new Cube();
    var trap = new Cube();
    for (x=0; x < 16; x++)
    {
        for (y=0; y<16; y++) {
            if (map[x][y] === 1) {
                snowBox.color = [1, 0, 0, 1]
                snowBox.textureNum = 2;
                snowBox.matrix.setTranslate(0, -1, -5)
                snowBox.matrix.scale(3.5, 1, 3.5)
                snowBox.matrix.translate(x-6.5, 0, y-6.5)
                snowBox.render()
            } else if (map[x][y] === 2) {
                iceBox.color = [0, 0, 1, 1]
                iceBox.textureNum = 3;
                iceBox.matrix.setTranslate(0, -1, -5)
                if ((x>=3 && x<=12) && (y>=3 && y<=12)){
                    iceBox.matrix.scale(3.5, 6, 3.5)
                } else {
                    iceBox.matrix.scale(3.5, 3, 3.5)
                }
                iceBox.matrix.translate(x-6.5, 0, y-6.5)
                iceBox.render()
            } else if (map[x][y] === 4) {
                trap.color = [1, 0, 0, 1]
                trap.textureNum = 4;
                trap.matrix.setTranslate(0, -1, -5)
                trap.matrix.scale(3, 3, 3)
                trap.matrix.translate(x-6.5, 0, y-6.5)
                trap.render()

            }else if (map[x][y] === 3) { 
                var newKittyBangbang = new KittyBangbang(x+12.5, y+22.5)
                newKittyBangbang.render()
            }
         }
    }
}
