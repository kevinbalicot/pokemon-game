'use strict';

const config = require('./../config/map');

class Map {

    constructor () {
        this.platforms = [];

        let x = 0;
        let y = 0;
        config.walls.forEach(row => {
            row.forEach(column => {
                if (column == 1) {
                    this.platforms.push({ x: x * config.tileWidth, y: y * config.tileHeight, width: config.tileWidth, height: config.tileHeight });
                }
                x++;
            });
            y++;
            x = 0;
        });
    }
}

module.exports = Map;
