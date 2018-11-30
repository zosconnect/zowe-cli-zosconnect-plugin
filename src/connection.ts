import { IProfile } from "@brightside/imperative";
import { ZosConnect } from "@zosconnect/zosconnect-node";
import request = require("request");

export class ConnectionUtil {
    public static getConnection(profile: IProfile): ZosConnect {
        const options = {} as request.OptionsWithUri;
        options.uri = profile.address;
        if (profile.user !== undefined) {
            options.auth.user = profile.user;
            options.auth.pass = profile.password;
        }
        return new ZosConnect(options);
    }
}
