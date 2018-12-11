import { IProfile } from "@brightside/imperative";
import { ConnectionUtil } from "../../connection";
import { Service } from "./Service";

export class ZosConnectService {
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

    public static async create(profile: IProfile, sarFile: Buffer): Promise<Service> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const service = await zosConn.createService(sarFile);
        return new Service(service.getName(), service.getDescription(), service.getServiceProvider());
    }

    public static async update(profile: IProfile, serviceName: string, sarFile: Buffer): Promise<Service> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const service = await zosConn.getService(serviceName);
        await service.update(sarFile);
        return new Service(service.getName(), service.getDescription(), service.getServiceProvider());
    }

    public static async delete(profile: IProfile, serviceName: string, force: boolean): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const service = await zosConn.getService(serviceName);
        if (force) {
            service.stop();
        }
        await service.delete();
    }
}
