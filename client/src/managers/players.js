'use strict';

import Store from './../../../megastores.js/src/client/store';
import { Player } from './../player';
import { OtherPlayer } from './../other-player';

export class PlayersManager extends Store {

    constructor (player) {
        super('players');
        this.player = player;
        this.collection = [];
    }

    indexOf (item) {
        for (let i = 0; i < this.items.length; i++) {
            if (item.id == this.items[i].id) {
                return i;
            }
        }

        return -1;
    }

    update (item) {
        let index = this.indexOf(item);
        if (index >= 0) {
            super.update(index, item);
        }
    }

    hydrateCollection () {
        this.items.forEach(item => {
            let player = this.collection.find(p => p.id == item.id);

            if (!player) {
                if (this.player.id == item.id) {
                    this.collection.push(Player.unserialize(item));
                } else {
                    this.collection.push(OtherPlayer.unserialize(item));
                }
            }
        });
    }

    removeItemsCollection () {
        this.collection.forEach((item, index) => {
            let player = this.items.find(p => p.id == item.id);

            if (!player) {
                this.collection.splice(index, 1);
            }
        });
    }

    updatePlayer () {
        let player = this.items.find(i => i.id == this.player.id);
        if (!!player) {
            player.x = this.player.x;
            player.y = this.player.y;
            player.moving = this.player.moving;
            player.direction = this.player.direction;

            this.update(player);
        }
    }

    updateCollection () {
        this.collection.forEach(player => {
            if (player instanceof OtherPlayer) {
                let item = this.items.find(i => i.id == player.id);
                player.x = item.x;
                player.y = item.y;
                player.direction = item.direction;
                player.moving = item.moving;
            }
        });
    }

    step (td) {
        if (this.collection.length < this.items.length) {
            this.hydrateCollection();
        } else if (this.collection.length > this.items.length) {
            this.removeItemsCollection();
        }

        this.updateCollection();

        this.collection.forEach(player => {
            if (player instanceof OtherPlayer) {
                player.step(td);
            }
        });
    }

    render (ctx) {
        this.collection.forEach(player => {
            if (player instanceof OtherPlayer) {
                player.render(ctx);
            }
        });
    }
}
