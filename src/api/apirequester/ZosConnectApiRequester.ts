import { ConnectionUtil } from "../../connection";
import { ZosConnectSession } from "../../ZosConnectSession";
import { ApiRequester } from "./ApiRequester";

export class ZosConnectApiRequester {
    public static async install(session: ZosConnectSession, araFile: Buffer): Promise<ApiRequester> {
        const zosConn = ConnectionUtil.getConnection(session);
        const apiRequester = await zosConn.createApiRequester(araFile);
        return new ApiRequester(apiRequester.getName(), apiRequester.getVersion(), apiRequester.getDescription());
    }

    public static async list(session: ZosConnectSession): Promise<ApiRequester[]> {
        const zosConn = ConnectionUtil.getConnection(session);
        const installedApiRequesters = await zosConn.getApiRequesters();
        const apiRequesters = [];
        for (const apiRequester of installedApiRequesters) {
            apiRequesters.push(new ApiRequester(apiRequester.getName(), apiRequester.getVersion(),
                apiRequester.getDescription()));
        }
        return apiRequesters;
    }

    public static async delete(session: ZosConnectSession, apiRequesterName: string, force: boolean) {
        const zosConn = ConnectionUtil.getConnection(session);
        const apiRequester = await zosConn.getApiRequester(apiRequesterName);
        if (force) {
            await apiRequester.stop();
        }
        await apiRequester.delete();
    }

    public static async update(session: ZosConnectSession, apiRequesterName: string,
                               araFile: Buffer): Promise<ApiRequester> {
        const zosConn = ConnectionUtil.getConnection(session);
        const apiRequester = await zosConn.getApiRequester(apiRequesterName);
        await apiRequester.update(araFile);
        return new ApiRequester(apiRequester.getName(), apiRequester.getVersion(), apiRequester.getDescription());
    }

    public static async start(session: ZosConnectSession, apiRequsterName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const apiRequester = await zosConn.getApiRequester(apiRequsterName);
        await apiRequester.start();
    }

    public static async stop(session: ZosConnectSession, apiRequesterName: string): Promise<void> {
        const zosConn = ConnectionUtil.getConnection(session);
        const apiRequester = await zosConn.getApiRequester(apiRequesterName);
        await apiRequester.stop();
    }
}
