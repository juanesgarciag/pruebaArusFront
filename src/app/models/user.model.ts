import { UserDataModel } from './userData.mode';
export class UserModel {
    _id: string  = "";
    userName: String = "";
    password: String = "";
    role: String = "";
    userData: UserDataModel = new UserDataModel();
    isActive: Boolean = true;

    constructor(){}
}