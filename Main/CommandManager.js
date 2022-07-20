export default class CommandManager {
    constructor() {
        this.instance = new CommandManager();
        this.commands = new Set();
    }
    ;
    addCommand(command) {
        this.commands.add(command);
    }
    ;
    findCommand(name) {
        this.commands.forEach(command => {
            if (command.command() == name.toLowerCase() || command.alias().has(name.toLowerCase())) {
                return command;
            }
        });
        return null;
    }
    ;
    getCommands() {
        let commands2 = new Set();
        this.commands.forEach(command => {
            commands2.add(command.command());
        });
        return commands2;
    }
    getInstance() {
        return this.instance;
    }
}
