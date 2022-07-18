import * as fs from "fs";
import P from "pino";

import makeWASocket from "@adiwajshing/baileys";
import {
    BinaryNode,
    useSingleFileLegacyAuthState,
    DisconnectReason,
    WAProto,
    BufferJSON,
    useMultiFileAuthState
} from "@adiwajshing/baileys";

const { state, saveCreds } = await useMultiFileAuthState('sessions')

const client = makeWASocket({
    printQRInTerminal: true,
    browser: ['QUISHOT MD Baileys', "Safari", "3.0"],
    logger: P({ level: "fatal" }),
    auth: state,
    emitOwnEvents: true
})

