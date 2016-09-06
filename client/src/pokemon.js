'use strict';

import { Sprite } from './../../bin/sprite';
import { loader } from './../../bin/loader';

export class Pokemon extends Sprite {

    constructor (x, y, id, pokedex, direction, moving) {

        const image = loader.get(`pokemon-${pokedex}`);
        const config = loader.get('pokemons-config');

        super(x, y, config.width, config.height, image, config.animations, config.hitbox);

        this.id = id;
        this.pokedex = pokedex;
        this.direction = direction;
        this.moving = moving;
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
        return new Pokemon(data.x, data.y, data.id, data.pokedex, data.direction, data.moving);
    }
}
