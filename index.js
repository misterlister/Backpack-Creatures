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

const boundaries = []
const offset = {
    x: -27,
    y: -180,
}

const movePosition = {
    x: 0,
    y: 0
}

class Sprite {
    constructor({position, velocity, image, frames = { max: 1 }}) {
        this.position = position
        this.image = image
        this.velocity = velocity
        this.frames = frames
        if (image) {
            this.image.onload = () => {
                this.width = this.image.width / this.frames.max
                this.height = this.image.height
            }
        }
    }

    getx() {
        return this.position.x + movePosition.x
    }

    gety() {
        return this.position.y + movePosition.y
    }

    getTop() {
        return this.gety()
    }

    getLeft() {
        return this.getx()
    }

    getRight() {
        return this.getx() + this.width
    }

    getBottom() {
        return this.gety() + this.height
    }

    draw() {
        ct.drawImage(
            this.image, 
            0,
            0,
            this.width,
            this.height,
            this.getx(),
            this.gety(),
            this.width,
            this.height,
        )
    }
}

class Boundary extends Sprite {
    constructor({position}) {
        super({position})
        this.width = tileSize
        this.height = tileSize
    }

    draw() {
        ct.fillStyle = 'red'
        ct.fillRect(
            this.position.x + movePosition.x, 
            this.position.y + movePosition.y, 
            this.width, 
            this.height
        )
    }
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

class PlayerSprite extends Sprite {
    constructor({position, velocity, image, frames = { max: 1 }}) {
        super({position, velocity, image, frames})
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            this.position.x = canvas.width/2 - this.width / 2
            this.position.y = canvas.height/2 - this.height / 2
        }
    }

    //override base getx and gety to ignore movePosition
    getx() {
        return this.position.x
    }

    gety() {
        return this.position.y
    }

    //adjust player y position to prevent excess collisions
    getTop() {
        return this.gety() + (this.height / 2) + 6
    }

    getBottom() {
        return this.gety() + this.height - 4
    }

    draw() {
        ct.drawImage(
            this.image, 
            0,
            0,
            this.width,
            this.height,
            this.position.x, 
            this.position.y,
            this.width,
            this.height,
        )
    }
}



const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: protoMap1,
    velocity: 4
})

const player = new PlayerSprite({
    position: {},
    image: playerImage,
    frames: {
        max: 4
    }
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

function rectangularCollision(rect1, rect2) {

    return (
        rect1.getRight() >= rect2.getLeft() && 
        rect1.getLeft() <= rect2.getRight() &&
        rect1.getBottom() >= rect2.getTop() && 
        rect1.getTop() <= rect2.getBottom()
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
        if (rectangularCollision(player, boundary)) console.log("collision")
    })
    
    player.draw()

    if (keys.w.pressed && lastKey === 'w') movePosition.y += background.velocity
    else if (keys.a.pressed && lastKey === 'a') movePosition.x += background.velocity
    else if (keys.s.pressed && lastKey === 's') movePosition.y -= background.velocity
    else if (keys.d.pressed && lastKey === 'd') movePosition.x -= background.velocity
    else if (keys.w.pressed) movePosition.y += background.velocity
    else if (keys.a.pressed) movePosition.x += background.velocity
    else if (keys.s.pressed) movePosition.y -= background.velocity
    else if (keys.d.pressed) movePosition.x -= background.velocity
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