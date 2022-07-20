import CommandManager from "./Main/CommandManager";
import * as allCommands from "./Commands/index";
import Launcher from "./Main/start";
var commandManager = new CommandManager().getInstance();
var launcher = new Launcher();
commandManager.addCommand(new allCommands.PingCommand());
launcher.baileys();
