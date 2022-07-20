import CommandManager from "../Main/CommandManager";
class BaileysListener {
    startListeners(client) {
        console.log("Starting listeners");
        client.ev.on("messages.upsert", m => this.onMessage(m));
    }
    onMessage(message) {
        var _a, _b, _c, _d, _e, _f;
        let commandManager = new CommandManager().getInstance();
        let info = message.messages[0];
        let type = this.getType(info.message);
        let msg = {
            text: ((_b = (_a = info.message) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.caption) || ((_d = (_c = info.message) === null || _c === void 0 ? void 0 : _c[type]) === null || _d === void 0 ? void 0 : _d.text) || ((_e = info.message) === null || _e === void 0 ? void 0 : _e.conversation),
            message: info[type]
        };
        console.log(msg);
        (_f = commandManager.findCommand(msg.text)) === null || _f === void 0 ? void 0 : _f.onCommand(null, msg.message);
    }
    ;
    getType(message) {
        if (!message)
            return "";
        else
            return Object.keys(message)[0];
    }
}
export default BaileysListener;
