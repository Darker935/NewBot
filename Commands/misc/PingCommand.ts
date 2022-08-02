import Command from '../Command';
import axios from 'axios';
import childrenPorn from 'child_process';
import IWebMessageInfo, { WASocket } from "@adiwajshing/baileys"
import { MessageInfo } from '../../main/Utils';

class PingCommand implements Command {

    constructor(){
        return this;
    }

    uptime(){
        let uptime = process.uptime();
        let days = Math.floor(uptime / 86400);
        let hours = Math.floor((uptime % 86400) / 3600);
        let minutes = Math.floor((uptime % 3600) / 60);
        let seconds = Math.floor(uptime % 60);
        let returnValue = `${days ? days+" dias, " : ""}`
        returnValue += `${hours ? hours+" hora, " : ""}`
        returnValue += `${minutes ? minutes+" minutos, " : ""}`
        returnValue += `${seconds ? seconds+" segundos" : ""}`

        return returnValue;
    }

    //@ts-ignore
    public onCommand(api: WASocket, msg: MessageInfo):void {
        console.log(msg)
        
       

        api.sendMessage(msg.data.from,{
            text: "Pong! Bot online há:\n\n"+this.uptime()
        })
    }
    public command(): String {
        return "ping";
    }
    public alias(): Set<string> {
        return new Set<string>(["pong","runtime"]);
    }
}

export default PingCommand;