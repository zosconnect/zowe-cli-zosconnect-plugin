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
import { Service } from "./Service";

export class ZosConnectService {
    /**
     * Get a list of the Services installed in the server.
     *
     * @param session The session to use for connection information.
     */
    public static async list(session: ZosConnectSession): Promise<Service[]> {
        const zosConn = ConnectionUtil.getConnection(session);
        const services = await zosConn.getServices();
        const resultsObj = [];
        for (const service of services) {
            resultsObj.push(new Service(service.getName(),
                            service.getDescription(),
                            service.getServiceProvider()));
        }
        return resultsObj;
    }

    /**
     * Install a new service into the Server.
     *
     * @param session The session to use for connection information.
     * @param sarFile The SAR file to install.
     */
    public static async install(session: ZosConnectSession, sarFile: Buffer): Promise<Service> {
        const zosConn = ConnectionUtil.getConnection(session);
        const service = await zosConn.createService(sarFile);
        return new Service(service.getName(), service.getDescription(), service.getServiceProvider());
    }

    /**
     * Update the named Service.
     *
     * @param session The Isession to use for connection information.
     * @param serviceName The name of the Service to update.
     * @param sarFile The SAR file containing the new Service information.
     */
    public static async update(session: ZosConnectSession, serviceName: string, sarFile: Buffer): Promise<Service> {
        const zosConn = ConnectionUtil.getConnection(session);
        const service = await zosConn.getService(serviceName);
        await service.update(sarFile);
        return new Service(service.getName(), service.getDescription(), service.getServiceProvider());
    }

    /**
     * Delete the named Service from the server.
     *
     * @param session The Isession to use for connection information.
     * @param serviceName The name of the Service to delete.
     * @param force Whether the Service should be deleted regardless of status.
     */
    public static async delete(session: ZosConnectSession, serviceName: string, force: boolean): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const service = await zosConn.getService(serviceName);
        if (force) {
            await service.stop();
        }
        await service.delete();
    }

    /**
     * Set a Service as Started.
     *
     * @param session The ZosConnectSession to use for connection information.
     * @param serviceName The name of the Service.
     */
    public static async start(session: ZosConnectSession, serviceName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const service = await zosConn.getService(serviceName);
        await service.start();
    }

    /**
     * Set a Service as Stopped.
     *
     * @param session The ZosConnectSession to use for connection information.
     * @param serviceName The name of the Service.
     */
    public static async stop(session: ZosConnectSession, serviceName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const service = await zosConn.getService(serviceName);
        await service.stop();
    }

    /**
     * Get detailed information about a Service.
     *
     * @param session The ZosConnectSession to use for connection information.
     * @param serviceName The name of the Service.
     */
    public static async info(session: ZosConnectSession, serviceName: string): Promise<Service> {
        const zosConn = ConnectionUtil.getConnection(session);
        const service = await zosConn.getService(serviceName);
        return new Service(service.getName(), service.getDescription(), service.getServiceProvider(),
            await service.getServiceInvokeUrl(), await service.getStatus());
    }
}
