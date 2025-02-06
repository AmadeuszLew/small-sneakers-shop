export class User{
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date
        ){}

    get token(){// ggetter is a property that can run some code when u try to acces this prop//not a setter
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}
