const canvas = document.querySelector('canvas')
const ct = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const tileSize = 36

const mapWidth = 70
const mapHeight = 40

const protoMap1CollisionsArray = []

for(let i = 0; i < protoMap1Collisions.length; i += mapWidth) {
    protoMap1CollisionsArray.push(protoMap1Collisions.slice(i, i + mapWidth))
}
console.log(protoMap1CollisionsArray)

class Boundary {
    constructor({position}) {
        this.position = position
        this.width = tileSize
        this.height = tileSize
    }
    draw() {
        ct.fillStyle = 'red'
        ct.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -27,
    y: -180,
}

protoMap1CollisionsArray.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * tileSize + offset.x,
                        y: i * tileSize + offset.y
                    }
                })
            )
        }
    })
})

const protoMap1 = new Image()
protoMap1.src = './img/ProtoMap1_image.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'


class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
        this.velocity = velocity
    }

    draw() {
        ct.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({position: {
    x: offset.x,
    y: offset.y,
    },
    image: protoMap1,
    velocity: 5
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    ct.drawImage(playerImage, 
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width/2 - (playerImage.width/4)/2, 
        canvas.height/2 - playerImage.height/2,
        playerImage.width/4,
        playerImage.height,
        )
    if (keys.w.pressed && lastKey === 'w') background.position.y += background.velocity
    else if (keys.a.pressed && lastKey === 'a') background.position.x += background.velocity
    else if (keys.s.pressed && lastKey === 's') background.position.y -= background.velocity
    else if (keys.d.pressed && lastKey === 'd') background.position.x -= background.velocity
    else if (keys.w.pressed) background.position.y += background.velocity
    else if (keys.a.pressed) background.position.x += background.velocity
    else if (keys.s.pressed) background.position.y -= background.velocity
    else if (keys.d.pressed) background.position.x -= background.velocity
}

animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})