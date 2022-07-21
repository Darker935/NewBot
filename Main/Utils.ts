import * as fs from "fs"
import Command from "../commands/Command";

export class CommandCache {
    [any: string]: Command;
}

export class MessageInfo {
    full_text: string;
    command: string;
    args: string;
    arg: string;
    message: any;
}

export class Configs {
    config: any;
    prefixes = [];

    constructor(){
        this.config = JSON.parse(fs.readFileSync("./botconfig.json","utf-8"))
        this.prefixes = this.config.prefixes;
    }
}

export type MessageParts = 'arg' | 'args' | 'command';