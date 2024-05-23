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

    getLeft() {
        return this.getx() + 4
    }

    getRight() {
        return this.getx() + this.width - 4
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