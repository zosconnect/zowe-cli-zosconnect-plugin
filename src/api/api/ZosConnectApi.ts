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

import { ConnectionUtil } from "../../connection";
import { ZosConnectSession } from "../../ZosConnectSession";
import { Api } from "./Api";

export class ZosConnectApi {
    /**
     * Install a new API into the server from the supplied AAR file.
     *
     * @param session The ZosConnectSession to use for connection information.
     * @param aarFile The AAR file to be installed.
     */
    public static async install(session: ZosConnectSession, aarFile: Buffer): Promise<Api> {
        const zosConn = ConnectionUtil.getConnection(session);
        const api = await zosConn.createApi(aarFile);
        return new Api(api.getApiName(), api.getVersion(), api.getDescription());
    }

    /**
     * Get a list of all the APIs that are installed in the server.
     *
     * @param session The ZosConnectSession to use for connection information.
     */
    public static async list(session: ZosConnectSession): Promise<Api[]> {
        const zosConn = ConnectionUtil.getConnection(session);
        const installedApis = await zosConn.getApis();
        const apis = [];
        for (const api of installedApis) {
            apis.push(new Api(api.getApiName(), api.getVersion(), api.getDescription()));
        }
        return apis;
    }

    /**
     * Delete the named API.
     *
     * @param session The ZosConnectSession to use for connection information.
     * @param apiName The name of the API to delete.
     * @param force Whether the API should be deleted regardless of status.
     */
    public static async delete(session: ZosConnectSession, apiName: string, force: boolean): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const api = await zosConn.getApi(apiName);
        if (force) {
            await api.stop();
        }
        await api.delete();
    }

    /**
     * Update the named API.
     *
     * @param session The ZosConnectSession to use for connection information.
     * @param apiName The name of the API to update.
     * @param aarFile The AAR file containing the updated API information.
     */
    public static async update(session: ZosConnectSession, apiName: string, aarFile: Buffer): Promise<Api> {
        const zosConn = ConnectionUtil.getConnection(session);
        const api = await zosConn.getApi(apiName);
        await api.update(aarFile);
        return new Api(api.getApiName(), api.getVersion(), api.getDescription());
    }

    /**
     * Set an API as Started
     *
     * @param session The ZosConnectSession to use for connection information.
     * @param apiName The name of the API to set as started
     */
    public static async start(session: ZosConnectSession, apiName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const api = await zosConn.getApi(apiName);
        await api.start();
    }

    /**
     * Set an API as Stopped
     *
     * @param session The ZosConnectSession to use for connection information.
     * @param apiName The name of the API to set as stopped.
     */
    public static async stop(session: ZosConnectSession, apiName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const api = await zosConn.getApi(apiName);
        await api.stop();
    }
}
