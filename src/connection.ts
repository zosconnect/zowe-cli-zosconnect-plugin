import { ZosConnect } from "@zosconnect/zosconnect-node";
import { IProfile } from "@brightside/imperative";
import request = require("request");

export class ConnectionUtil {
    static getConnection(profile: IProfile): ZosConnect {
        let options = {} as request.OptionsWithUri;
        options.uri = profile.address;
        if(profile.user !== undefined) {
            options.auth.user = profile.user;
            options.auth.pass = profile.password;
        }
        return new ZosConnect(options);
    }
}