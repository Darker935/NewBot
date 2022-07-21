import Command from '../commands/Command';
import IWebMessageInfo from "@adiwajshing/baileys"
import { MessageInfo } from '../main/Utils';

class PingCommand implements Command {

    constructor(){
        return this;
    }
    //@ts-ignore
    public onCommand(api: any, message: MessageInfo):void {
        console.log(message)
        api.sendMessage(message.message.key.remoteJid,{text: JSON.stringify(message,null,"\t")})
    }
    public command(): String {
        return "ping";
    }
    public alias(): Set<string> {
        return new Set<string>(["pong","runtime"]);
    }
}

export default PingCommand;