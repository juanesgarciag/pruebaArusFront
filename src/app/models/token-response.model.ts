import { UserModel } from './user.model';
export class TokenResponseModel {
    user: UserModel = new UserModel();
    tokenJWT: String = "";

    constructor(){}
}