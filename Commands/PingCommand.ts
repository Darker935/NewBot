import Command from '../commands/Command';
import IWebMessageInfo from "@adiwajshing/baileys"

class PingCommand implements Command {

    constructor(){
        return this;
    }
    //@ts-ignore
    public onCommand(api: any, message: IWebMessageInfo):void {
        console.log("Ping certinho KKKK")
        console.log(message.key)
        api.sendMessage(message.key.remoteJid,{text: "Ola, rodando em TS"})
    }
    public command(): String {
        return "ping";
    }
    public alias(): Set<string> {
        return new Set<string>(["pong","runtime"]);
    }
}

export default PingCommand;