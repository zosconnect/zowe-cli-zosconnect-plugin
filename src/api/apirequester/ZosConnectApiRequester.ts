import { IProfile } from "@brightside/imperative";
import { ConnectionUtil } from "../../connection";
import { ApiRequester } from "./ApiRequester";

export class ZosConnectApiRequester {
    public static async install(profile: IProfile, araFile: Buffer): Promise<ApiRequester> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const apiRequester = await zosConn.createApiRequester(araFile);
        return new ApiRequester(apiRequester.getName(), apiRequester.getVersion(), apiRequester.getDescription());
    }

    public static async list(profile: IProfile): Promise<ApiRequester[]> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const installedApiRequesters = await zosConn.getApiRequesters();
        const apiRequesters = [];
        for (const apiRequester of installedApiRequesters) {
            apiRequesters.push(new ApiRequester(apiRequester.getName(), apiRequester.getVersion(),
                apiRequester.getDescription()));
        }
        return apiRequesters;
    }

    public static async delete(profile: IProfile, apiRequesterName: string, force: boolean) {
        const zosConn = ConnectionUtil.getConnection(profile);
        const apiRequester = await zosConn.getApiRequester(apiRequesterName);
        if (force) {
            await apiRequester.stop();
        }
        await apiRequester.delete();
    }

    public static async update(profile: IProfile, apiRequesterName: string, araFile: Buffer): Promise<ApiRequester> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const apiRequester = await zosConn.getApiRequester(apiRequesterName);
        await apiRequester.update(araFile);
        return new ApiRequester(apiRequester.getName(), apiRequester.getVersion(), apiRequester.getDescription());
    }

    public static async start(profile: IProfile, apiRequsterName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const apiRequester = await zosConn.getApiRequester(apiRequsterName);
        await apiRequester.start();
    }

    public static async stop(profile: IProfile, apiRequesterName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(profile);
        const apiRequester = await zosConn.getApiRequester(apiRequesterName);
        await apiRequester.stop();
    }
}
