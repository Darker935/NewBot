import Command from '../Command';
import { MessageInfo } from '../../main/Utils';
import MySQL from '../../databases';
import { WASocket } from '@adiwajshing/baileys';

class AdminsCommand implements Command {

    async isAdmin(id: string, participant: string): Promise<boolean> {
        let admins = (await MySQL.getGroupInfo(id)).admins;
        return admins.includes(participant);
    }
    constructor(){
        return this;
    }

    //@ts-ignore
    public async  onCommand(api: WASocket, msg: MessageInfo):void {
        if (!await this.isAdmin(msg.data.from,msg.data.author)) {
            api.sendMessage(msg.data.from,{
                text: "Você não tem permissão para executar este comando."
            })
            return;
        }

        console.log(msg.quotedMsg)
        let quotedMsg = msg.message?.message?.extendedTextMessage?.contextInfo
        let userForAction: string | string[] = quotedMsg?.participant || quotedMsg?.mentionedJid;
        switch (msg.text.command) {
            case "ban": case "kick": case "expulsar": case "banir":
            case "promote": case "promover": case "demote": case "demitir":
                let action = null;
                if (
                    msg.text.command == 'ban' || msg.text.command == 'kick' ||
                    msg.text.command == 'expulsar' || msg.text.command == 'banir'
                ) action = 'remove';

                if (
                    msg.text.command == 'promote' || msg.text.command == 'promover'
                ) action = 'promote';

                if (
                    msg.text.command == 'demote' || msg.text.command == 'demitir'
                ) action = 'demote';

                console.log(userForAction)
                console.log(action)

                if (userForAction instanceof Object) {
                    //@ts-ignore
                    api.groupParticipantsUpdate( msg.data.from, [userForAction as string], action )
                } else if (quotedMsg?.mentionedJid) {
                    if (action == 'remove') {
                    //@ts-ignore
                        userForAction.forEach(participant => {
                            api.groupParticipantsUpdate( msg.data.from, [participant], action )
                        })
                    } else {
                        console.log("Promovendo: ",msg.data.from)
                        //@ts-ignore
                        api.groupParticipantsUpdate( msg.data.from, userForAction, action )
                    }
                } else {
                    api.sendMessage(msg.data.from,{text: "Marque uma mensagem ou o @ do usuário."},{quoted: msg.message})
                }
            break;
            case "lock": case "fechar":
                api.groupSettingUpdate(msg.data.from,"locked")
            break;
            case "unlock": case "abrir":
                api.groupSettingUpdate(msg.data.from,"unlocked")
            break;
            default:
            break;
        }

    }
    public command(): String {
        return "configs";
    }
    public alias(): Set<string> {
        return new Set<string>([
            "bans","kick","expulsar","banir",
            "promote","promover",
            "demote","demitir",
            "lock","fechar",
            "unlock","abrir"
        ]);
    }
}

export default AdminsCommand;