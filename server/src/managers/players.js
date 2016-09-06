'use strict';

const Manager = require('./manager');

class PlayersManager extends Manager {

    constructor () {
        super('players');
    }

    step (clients) {
        this.items.forEach(player => {
            if (!clients[player.id]) {
                this.remove(player);
            }
        });
    }
}

module.exports = PlayersManager;
