import {ICommandHandler, IHandlerParameters} from "@brightside/imperative";
import {ConnectionUtil} from "../../../connection";

export default class ServiceListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        let zosConn = ConnectionUtil.getConnection(commandParameters.profiles.get('zosconnect'));
        try {
            let services = await zosConn.getServices();
            let resultsObj = [];
            for(const service of services){
                resultsObj.push({name: service.getName(), description: service.getDescription(), provider: service.getServiceProvider()});
                commandParameters.response.console.log(`${service.getName()} - ${service.getDescription()} [${service.getServiceProvider()}]`);
            }
        } catch (error) {
            commandParameters.response.console.error(error);
        }
    }
}