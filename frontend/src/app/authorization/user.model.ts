export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        public firstName?: string,
        public lastName?: string,
        public createdAt?: Date
        ) {}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    get fullName() {
        return `${this.firstName || ''} ${this.lastName || ''}`.trim();
    }
}
