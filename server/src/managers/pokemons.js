'use strict';

const Manager = require('./manager');
const config = require('./../../config/pokemons.json');

class PokemonsManager extends Manager {

    constructor (playersManager, platforms, init = []) {
        super('pokemons', init);
        this.timer = 0;
        this.platforms = platforms;
        this.playersManager = playersManager;
    }

    routine (pokemon, td) {
        this.timer += td;

        if (this.timer > 1) {
            const routine = config[pokemon.pokedex].routine;

            pokemon.action = routine[pokemon.currentAction];
            pokemon.currentAction++;

            if (pokemon.currentAction >= routine.length) {
                pokemon.currentAction = 0;
            }

            this.timer = 0;
        }
    }

    move (pokemon, td) {
        switch (pokemon.action) {
            case 'top':
                pokemon.direction = 'top';
                pokemon.y -= 100 * td;
                pokemon.moving = true;
                break;
            case 'left':
                pokemon.direction = 'left';
                pokemon.x -= 100 * td;
                pokemon.moving = true;
                break;
            case 'right':
                pokemon.direction = 'right';
                pokemon.x += 100 * td;
                pokemon.moving = true;
                break;
            case 'bottom':
                pokemon.direction = 'bottom';
                pokemon.y += 100 * td;
                pokemon.moving = true;
                break;
            default:
                pokemon.moving = false;
        }
    }

    step (td) {
        this.items.forEach(pokemon => {
            this.routine(pokemon, td);

            pokemon.collision = false;
            if (this.checkCollision(pokemon, td)) {
                pokemon.collision = true;
            }

            pokemon.moving = false;
            if (!pokemon.collision) {
                this.move(pokemon, td);
            }

            this.update(pokemon);
        });
    }

    checkCollision (pokemon, td) {
        let otherPokemons = this.items.find(i => i.id !== pokemon.id) || [];
        otherPokemons = [].concat(otherPokemons).map(i => this.getHitbox(i));

        let clone = Object.assign({}, pokemon);
        this.move(clone, td);

        let hasCollisionWithPlatforms = this.hasCollision(this.getHitbox(clone), this.platforms);
        let hasCollisionWithPlayers = this.hasCollision(this.getHitbox(clone), this.playersManager.items.map(player => this.getHitbox(player)));
        let hasCollisionWithPokemons = this.hasCollision(this.getHitbox(clone), otherPokemons);

        return hasCollisionWithPlatforms || hasCollisionWithPokemons || hasCollisionWithPlayers;
    }

    hasCollision (hitbox, hitboxes) {

        if (!Array.isArray(hitboxes)) {
            hitboxes = [hitboxes];
        }

        let rect;
        for (let i = 0; i < hitboxes.length; i++) {
            rect = hitboxes[i];

            if (hitbox.x < rect.x + rect.width &&
                hitbox.x + rect.width > rect.x &&
                hitbox.y < rect.y + rect.height &&
                hitbox.height + hitbox.y > rect.y
            ) {
                return true;
            }
        }

        return false;
    }

    getHitbox (pokemon) {
        return {
            x: pokemon.x + pokemon.hitbox.x,
            y: pokemon.y + pokemon.hitbox.y,
            width: pokemon.hitbox.width,
            height: pokemon.hitbox.height
        }
    }
}

module.exports = PokemonsManager;
