import {ICommandHandler, IHandlerParameters} from "@brightside/imperative"
import {ZosConnect} from "@zosconnect/zosconnect-node"
import { ConnectionUtil } from "../../../connection";

export default class ApiListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters): Promise<void> {
        let zosConn = ConnectionUtil.getConnection(commandParameters.profiles.get("zosconnect"));
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