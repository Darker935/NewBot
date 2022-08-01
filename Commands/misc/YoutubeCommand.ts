import Command from '../Command';
import * as fs from 'fs';
import request from 'request';
import IWebMessageInfo, { WASocket } from "@adiwajshing/baileys"
import { MessageInfo, Utils } from '../../main/Utils';
import { Scrappers } from '../../functions/Scrappers';
import axios from 'axios';

class YoutubeCommand implements Command {

    constructor(){
        return this;
    }

    //@ts-ignore
    public async onCommand(api: WASocket, msg: MessageInfo):void {

        let link = (await Scrappers.y2mate(msg.text.arg)).data.formats.video[2].url

        api.sendMessage(msg.data.from,{
            text: link
        })

        api.sendMessage(msg.data.from,{
            video: {url: link}
        })
        return

        await request({
            url: (await Scrappers.y2mate(msg.text.arg)).data.formats.video[0].url,
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36",
                "Accept": "*/*",
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                "authority": "rr4---sn-bg07dnkk.googlevideo.com"
            }
        }, (err, res, body) => {
            if (err) {
                console.log(err);
                return;
            }
            
        })
        .pipe(fs.createWriteStream("./ytd.mp4"))
        .on("finish", () => {
            console.log("Baixou!")
        })
        .on('error', (err) => {
            console.log(err)
        });
    }

    // Principal command
    public command(): String {
        return "ytd";
    }

    // Relationed commands
    public alias(): Set<string> {
        return new Set<string>(["ytbaixar"]);
    }
}

export default YoutubeCommand;