import Command from '../commands/Command';
import IWebMessageInfo from "@adiwajshing/baileys"

class HelloCommand implements Command {

    constructor(){
        return this;
    }
    //@ts-ignore
    public onCommand(api: any, message: IWebMessageInfo):void {
        api.sendMessage(message.message.key.remoteJid,{text: "Ola, rodando em TS"})
    }
    public command(): String {
        return "hello";
    }
    public alias(): Set<string> {
        return new Set<string>(["oi"]);
    }
}

export default HelloCommand;