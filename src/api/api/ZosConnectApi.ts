import { IProfile } from "@brightside/imperative";
import { ConnectionUtil } from "../../connection";
import { Api } from "./Api";

export class ZosConnectApi {
    /**
     * Install a new API into the server from the supplied AAR file.
     *
     * @param profile The IProfile to use for connection information.
     * @param aarFile The AAR file to be installed.
     */
    public static async install(profile: IProfile, aarFile: Buffer): Promise<Api> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const api = await zosConn.createApi(aarFile);
        return new Api(api.getApiName(), api.getVersion(), api.getDescription());
    }

    /**
     * Get a list of all the APIs that are installed in the server.
     *
     * @param profile The IProfile to use for connection information.
     */
    public static async list(profile: IProfile): Promise<Api[]> {
        const zosConn = ConnectionUtil.getConnection(profile);
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
     * @param profile The IProfile to use for connection information.
     * @param apiName The name of the API to delete.
     * @param force Whether the API should be deleted regardless of status.
     */
    public static async delete(profile: IProfile, apiName: string, force: boolean): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const api = await zosConn.getApi(apiName);
        if (force) {
            await api.stop();
        }
        await api.delete();
    }

    /**
     * Update the named API.
     *
     * @param profile The IProfile to use for connection information.
     * @param apiName The name of the API to update.
     * @param aarFile The AAR file containing the updated API information.
     */
    public static async update(profile: IProfile, apiName: string, aarFile: Buffer): Promise<Api> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const api = await zosConn.getApi(apiName);
        await api.update(aarFile);
        return new Api(api.getApiName(), api.getVersion(), api.getDescription());
    }
}
