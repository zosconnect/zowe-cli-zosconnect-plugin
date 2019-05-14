import { ZosConnect } from "@zosconnect/zosconnect-node";
import { Service } from "@zosconnect/zosconnect-node/lib/Service";
import { ZosConnectService } from "../../../api/service/ZosConnectService";
import { ZosConnectSession } from "../../../ZosConnectSession";

describe("ZosConnectService tests", () => {
    const session = new ZosConnectSession("http://example.com:9080");
    const options = { uri: "http://example.com:9080" };
    const serviceObj = new Service(options, "foo", "bar", "baz");

    it("should install the Service", async () => {
        ZosConnect.prototype.createService = jest.fn().mockReturnValue(serviceObj);
        const service = await ZosConnectService.install(session, Buffer.from("sar"));
        expect(service.name).toEqual("foo");
        expect(service.description).toEqual("bar");
        expect(service.serviceProvider).toEqual("baz");
    });

    it("should delete the Service", async () => {
        ZosConnect.prototype.getService = jest.fn().mockReturnValue(serviceObj);
        serviceObj.stop = jest.fn();
        serviceObj.delete = jest.fn();
        await ZosConnectService.delete(session, "foo", true);
        expect(serviceObj.stop).toBeCalledTimes(1);
        expect(serviceObj.delete).toBeCalledTimes(1);
    });

    it("should not stop the Service before deleting", async () => {
        ZosConnect.prototype.getService = jest.fn().mockReturnValue(serviceObj);
        serviceObj.stop = jest.fn();
        serviceObj.delete = jest.fn();
        await ZosConnectService.delete(session, "foo", false);
        expect(serviceObj.stop).toHaveBeenCalledTimes(0);
        expect(serviceObj.delete).toHaveBeenCalledTimes(1);
    });

    it("should list the Services", async () => {
        ZosConnect.prototype.getServices = jest.fn().mockReturnValue([serviceObj]);
        const services = await ZosConnectService.list(session);
        expect(services).toHaveLength(1);
        expect(services[0].name).toEqual("foo");
        expect(services[0].description).toEqual("bar");
        expect(services[0].serviceProvider).toEqual("baz");
    });

    it("should update the Service", async () => {
        ZosConnect.prototype.getService = jest.fn().mockReturnValue(serviceObj);
        serviceObj.update = jest.fn();
        const service = await ZosConnectService.update(session, "foo", Buffer.from("sar"));
        expect(serviceObj.update).toHaveBeenCalledTimes(1);
        expect(service.name).toEqual("foo");
        expect(service.description).toEqual("bar");
        expect(service.serviceProvider).toEqual("baz");
    });

    it("should stop the Service", async () => {
        ZosConnect.prototype.getService = jest.fn().mockReturnValue(serviceObj);
        serviceObj.stop = jest.fn();
        await ZosConnectService.stop(session, "foo");
        expect(serviceObj.stop).toHaveBeenCalledTimes(1);
    });

    it("should start the Service", async () => {
        ZosConnect.prototype.getService = jest.fn().mockReturnValue(serviceObj);
        serviceObj.start = jest.fn();
        await ZosConnectService.start(session, "foo");
        expect(serviceObj.start).toHaveBeenCalledTimes(1);
    });

    it("should return info on the Service", async () => {
        ZosConnect.prototype.getService = jest.fn().mockReturnValue(serviceObj);
        serviceObj.getServiceInvokeUrl = jest.fn().mockReturnValue("invokeUrl");
        serviceObj.getStatus = jest.fn().mockReturnValue("Started");
        const service = await ZosConnectService.info(session, "foo");
        expect(service.name).toEqual("foo");
        expect(service.description).toEqual("bar");
        expect(service.serviceProvider).toEqual("baz");
        expect(serviceObj.getServiceInvokeUrl).toHaveBeenCalledTimes(1);
        expect(service.invokeUrl).toEqual("invokeUrl");
        expect(serviceObj.getStatus).toHaveBeenCalledTimes(1);
        expect(service.status).toEqual("Started");
    });
});
