import Command from '../Command';
import { Configs, MessageInfo, Utils } from '../../main/Utils';

class EvalCommand implements Command {

    constructor(){
        return this;
    }
    //@ts-ignore
    public onCommand(api: WASocket, msg: MessageInfo):void {
        //if (msg.message?.key?.participant != new Configs().config.owner+"@s.whatsapp.net") return;
        try {
            console.log(msg.text.arg)
            eval(`(async()=>{
                try {
                    ${msg.text.arg}
                } catch (e) {
                    console.log(e)
                    api.sendMessage("${msg.data.from}",{text: e.message})
                }
            })()`)
        } catch (error) {
            
        }
    }
    public command(): String {
        return "ex";
    }
    public alias(): Set<string> {
        return new Set<string>(["eval"]);
    }
}

export default EvalCommand;