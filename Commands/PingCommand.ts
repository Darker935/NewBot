import {Command} from './Command';
import IWebMessageInfo from "@adiwajshing/baileys"

class PingCommand implements Command {

    public onCommand(api: any, message: typeof IWebMessageInfo):void {

    }
    public command(): String {
        return "ping";
    }
    public alias(): Set<string> {
        return new Set<string>(["pong","runtime"]);
    }
}