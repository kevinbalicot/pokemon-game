'use strict';

const Store = require('./../../../megastores.js/src/server/store');

class Manager extends Store {

    constructor (name, init = []) {
        super(name, init);
    }

    indexOf (item) {
        return this.items.map(el => el.id).indexOf(item.id);
    }

    update (item) {
        let index = this.indexOf(item);
        if (index >= 0) {
            super.update(index, item);
        }
    }

    remove (item) {
        let index = this.indexOf(item);
        if (index >= 0) {
            super.remove(index, item);
        }
    }
}

module.exports = Manager;
