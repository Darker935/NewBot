import * as fs from "fs";
import P from "pino";

import BaileysListener from "../Listeners/BaileysListener";

import makeWASocket from "@adiwajshing/baileys";
import { Boom } from '@hapi/boom'
import {
    BinaryNode,
    useSingleFileLegacyAuthState,
    DisconnectReason,
    WAProto,
    BufferJSON,
    useMultiFileAuthState
} from "@adiwajshing/baileys";

const { state, saveCreds } = await useMultiFileAuthState('sessions')

class Launcher {
    public baileys(){
        const client = makeWASocket({
            printQRInTerminal: true,
            browser: ['QUISHOT MD Baileys', "Safari", "3.0"],
            logger: P({ level: "fatal" }),
            auth: state,
            emitOwnEvents: true
        });
        
        async function connect(){
            client.ev.on('connection.update', (update) => {
                const { connection, lastDisconnect } = update;
                if(connection === 'close') {
                    const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
                    console.log('connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);
                    // reconnect if not logged out
                    if(shouldReconnect) {
                        connect();
                    }
                } else if(connection === 'open') {
                    console.log('opened connection');
                }
            });
            client.ev.on('creds.update', () => saveCreds);
            return client;
        }
        connect().then(client => {
            let baileysListener = new BaileysListener();
            baileysListener.startListeners(client);
        })
    }
}
export default Launcher;