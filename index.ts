import CommandManager from "./Main/CommandManager"
import * as allCommands from "./Commands/index";
import Launcher from "./Main/start"

function addCommands(manager: CommandManager){
    manager.addCommand(new allCommands.PingCommand());
}

function start() {
    var commandManager: CommandManager = new CommandManager().getInstance();
    addCommands(commandManager);
    new Launcher().baileys();
}

start();

