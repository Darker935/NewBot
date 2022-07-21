import P from "pino";
import BaileysListener from "../listeners/BaileysListener";
import makeWASocket, { AuthenticationState } from "@adiwajshing/baileys";
import { Boom } from '@hapi/boom'
import {
    DisconnectReason,
    useMultiFileAuthState
} from "@adiwajshing/baileys";
import { CommandManager } from "./CommandManager";


export class Launcher {
    state : AuthenticationState;
    saveCreds: () => Promise<void>;
    asyncFunction: Promise<void>;
    manager: CommandManager;

    constructor(manager: CommandManager){
        this.asyncFunction = (async () => {
            const { state, saveCreds } = await useMultiFileAuthState('sessions')
            this.state = state;
            this.saveCreds = saveCreds;
            this.manager = manager;
        })()
    }

    public async baileys(){
        await this.asyncFunction
        console.log("✅ Making wa-socket connection")
        const client = makeWASocket({
            printQRInTerminal: true,
            browser: ['QUISHOT MD Baileys', "Safari", "3.0"],
            logger: P({ level: "fatal" }),
            auth: this.state,
            emitOwnEvents: true
        });
        
        async function connect(this_class: Launcher){
            client.ev.on('connection.update', (update) => {
                const { connection, lastDisconnect } = update;
                if(connection === 'close') {
                    const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
                    console.log('❌ Connection closed due to ', lastDisconnect?.error, ', reconnecting ', shouldReconnect);
                    // reconnect if not logged out
                    if(shouldReconnect) {
                        connect(this_class);
                    }
                } else if(connection === 'open') {
                    console.log('✅ Connected successfully');
                }
            });
            client.ev.on('creds.update', ((res) => {
                this_class.saveCreds();
            }));
            return client;
        }
        connect(this).then(client => {
            let baileysListener = new BaileysListener();
            baileysListener.startListeners(client,this.manager);
        })
    }
}