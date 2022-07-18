import { MessageUpsertType, proto } from "@adiwajshing/baileys";
import CommandManager from "../Main/CommandManager";

class BaileysListener {

    public startListeners(client: any): void {
        console.log("Starting listeners");
        client.ev.on("messages.upsert", m => this.onMessage(m));
    }

    public onMessage(message: {messages: proto.IWebMessageInfo[], type: MessageUpsertType}) : void {
        let commandManager: CommandManager = new CommandManager().getInstance();
        let info = message.messages[0];
        let type = this.getType(info.message);
        let msg = {
            text: info.message?.[type]?.caption || info.message?.[type]?.text || info.message?.conversation,
            message: info[type]
        }
        console.log(msg);
        commandManager.findCommand(msg.text)?.onCommand(null, msg.message);
    };

    getType(message?: proto.IMessage | null ): string {
        if (!message) return "";
        else return Object.keys(message)[0];
    }
}

export default BaileysListener;