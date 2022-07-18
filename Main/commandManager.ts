import { Command } from "../Commands/Command";

class CommandManager {
    commands: Set<Command>;
    instance: CommandManager = new CommandManager();

    constructor() {
        this.commands = new Set<Command>();
    };
    public addCommand(command: Command) : void {
        this.commands.add(command);
    };
    public findCommand(name: String) : Command | undefined | null {
        
        this.commands.forEach(command => {
            if (command.command() == name.toLowerCase() || command.alias().has(name.toLowerCase())) {
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

export default CommandManager;