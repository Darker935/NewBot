import Command from '../Command';
import IWebMessageInfo, { WASocket } from "@adiwajshing/baileys"
import { MessageInfo, Utils } from '../../main/Utils';

class MenuCommand implements Command {

    constructor(){
        return this;
    }

    //@ts-ignore
    public async onCommand(api: WASocket, msg: MessageInfo):Promise<void> {
        api.sendMessage(msg.data.from,{
            image: await Utils.download(msg.message, "buffer") as Buffer
        })
    }

    // Principal command
    public command(): String {
        return "menu";
    }

    // Relationed commands
    public alias(): Set<string> {
        return new Set<string>(["help","cmds"]);
    }
}

export default MenuCommand;