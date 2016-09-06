'use strict';

import { Container } from './../../bin/container';
import { Model } from './../../bin/model';
import { Tileset } from './../../bin/tileset';
import { loader } from './../../bin/loader';

export class Map extends Container {

    constructor () {
        super();

        const config = loader.get('map-config');

        this.width = config.width * config.tileWidth;
        this.height = config.height * config.tileHeight;
        this.tileWidth = config.tileWidth;
        this.tileHeight = config.tileHeight;
        this.layouts = config.layouts;
        this.walls = config.walls
        this.tileset = new Tileset(0, 0, this.tileWidth, this.tileHeight, loader.get('tileset-image'));
        this.platforms = [];
        this.init = false;
    }

    render () {
        let x, y;
        this.layouts.forEach(layout => {
            x = 0;
            y = 0;

            layout.tiles.forEach(row => {
                row.forEach(column => {
                    this.drawTile(column, x, y);
                    if (this.walls[y][x] === 1 && !this.init) {
                        let platform = new Model(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
                        this.platforms.push(platform);
                    }
                    x++;
                });
                y++;
                x = 0;
            });

            this.init = true;
        });
    }

    drawTile (id, x, y) {
        x *= this.tileWidth;
        y *= this.tileHeight;

        this.tileset.x = x;
        this.tileset.y = y;

        this.tileset.render(id, this.ctx);
    }
}
