import { IProfile } from "@brightside/imperative";
import { ConnectionUtil } from "../../connection";
import { Service } from "./Service";

export class ZosConnectService {
    /**
     * Get a list of the Services installed in the server.
     *
     * @param profile The IProfile to use for connection information.
     */
    public static async list(profile: IProfile): Promise<Service[]> {
        const zosConn = ConnectionUtil.getConnection(profile);
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
     * @param profile The IProfile to use for connection information.
     * @param sarFile The SAR file to install.
     */
    public static async install(profile: IProfile, sarFile: Buffer): Promise<Service> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const service = await zosConn.createService(sarFile);
        return new Service(service.getName(), service.getDescription(), service.getServiceProvider());
    }

    /**
     * Update the named Service.
     *
     * @param profile The IProfile to use for connection information.
     * @param serviceName The name of the Service to update.
     * @param sarFile The SAR file containing the new Service information.
     */
    public static async update(profile: IProfile, serviceName: string, sarFile: Buffer): Promise<Service> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const service = await zosConn.getService(serviceName);
        await service.update(sarFile);
        return new Service(service.getName(), service.getDescription(), service.getServiceProvider());
    }

    /**
     * Delete the named Service from the server.
     *
     * @param profile The IProfile to use for connection information.
     * @param serviceName The name of the Service to delete.
     * @param force Whether the Service should be deleted regardless of status.
     */
    public static async delete(profile: IProfile, serviceName: string, force: boolean): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const service = await zosConn.getService(serviceName);
        if (force) {
            service.stop();
        }
        await service.delete();
    }
}
