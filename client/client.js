'use strict';

import Megastores from './../megastores.js/src/client/megastores';
import { Application } from './../bin/application';
import { CollisionChecker } from './../bin/helper/collision-checker';
import { PokemonsManager } from './src/managers/pokemons';
import { PlayersManager } from './src/managers/players';
import { Map } from './src/map';
import { Player } from './src/player';

var homeLayer = {
    create: function () {
        this.map = new Map();
        this.player = new Player(80, 80);
        this.pokemonsManager = new PokemonsManager();
        this.playersManager = new PlayersManager(this.player);
        this.megastores = new Megastores();
        this.playerCollisionChecker = new CollisionChecker();

        this.megastores.attach([this.pokemonsManager, this.playersManager]).connect('http://localhost', 8080).on('open', () => {
            this.player.id = this.megastores.connection.id;
            setTimeout(() => this.playersManager.put(this.player.serialize()), 1000);
        });
    },

    step: function (td) {
        this.playerCollisionChecker.clear();
        this.player.collision = false;

        this.playerCollisionChecker.add(this.player, this.map.platforms, player => player.collision = true);
        this.playerCollisionChecker.add(this.player, this.pokemonsManager.collection, player => player.collision = true);

        this.playerCollisionChecker.check(td);
        this.playersManager.step(td);

        if (!this.player.collision) {
            this.player.step(td);
        }
        this.playersManager.updatePlayer();

        this.pokemonsManager.step(td);
    },

    render: function () {
        this.clearLayer();

        this.map.render();
        this.ctx.drawImage(this.map.canvas, 0, 0);

        this.pokemonsManager.render(this.ctx);
        this.playersManager.render(this.ctx);
        this.player.render();

        //this.debug(this.player);
        //this.debug(this.pokemonsManager.collection);
    }
};

var app = new Application({
    debug: true,

    create: function () {
        this.loader.add('images/pokemons/1.png', 'pokemon-1');
        this.loader.add('images/pokemons/7.png', 'pokemon-7');
        this.loader.add('images/tileset.png', 'tileset-image');
        this.loader.add('images/player.png', 'player-image');
        this.loader.add('client/config/pokemons.json', 'pokemons-config', 'json');
        this.loader.add('client/config/map.json', 'map-config', 'json');
        this.loader.add('client/config/player.json', 'player-config', 'json');
    },

    ready: function () {
        this.addLayer(homeLayer, 'home');
    }
});
