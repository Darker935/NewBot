import { proto } from "@adiwajshing/baileys";
import {CommandManager} from "../Main/CommandManager";

class BaileysListener {

    commandManager: CommandManager;

    public startListeners(client: any): void {
        console.log("Starting listeners");
        client.ev.on("messages.upsert", m => this.onMessage(m,client));
    }

    public onMessage(message: {messages: proto.IWebMessageInfo[], type: any}, baileys: any) : void {
        try {
            if (!this.commandManager) {
                this.commandManager = new CommandManager().getInstance()
            }
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
            this.commandManager.findCommand(msg.text)?.onCommand(baileys, msg.message);
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