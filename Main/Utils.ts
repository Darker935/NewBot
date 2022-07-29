import * as fs from "fs"
import IWebMessageInfo, { downloadMediaMessage, proto, WAMessage } from "@adiwajshing/baileys"
import Command from "../commands/Command";

export class CommandCache {
    [any: string]: Command;
}

export class MessageInfo {
    text: {
        full_text: string;
        command: string;
        args: string;
        arg: string;
    };
    quotedMsg: undefined | proto.IMessage;
    data: {
        from: string;
        author: string;
    };
    message: WAMessage
}

export class Configs {
    public config: any;
    public prefixes = [];

    constructor(){
        this.config = JSON.parse(fs.readFileSync("./botconfig.json","utf-8"))
        this.prefixes = this.config.prefixes;
    }
}

export class Utils {

    public static isMedia(msg: WAMessage) {
        if (!msg?.message) {
            return false
        }
        let msg2 = msg.message;
        return Boolean(
            msg2["audioMessage"] ||
            msg2["documentMessage"] ||
            msg2["imageMessage"] ||
            msg2["videoMessage"] ||
            msg2["stickerMessage"] ||
            msg2["locationMessage"]
        )
    }
    
    public static async download(msg: WAMessage, type: DownloadType) {
        if (this.isMedia(msg)) {
            console.log("Media: "+msg)
            return await downloadMediaMessage(msg,type,{})
        } else {
            console.log("Media undefined: "+msg)
            return undefined;
        }
    }

    
}

export type MessageParts = 'arg' | 'args' | 'command';
type DownloadType = "stream" | "buffer";