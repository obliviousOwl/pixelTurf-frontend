export default class Player {
    constructor(scene, x, y, id){
        this.scene = scene;
        this.id = id;
        this.sprite = scene.add.circle(x, y, 20, 0xffffff);
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setCollideWorldBounds(true);
        this.sprite.body.setCircle(10);
    }

    get position() {
        return {
            x: this.sprite.body.x + this.sprite.body.halfWidth,
            y: this.sprite.body.y + this.sprite.body.halfHeight
        };
    }

    setVelocity(x, y){
        if (this.sprite.body) {
            this.sprite.body.setVelocity(x, y);
        }
    }


}
