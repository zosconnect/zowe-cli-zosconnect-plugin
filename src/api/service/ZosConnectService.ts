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

    public static async start(session: ZosConnectSession, serviceName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const service = await zosConn.getService(serviceName);
        await service.start();
    }

    public static async stop(session: ZosConnectSession, serviceName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const service = await zosConn.getService(serviceName);
        await service.stop();
    }
}
