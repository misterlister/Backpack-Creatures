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

const protoMap1fg = new Image()
protoMap1fg.src = './img/ProtoMap1_foreground.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: protoMap1,
    velocity: 4
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: protoMap1fg,
})

const player = new PlayerSprite({
    position: {},
    image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
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

function checkHorizontalMoveCollision(modifier = 1) {
    for (let i = 0; i < boundaries.length; i++) {
        const currBoundary = new Boundary({position: {
            x: boundaries[i].position.x + (modifier * background.velocity),
            y: boundaries[i].position.y
        }})
        if (rectangularCollision(player, currBoundary)) return true
    }
    return false
}

function checkVerticalMoveCollision(modifier = 1) {
    for (let i = 0; i < boundaries.length; i++) {
        const currBoundary = new Boundary({position: {
            x: boundaries[i].position.x,
            y: boundaries[i].position.y + (modifier * background.velocity)
        }})
        if (rectangularCollision(player, currBoundary)) return true 
    }
    return false
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    
    /*boundaries.forEach(boundary => {
        boundary.draw()
    })*/

    player.draw()
    foreground.draw()

    if (keys.w.pressed && lastKey === 'w') {
        player.goUp()
        if (!checkVerticalMoveCollision()) movePosition.y += background.velocity
    }
    else if (keys.a.pressed && lastKey === 'a') {
        player.goLeft()
        if (!checkHorizontalMoveCollision()) movePosition.x += background.velocity
    }
    else if (keys.s.pressed && lastKey === 's') {
        player.goDown()
        if (!checkVerticalMoveCollision(-1)) movePosition.y -= background.velocity
    }
    else if (keys.d.pressed && lastKey === 'd') {
        player.goRight()
        if (!checkHorizontalMoveCollision(-1)) movePosition.x -= background.velocity
    }
    else if (keys.w.pressed) {
        player.goUp()
        if (!checkVerticalMoveCollision()) movePosition.y += background.velocity
    }
    else if (keys.a.pressed) {
        player.goLeft()
        if (!checkHorizontalMoveCollision()) movePosition.x += background.velocity
    }
    else if (keys.s.pressed) {
        player.goDown()
        if (!checkVerticalMoveCollision(-1)) movePosition.y -= background.velocity
    }
    else if (keys.d.pressed) {
        player.goRight()
        if (!checkHorizontalMoveCollision(-1)) movePosition.x -= background.velocity
    } else player.stop()
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