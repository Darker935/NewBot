import Command from "../Commands/Command";

export class CommandManager {

    commands: Set<Command>;
    instance: CommandManager;

    constructor() {
        if (!this.commands) this.commands = new Set<Command>();
        if (!this.instance) this.instance = this;
        console.log("Constructor CManager: "+this.commands)
    };
    public addCommand(command: Command) : void {
        console.log("Command no Add Command: "+JSON.stringify(command,null,"\t"))
        this.commands.add(command);
    };
    public findCommand(name: String) : Command | undefined | null {
        name = name.slice(1);
        console.log("Comando para busca: "+name)
        console.log("Todos comandos: "+JSON.stringify(this.commands,null,"\t"))
        this.commands.forEach(command => {
            console.log("Comando: "+command.command)
            console.log("Alias: "+command.alias)
            if (command.command() == name.toLowerCase() || command.alias().has(name.toLowerCase())) {
                console.log("Inclue")
                return command;
            }
        })
        return null;
    };
    public getCommands(): Set<String> {
        let commands2: Set<String> = new Set<String>();
        this.commands.forEach(command => {
            commands2.add(command.command());
        });
        return commands2;
    }
    public getInstance(): CommandManager {
        return this.instance;
    }
}