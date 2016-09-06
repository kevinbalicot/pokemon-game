const ServerApplication = require('./../bin/server/server-application');
const PokemonsManager = require('./src/managers/pokemons');
const PlayersManager = require('./src/managers/players');
const Map = require('./src/map');
const Megastores = require('./../megastores.js/src/server/megastores');

const app = new ServerApplication({
    create: function () {
        this.map = new Map();
        this.playersManager = new PlayersManager();
        this.pokemonsManager = new PokemonsManager(this.playersManager, this.map.platforms, [
            { x: 200, y: 200, id: 1, pokedex: 1, catched: false, action: null, direction: null, currentAction: 0, moving: false, collision: false, hitbox: { x: 16, y: 32, width: 32, height: 32 } },
            { x: 100, y: 200, id: 2, pokedex: 7, catched: false, action: null, direction: null, currentAction: 0, moving: false, collision: false, hitbox: { x: 16, y: 32, width: 32, height: 32 } }
        ]);

        this.megastores = new Megastores();
        this.megastores.attach([this.pokemonsManager, this.playersManager]).listen(8080);

        //this.playersManager.subscribe(state => console.log(state.map(e => `${e.id} : ${e.moving}`)));
        console.log('Running...');
    },

    step (td) {
        this.pokemonsManager.step(td);
        this.playersManager.step(this.megastores.server.clients);
    }
})
