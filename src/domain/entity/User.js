//Schema Entity: User
class User {

    constructor (userId, userAddr, userName) {
        this.userId = userId;
        this.userAddr = userAddr;
        this.userName = userName;
    }

    static fromArray(a) {
        return new User(a[0], a[1], a[3]);
    }

    static fromObject(o) {
        return new User(o.userId, o.userAddr, o.userName);
    }

    toObject() {
        return JSON.parse(JSON.stringify(this));
    }

    toString() {
        return [
            this.userId,
            this.userAddr,
            this.userName
        ].join(', ');
    }

    addressIsValid() {
        let valid = false;
        let regex = RegExp(/^0x[a-fA-F0-9]{40}$/);
        try {
            valid = (
                typeof this.userAddr === 'string' && 
                regex.test(this.userAddr)
            );
        } catch (e) {
            console.log(`Error On Address of User: ${e} BAD:${this.userAddr}`);
        }
        return valid;
    };

    userIdIsValid() {
        let valid = false;
        try {
            valid = (
                typeof this.userId === 'number' &&
                this.userId >= 0
            );
        } catch (e) {
            console.log(`Error On Id of User: ${e} BAD:${this.userId}`);
        }
        return valid;
    }

    userNameIsValid() {
        let valid = false;
        try  {
            valid = (
                typeof this.userName === 'string' &&
                this.userName.length > 0
            );
        } catch(e) {
            console.log(`Error On Id of User: ${e} BAD:${this.userName}`);
        }
        return valid;
    }

    isValid() {
        return (
            this.addressIsValid() &&
            this.userIdIsValid() &&
            this.userNameIsValid()
        );
    };
}

export default User;