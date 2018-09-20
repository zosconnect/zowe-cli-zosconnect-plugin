import {ICommandHandler, IHandlerParameters} from "@brightside/imperative"
import {ZosConnect} from "./ZosConnect"

export default class ApiListHandler implements ICommandHandler {
    public async process(commandParameters: IHandlerParameters) {
        let zosConn = new ZosConnect({uri: 'http://winmvs3s.hursley.ibm.com:10112'});
        try {
            let apis = await zosConn.getApis();
            
            commandParameters.response.data.setObj(apis);
            commandParameters.response.console.log(apis.join('\n'));
        } catch (error) {
            commandParameters.response.console.error(error);
        }
    }
}