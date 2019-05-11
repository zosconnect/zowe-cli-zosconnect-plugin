import { ZosConnect } from "@zosconnect/zosconnect-node";
import { ApiRequester } from "@zosconnect/zosconnect-node/lib/ApiRequester";
import { ZosConnectApiRequester } from "../../../api/apirequester/ZosConnectApiRequester";
import { ZosConnectSession } from "../../../ZosConnectSession";

describe("ZosConnectApiRequester tests", () => {
    const session = new ZosConnectSession("http://example.com:9080");
    const options = { uri: "http://example.com:9080" };
    const apiRequesterObj = new ApiRequester(options, "foo", "bar", "baz", "conn", "started");

    it("should install the API Requester", async () => {
        ZosConnect.prototype.createApiRequester = jest.fn().mockReturnValue(apiRequesterObj);
        const apiRequester = await ZosConnectApiRequester.install(session, Buffer.from("ara"));
        expect(apiRequester.name).toEqual("foo");
        expect(apiRequester.version).toEqual("bar");
        expect(apiRequester.description).toEqual("baz");
    });

    it("should list the API Requesters", async () => {
        ZosConnect.prototype.getApiRequesters = jest.fn().mockReturnValue([apiRequesterObj]);
        const apiRequesters = await ZosConnectApiRequester.list(session);
        expect(apiRequesters).toHaveLength(1);
        expect(apiRequesters[0].name).toEqual("foo");
        expect(apiRequesters[0].version).toEqual("bar");
        expect(apiRequesters[0].description).toEqual("baz");
    });

    it("should update the API Requester", async () => {
        ZosConnect.prototype.getApiRequester = jest.fn().mockReturnValue(apiRequesterObj);
        apiRequesterObj.update = jest.fn();
        const apiRequester = await ZosConnectApiRequester.update(session, "foo", Buffer.from("ara"));
        expect(apiRequesterObj.update).toHaveBeenCalledTimes(1);
        expect(apiRequester.name).toEqual("foo");
        expect(apiRequester.version).toEqual("bar");
        expect(apiRequester.description).toEqual("baz");
    });

    it("should delete the API Requester", async () => {
        ZosConnect.prototype.getApiRequester = jest.fn().mockReturnValue(apiRequesterObj);
        apiRequesterObj.stop = jest.fn();
        apiRequesterObj.delete = jest.fn();
        await ZosConnectApiRequester.delete(session, "foo", true);
        expect(apiRequesterObj.stop).toHaveBeenCalledTimes(1);
        expect(apiRequesterObj.delete).toHaveBeenCalledTimes(1);
    });

    it("should delete the API Requester without stopping", async () => {
        ZosConnect.prototype.getApiRequester = jest.fn().mockReturnValue(apiRequesterObj);
        apiRequesterObj.stop = jest.fn();
        apiRequesterObj.delete = jest.fn();
        await ZosConnectApiRequester.delete(session, "foo", false);
        expect(apiRequesterObj.stop).toHaveBeenCalledTimes(0);
        expect(apiRequesterObj.delete).toHaveBeenCalledTimes(1);
    });

    it("should stop the API Requester", async () => {
        ZosConnect.prototype.getApiRequester = jest.fn().mockReturnValue(apiRequesterObj);
        apiRequesterObj.stop = jest.fn();
        await ZosConnectApiRequester.stop(session, "foo");
        expect(apiRequesterObj.stop).toHaveBeenCalledTimes(1);
    });

    it("should start the API Requester", async () => {
        ZosConnect.prototype.getApiRequester = jest.fn().mockReturnValue(apiRequesterObj);
        apiRequesterObj.start = jest.fn();
        await ZosConnectApiRequester.start(session, "foo");
        expect(apiRequesterObj.start).toHaveBeenCalledTimes(1);
    });
});
