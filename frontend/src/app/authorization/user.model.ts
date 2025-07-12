export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        public firstName?: string,
        public lastName?: string,
        public createdAt?: Date,
        public addresses?: Address[],
        public phoneNumber?: string
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

    get mainAddress(): Address | undefined {
        return this.addresses?.find(addr => addr.main);
    }
}

export interface Address {
    street: string;
    postcode: string;
    city: string;
    country: string;
    phoneNumber: string;
    main: boolean;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  currentPassword?: string;
  newPassword?: string;
}
