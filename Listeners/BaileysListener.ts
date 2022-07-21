import { proto } from "@adiwajshing/baileys";
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
                ? str.split(arg)[1].trim()
                : null
            case "args":
                let args = this.get(str,"arg")
                return args
                ? args.split(" ")
                : null
            default: break
        }
    }

    public onMessage(message: {messages: proto.IWebMessageInfo[], type: any}, baileys: any) : void {
        try {
            let info = message.messages[0];
            let type = this.getType(info.message);
            if (
                type == "protocolMessage"
                || type == "senderKeyDistributionMessage"
                || message?.messages[0]?.key?.remoteJid == "status@broadcast"
            ) return;

            let full_text = info.message?.[type]?.caption || info.message?.[type]?.text || info.message?.conversation
            let msg = {
                full_text: full_text,
                command: this.get(full_text,"command"),
                args: this.get(full_text,"args"),
                arg: this.get(full_text,"arg"),
                message: info
            }
            if (!msg.message.key.participant.includes("351919911")) return;

            if (msg.command) {
                if (this.cmd_cache[msg.command] === undefined) {
                    this.cmd_cache[msg.command] = this.commandManager.findCommand(msg.command)
                }
    
                if (this.cmd_cache === null) {}
                else { this.cmd_cache[msg.command].onCommand(baileys, msg); }
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