/*
 *  This program and the accompanying materials are made available under the terms of the
 *  Eclipse Public License v2.0 which accompanies this distribution, and is available at
 *  https://www.eclipse.org/legal/epl-v20.html
 *
 *  SPDX-License-Identifier: EPL-2.0
 *
 *  Copyright IBM 2019
 *
 */

import { ZosConnect } from "@zosconnect/zosconnect-node";
import { RequestOptions } from "https";
import { ZosConnectSession } from "./ZosConnectSession";

export class ConnectionUtil {
    public static getConnection(session: ZosConnectSession): ZosConnect {
        const options = {} as RequestOptions;
        options.rejectUnauthorized = session.rejectUnauthorized;
        if (session.user !== undefined) {
            options.auth = session.user + ":" + session.password;
        }
        return new ZosConnect(session.address, options);
    }
}
