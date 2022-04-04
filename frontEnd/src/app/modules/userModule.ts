export class UserModule {

    constructor(
        public fullName: string,
        public shortName: string,
        public mobileNumber: string,
        public email: string,
        public address: string,
        public password: string,
        public userRole: string,
        public route: string,
        
    ){}
}