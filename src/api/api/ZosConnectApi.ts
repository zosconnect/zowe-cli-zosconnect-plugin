import { IProfile } from "@brightside/imperative";
import { ConnectionUtil } from "../../connection";
import { Api } from "./Api";

export class ZosConnectApi {
    public static async install(profile: IProfile, aarFile: Buffer): Promise<Api> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const api = await zosConn.createApi(aarFile);
        return new Api(api.getApiName(), api.getVersion(), api.getDescription());
    }

    public static async list(profile: IProfile): Promise<Api[]> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const installedApis = await zosConn.getApis();
        const apis = [];
        for (const api of installedApis) {
            apis.push(new Api(api.getApiName(), api.getVersion(), api.getDescription()));
        }
        return apis;
    }

    public static async delete(profile: IProfile, apiName: string, force: boolean): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const api = await zosConn.getApi(apiName);
        if (force) {
            await api.stop();
        }
        await api.delete();
    }

    public static async update(profile: IProfile, apiName: string, aarFile: Buffer): Promise<Api> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const api = await zosConn.getApi(apiName);
        await api.update(aarFile);
        return new Api(api.getApiName(), api.getVersion(), api.getDescription());
    }
}
