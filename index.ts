import {CommandManager} from "./main/CommandManager"
import * as allCommands from "./commands/index";
import {Launcher} from "./main/Start"


(async()=>{

    console.log("✅ Starting bot")

    function addCommands(manager: CommandManager){
        manager.addCommand(new allCommands.PingCommand());
        manager.addCommand(new allCommands.HelloCommand());
        manager.addCommand(new allCommands.EvalCommand());
        manager.addCommand(new allCommands.MenuCommand());
        console.log("✅ " + manager.commands.size + " commands added")
    }

    var commandManager: CommandManager = new CommandManager().getInstance();
    addCommands(commandManager);
    var launcher = await new Launcher(commandManager);
    launcher.baileys();
})()

