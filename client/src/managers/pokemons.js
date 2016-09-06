'use strict';

import { Manager } from './manager';
import { Pokemon } from './../pokemon';

export class PokemonsManager extends Manager {

    constructor () {
        super('pokemons');
    }

    render (ctx) {
        this.collection.forEach(pokemon => {
            pokemon.render(ctx);
        });
    }

    hydrateCollection () {
        this.items.forEach(item => {
            let pokemon = this.collection.find(p => p.id == item.id);

            if (!pokemon) {
                this.collection.push(Pokemon.unserialize(item));
            }
        });
    }

    updateCollection () {
        this.collection.forEach(pokemon => {
            let item = this.items.find(i => i.id == pokemon.id);
            pokemon.x = item.x;
            pokemon.y = item.y;
            pokemon.direction = item.direction;
            pokemon.moving = item.moving;
        });
    }

    step (td) {
        super.step(td);
        this.collection.forEach(el => el.step(td));
    }
}
