import IWebMessageInfo from "@adiwajshing/baileys"

export default interface Command {
    //@ts-ignore
    onCommand(api: any, message: IWebMessageInfo): void;
    command(): String;
    alias(): Set<string>;
}