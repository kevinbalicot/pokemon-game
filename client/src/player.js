'use strict';

import { Sprite } from './../../bin/sprite';
import { KEY_UP, KEY_LEFT, KEY_RIGHT, KEY_DOWN, KEY_SPACE } from './../../bin/keyboard';
import { EventEmitter } from './../../bin/event-emitter';
import { loader } from './../../bin/loader';

export class Player extends Sprite {

   constructor (x, y, id = null) {
        const config = loader.get('player-config');
        const image = loader.get('player-image');

        super(x, y, config.width, config.height, image, config.animations, config.hitbox);

        this.id = id;
        this.event = new EventEmitter();
        this.moving = false;
        this.direction = 'bottom';
        this.play('stand');
   }

   step (td) {
       if (this.parent.keyboard[KEY_UP]) {
           this.play('walk_top');
           this.direction = 'top';
           this.moving = true;
       } else if (this.parent.keyboard[KEY_DOWN]) {
           this.play('walk_bottom');
           this.direction = 'bottom';
           this.moving = true;
       } else if (this.parent.keyboard[KEY_LEFT]) {
           this.play('walk_left');
           this.direction = 'left';
           this.moving = true;
       } else if (this.parent.keyboard[KEY_RIGHT]) {
           this.play('walk_right');
           this.direction = 'right';
           this.moving = true;
       } else {
           this.stand();
       }

       this.move(td);
       super.step(td);
   }

   move (td) {
        if (this.moving) {
            switch (this.direction) {
                case 'top':
                    this.y -= 100 * td;
                    break;
                case 'left':
                    this.x -= 100 * td;
                    break;
                case 'right':
                    this.x += 100 * td;
                    break;
                case 'bottom':
                    this.y += 100 * td;
                    break;
            }
        }
    }

    stand () {
        this.moving = false;
        switch (this.direction) {
            case 'top':
                this.play('stand_top');
                break;
            case 'left':
                this.play('stand_left');
                break;
            case 'right':
                this.play('stand_right');
                break;
            default:
            case 'bottom':
                this.play('stand_bottom');
                break;
        }
    }

   /*handleActions () {
       if (this.parent.keyboard[KEY_SPACE] && !this.shooting) {
           this.shooting = true;

           this.event.dispatch('shoot', this);
           setTimeout(() => this.shooting = false, 2000);
       }
   }

   on (event, callback) {
       this.event.on(event, callback);
   }*/

   serialize () {
       const config = loader.get('player-config');
       return {
           id: this.id,
           x: this.x,
           y: this.y,
           width: config.width,
           height: config.height,
           hitbox: {
               x: config.hitbox.x,
               y: config.hitbox.y,
               width: config.hitbox.width,
               height: config.hitbox.height
           },
           direction: this.direction,
           moving: this.moving
       };
   }

   static unserialize (data) {
       return new Player(data.x, data.y, data.id);
   }
}
