import {CommandManager} from "./Main/CommandManager"
import * as allCommands from "./Commands/index";
import {Launcher} from "./Main/start"

(async()=>{

    function addCommands(manager: CommandManager){
        manager.addCommand(new allCommands.PingCommand());
    }

    var commandManager: CommandManager = new CommandManager().getInstance();
    addCommands(commandManager);
    var launcher = await new Launcher();
    launcher.baileys();
})()

