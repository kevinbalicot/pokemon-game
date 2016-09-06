'use strict';

import { Sprite } from './../../bin/sprite';
import { loader } from './../../bin/loader';

export class OtherPlayer extends Sprite {

    constructor(x, y, id, direction, moving) {
        const config = loader.get('player-config');
        const image = loader.get('player-image');

        super(x, y, config.width, config.height, image, config.animations, config.hitbox);

        this.id = id;
        this.moving = moving;
        this.direction = direction;
    }

    step (td) {
        switch (this.direction) {
            case 'top':
                if (this.moving) {
                    this.play('walk_top');
                } else {
                    this.play('stand_top');
                }
                break;
            case 'left':
                if (this.moving) {
                    this.play('walk_left');
                } else {
                    this.play('stand_left');
                }
                break;
            case 'right':
                if (this.moving) {
                    this.play('walk_right');
                } else {
                    this.play('stand_right');
                }
                break;
            default:
            case 'bottom':
                if (this.moving) {
                    this.play('walk_bottom');
                } else {
                    this.play('stand_bottom');
                }
                break;
        }

        super.step(td);
    }

    static unserialize (data) {
        return new OtherPlayer(data.x, data.y, data.id, data.direction, data.moving);
    }
}
