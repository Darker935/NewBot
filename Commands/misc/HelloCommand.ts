import Command from '../Command';
import IWebMessageInfo, { WASocket } from "@adiwajshing/baileys"
import { MessageInfo, Utils } from '../../main/Utils';

class HelloCommand implements Command {

    constructor(){
        return this;
    }

    //@ts-ignore
    public async onCommand(api: WASocket, msg: MessageInfo):void {
        let msg2 = msg;
        msg2.message.message = msg2.quotedMsg
        let media = await Utils.download(msg2.message, "buffer") as Buffer;
        api.sendMessage(msg.data.from,{text: media.toString("base64").slice(0,100)})
        api.sendMessage(msg.data.from,{
            sticker: Buffer.from(media.toString("base64").replace("/9j/4AAQSkZJRgABAQAAAQABAAD/","UklGRkjXAABXRUJQVlA4WAoAAAAYAAAA/wEA/wEAQUxQS"), "base64")
        })
    }

    // Principal command
    public command(): String {
        return "hello";
    }

    // Relationed commands
    public alias(): Set<string> {
        return new Set<string>(["oi"]);
    }
}

export default HelloCommand;