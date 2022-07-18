import CommandManager from "./Main/CommandManager"
import * as allCommands from "./Commands/index";
import Launcher from "./Main/start"

class WhatsappBot {
    public static main(): void {
        var commandManager: CommandManager = new CommandManager().getInstance();
        var launcher: Launcher = new Launcher();
        commandManager.addCommand(new allCommands.PingCommand());
        launcher.baileys();
    }
}

WhatsappBot.main();