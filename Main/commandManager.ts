class CommandManager {
    commands: {};

    private constructor() {
        this.commands = {};
    };
    public addCommand(name: string, command: string) {
        this.commands[name] = command;
    };
    public findCommand(name) {

    };
    public executeCommand(name, ...args) {
        this.commands[name].execute(...args);
    };
}
module.exports = CommandManager;