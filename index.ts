import CommandManager from "./Main/CommandManager"
import PingCommand from "./Commands/PingCommand"

class WhatsappBot {
    public static main(): void {
        var commandManager: CommandManager = new CommandManager().getInstance();
        commandManager.addCommand(new PingCommand());
    }
}