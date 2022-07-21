import { proto } from "@adiwajshing/baileys";
import Command from "../commands/Command";
import {CommandManager} from "../main/CommandManager";
import { Test } from "../main/Utils";

class BaileysListener {

    cmd_cache: Test = {}
    commandManager: CommandManager;

    public startListeners(client: any, manager: CommandManager): void {
        console.log("✅ Starting listeners");
        this.commandManager = manager;
        client.ev.on("messages.upsert", m => this.onMessage(m,client));
    }

    public isCmd(str: string){
        
    }

    public onMessage(message: {messages: proto.IWebMessageInfo[], type: any}, baileys: any) : void {
        try {
            console.log(this.commandManager.commands)
            let info = message.messages[0];
            let type = this.getType(info.message);
            if (
                type == "protocolMessage"
                || type == "senderKeyDistributionMessage"
                || message?.messages[0]?.key?.remoteJid == "status@broadcast"
            ) return;

            let msg = {
                text: info.message?.[type]?.caption || info.message?.[type]?.text || info.message?.conversation,
                message: info
            }
            if (!msg.message.key.participant.includes("351919911")) return;

            console.log("Finding: ",msg.text)
            if (this.cmd_cache[msg.text] === undefined) {
                this.cmd_cache[msg.text] = this.commandManager.findCommand(msg.text)
            }
            console.log("Before: ",this.cmd_cache)
            if (this.cmd_cache === null) {}
            else {
                this.cmd_cache[msg.text].onCommand(baileys, msg.message);
            }
            console.log("After: ",this.cmd_cache)
        }catch(e){
            console.log(e.message)
        }
    };

    getType(message?: proto.IMessage | null ): string {
        if (!message) return "";
        else return Object.keys(message)[0];
    }
}

export default BaileysListener;