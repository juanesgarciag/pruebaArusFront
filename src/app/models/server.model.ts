import { UserModel } from './user.model';
export class ServerModel {

    _id: string = "";
    serverName: string = "";
    serverCapacity: Number = 0;
    serverActuall: Number = 0
    serverIp: string = "";
    serverOverloadAlert: Number = 0;
    userAssociated: string = "";
;
    constructor() {}
}