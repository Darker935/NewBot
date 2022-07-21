import * as fs from "fs"

import Command from "../commands/Command";

export class Test {
    [any: string]: Command;
}

export class Configs {
    config:Object;
    prefixes = [];

    constructor(){
        fs.readFileSync("../botconfig.json")
    }

    public prefixs(){
        fs.readFileSync("../botconfig.json")
    }
}