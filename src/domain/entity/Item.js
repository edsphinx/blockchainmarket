//Schema Entity: Item

class Item {
    
    constructor(itemId, userId, price, name) {
        this.itemId = itemId;
        this.userId = userId;
        this.price = price;
        this.name = name;
    }

    static fromArray(a) {
        return new Item(a[0], a[1], a[2], a[3]);
    }

    static fromObject(o) {
        return new Item(o.itemId, o.userId, o.price, o.name);
    }

    toObject() {
        return JSON.parse(JSON.stringify(this));
    }

    toString() {
        return [
            this.itemId,
            this.userId,
            this.price,
            this.name
        ].join(', ');
    }

    itemIdIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.itemId === 'number' &&
                this.itemId >= 0
            );
        } catch(e) {
            console.log(`Error On Id of Item: ${e} BAD:${this.itemId}`);
        }
        return valid;
    }

    userIdIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.userId === 'number' &&
                this.userId >= 0
            );
        } catch(e) {
            console.log(`Error On Id of Item: ${e} BAD:${this.userId}`);
        }
        return valid;
    }

    priceIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.price === 'number' &&
                this.price > 0
            );
        } catch (e) {
            console.log(`Error On Id of Item: ${e} BAD:${this.price}`);
        }
        return valid;
    }

    nameIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.name === 'string' &&
                this.name.length > 0
            );
        } catch(e) {
            console.log(`Error On Id of Item: ${e} BAD:${this.name}`);
        }
        return valid;
    }

    isValid() {
        return (
            this.itemIdIsValid() &&
            this.userIdIsValid() &&
            this.priceIsValid() &&
            this.nameIsValid()
        );
    };
}

export default Item;