import { IProfile, Session } from "@brightside/imperative";
import { ZosConnect } from "@zosconnect/zosconnect-node";
import request = require("request");
import { ZosConnectSession } from "./ZosConnectSession";

export class ConnectionUtil {
    public static getSession(profile: IProfile): ZosConnectSession {
        return new ZosConnectSession(profile.address, profile.user, profile.password);
    }

    public static getConnection(session: ZosConnectSession): ZosConnect {
        const options = {} as request.OptionsWithUri;
        options.uri = session.address;
        if (session.user !== undefined) {
            options.auth = {} as request.AuthOptions;
            options.auth.user = session.user;
            options.auth.pass = session.password;
        }
        return new ZosConnect(options);
    }
}
