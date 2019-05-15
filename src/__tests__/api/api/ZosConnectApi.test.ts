import { ZosConnect } from "@zosconnect/zosconnect-node";
import { Api } from "@zosconnect/zosconnect-node/lib/Api";
import {ZosConnectApi} from "../../../api/api/ZosConnectApi";
import { ZosConnectSession } from "../../../ZosConnectSession";

jest.mock("@zosconnect/zosconnect-node");

describe("ZosConnectApi tests", () => {
    const session = new ZosConnectSession("http://example.com:9080");
    const options = { uri: "http://example.com:9080" };
    const apiObj = new Api(options, "foo", "bar", "baz");

    it("should install the API", async () => {
        ZosConnect.prototype.createApi = jest.fn().mockReturnValue(apiObj);
        const api = await ZosConnectApi.install(session, Buffer.from("aar"));
        expect(api.name).toEqual("foo");
        expect(api.description).toEqual("baz");
        expect(api.version).toEqual("bar");
    });

    it("should list the APIs", async () => {
        ZosConnect.prototype.getApis = jest.fn().mockReturnValue([apiObj]);
        const apis = await ZosConnectApi.list(session);
        expect(apis).toHaveLength(1);
        expect(apis[0].name).toEqual("foo");
        expect(apis[0].version).toEqual("bar");
        expect(apis[0].description).toEqual("baz");
    });

    it("should update the API", async () => {
        ZosConnect.prototype.getApi = jest.fn().mockReturnValue(apiObj);
        apiObj.update = jest.fn();
        const api = await ZosConnectApi.update(session, "foo", Buffer.from("aar"));
        expect(apiObj.update).toBeCalledTimes(1);
        expect(api.name).toEqual("foo");
        expect(api.version).toEqual("bar");
        expect(api.description).toEqual("baz");
    });

    it("should delete the API", async () => {
        ZosConnect.prototype.getApi = jest.fn().mockReturnValue(apiObj);
        apiObj.stop = jest.fn();
        apiObj.delete = jest.fn();
        await ZosConnectApi.delete(session, "foo", true);
        expect(apiObj.stop).toBeCalledTimes(1);
        expect(apiObj.delete).toBeCalledTimes(1);
    });

    it("should delete the API without stopping", async () => {
        ZosConnect.prototype.getApi = jest.fn().mockReturnValue(apiObj);
        apiObj.stop = jest.fn();
        apiObj.delete = jest.fn();
        await ZosConnectApi.delete(session, "foo", false);
        expect(apiObj.stop).toBeCalledTimes(0);
        expect(apiObj.delete).toBeCalledTimes(1);
    });

    it("should stop the API", async () => {
        ZosConnect.prototype.getApi = jest.fn().mockReturnValue(apiObj);
        apiObj.stop = jest.fn();
        await ZosConnectApi.stop(session, "foo");
        expect(apiObj.stop).toBeCalledTimes(1);
    });

    it("should start the API", async () => {
        ZosConnect.prototype.getApi = jest.fn().mockReturnValue(apiObj);
        apiObj.start = jest.fn();

        await ZosConnectApi.start(session, "foo");
        expect(apiObj.start).toBeCalledTimes(1);
    });

    it("should return the API info", async () => {
        ZosConnect.prototype.getApi = jest.fn().mockReturnValue(apiObj);
        apiObj.getServices = jest.fn().mockReturnValue(["serviceFoo"]);
        apiObj.getStatus = jest.fn().mockReturnValue("Started");
        const api = await ZosConnectApi.info(session, "foo");
        expect(api.name).toEqual("foo");
        expect(api.version).toEqual("bar");
        expect(api.description).toEqual("baz");
        expect(api.services).toBeDefined();
        expect(api.services).toHaveLength(1);
        expect(api.services[0]).toEqual("serviceFoo");
        expect(api.status).toBeDefined();
        expect(api.status).toEqual("Started");
    });
});
