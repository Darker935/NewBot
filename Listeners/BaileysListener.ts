import { proto, WASocket } from "@adiwajshing/baileys";
import Command from "../commands/Command";
import {CommandManager} from "../main/CommandManager";
import { Configs, MessageParts, CommandCache } from "../main/Utils";

class BaileysListener {

    cmd_cache: CommandCache = {}
    commandManager: CommandManager;
    bot_config: Configs;

    public startListeners(client: any, manager: CommandManager): void {
        console.log("✅ Starting listeners");
        this.commandManager = manager;
        client.ev.on("messages.upsert", m => this.onMessage(m,client));
    }

    public isCmd(str: string): boolean{
        if (!this.bot_config) this.bot_config = new Configs();
        
        const isCmd = str && Boolean(
            this.bot_config.prefixes.includes(str.slice(0,1))
            && str.slice(1)
        )
        return isCmd;
    }

    public get(str: string, type: MessageParts){
        switch (type) {
            case "command":
                return this.isCmd(str)
                ? str.slice(1).trim().split(" ")[0]
                : null
            case "arg":
                let arg =  this.get(str,"command")
                return arg 
                ? str.slice(arg.length+1).trim()
                : null
            case "args":
                let args = this.get(str,"arg")
                return args
                ? args.split(" ")
                : null
            default: break
        }
    }

    public onMessage(message: {messages: proto.IWebMessageInfo[], type: any}, baileys: WASocket) : void {
        try {
            let info = message.messages[0];
            let type = this.getType(info.message);

            if (
                type == "protocolMessage"
                || type == "senderKeyDistributionMessage"
                || message?.messages[0]?.key?.remoteJid == "status@broadcast"
            ) return;

            let full_text = info.message?.[type]?.caption 
            || info.message?.[type]?.text
            || info.message?.[type]?.fileName
            || info.message?.conversation
            
            let quotedMsg = info.message?.extendedTextMessage?.contextInfo?.quotedMessage

            let msg = {
                text: {
                    full_text: full_text,
                    command: this.get(full_text,"command"),
                    args: this.get(full_text,"args"),
                    arg: this.get(full_text,"arg")
                },
                quotedMsg,
                data: {
                    from: info.key.remoteJid,
                    author: info.key.participant ? info.key.participant : 
                            info.key.fromMe ? baileys.user.id : info.key.remoteJid,
                    isGroup: info.key.remoteJid.includes("@g.us")
                },
                message: info
            }
            msg.text.command!=undefined ? console.log(`COMANDO EXECUTADO [ ${msg.text.command} ]`) : ""
            if (msg.text.command) {
                if (this.cmd_cache[msg.text.command] === undefined) {
                    this.cmd_cache[msg.text.command] = this.commandManager.findCommand(msg.text.command)
                }
    
                if (this.cmd_cache === null) {}
                else { this.cmd_cache[msg.text.command]?.onCommand(baileys, msg); }
            }
        }catch(e){
            console.log(e)
        }
    };

    getType(message?: proto.IMessage | null ): string {
        if (!message) return "";
        else return Object.keys(message)[0];
    }
}

export default BaileysListener;