import { UserDataModel } from './userData.mode';
export class UserModel {
    id: string  = "";
    userName: String = "";
    password: String = "";
    role: String = "";
    userData: UserDataModel = new UserDataModel();
    isActive: Boolean = true;

    constructor(){}
}