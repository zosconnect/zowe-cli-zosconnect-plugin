import {ICommandHandler, IHandlerParameters} from "@brightside/imperative"
import {ZosConnect} from "./ZosConnect"
import {Api} from "./Api"

export default class ApiListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters) {
        let zosConn = new ZosConnect({uri: commandParameters.profiles.get("zosconnect").address});
        try {
            let apis = await zosConn.getApis();
            let resultsObj = [];
            for(const api of apis){
                resultsObj.push({name: api.getApiName(), version: api.getVersion(), description: api.getDescription()});
                commandParameters.response.console.log(`${api.getApiName()}(${api.getVersion()}) - ${api.getDescription()}`);
            }
            
            commandParameters.response.data.setObj(resultsObj);
        } catch (error) {
            commandParameters.response.console.error(error);
        }
    }
}