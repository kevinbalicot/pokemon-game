'use strict';

import Store from './../../../megastores.js/src/client/store';

export class Manager extends Store {

    constructor (name, init = []) {
        super(name, init);

        this.collection = [];
    }

    indexOf (item) {
        return this.collection.map(el => el.id).indexOf(item.id);
    }

    update (item) {
        let index = this.indexOf(item);
        if (index >= 0) {
            super.update(index, item);
        }
    }

    hydrateCollection () {}

    removeItemsCollection () {}

    updateCollection () {}

    step (td) {
        if (this.collection.length < this.items.length) {
            this.hydrateCollection();
        } else if (this.collection.length > this.items.length) {
            this.removeItemsCollection();
        }

        this.updateCollection();
    }
}
