import P from "pino";
import BaileysListener from "../Listeners/BaileysListener";
import makeWASocket from "@adiwajshing/baileys";
import { DisconnectReason, useMultiFileAuthState } from "@adiwajshing/baileys";
const { state, saveCreds } = await useMultiFileAuthState('sessions');
class Launcher {
    baileys() {
        const client = makeWASocket({
            printQRInTerminal: true,
            browser: ['QUISHOT MD Baileys', "Safari", "3.0"],
            logger: P({ level: "fatal" }),
            auth: state,
            emitOwnEvents: true
        });
        async function connect() {
            client.ev.on('connection.update', (update) => {
                var _a, _b;
                const { connection, lastDisconnect } = update;
                if (connection === 'close') {
                    const shouldReconnect = ((_b = (_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode) !== DisconnectReason.loggedOut;
                    console.log('connection closed due to ', lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error, ', reconnecting ', shouldReconnect);
                    // reconnect if not logged out
                    if (shouldReconnect) {
                        connect();
                    }
                }
                else if (connection === 'open') {
                    console.log('opened connection');
                }
            });
            client.ev.on('creds.update', () => saveCreds);
            return client;
        }
        connect().then(client => {
            let baileysListener = new BaileysListener();
            baileysListener.startListeners(client);
        });
    }
}
export default Launcher;
