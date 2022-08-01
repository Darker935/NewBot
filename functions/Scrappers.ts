import axios from "axios";
import * as cheerio from "cheerio"

export class Scrappers {

    static getStr(str: string, start:string, end:string, i?:number): string {
        if (i == undefined) i = 0;
        i++;
        try {
            return str.split(start)[i].split(end)[0];
        } catch (ex) {
            return '';
        }
    };

    public static async y2mate(url: string): Promise<any> {
        let ytInfo = await axios.get(url).then(res => {
            let ytData;
            const $ = cheerio.load(res.data);
            $("body").find("script").each((i, el) =>{
                
                if (i == 1) {
                    //@ts-ignore-por-favor
                    let json = this.getStr(el.children[0].data, 'ytInitialPlayerResponse = {', '};');
                    json = JSON.parse("{" + json + "}");
                    //console.log(JSON.stringify(json, null, 2));
                    let formats = {
                        audio: [],
                        video: []
                    };

                    let thumbnails = [];

                    (json["streamingData"]["adaptiveFormats"]).forEach(vFormat => {
                        if (vFormat.audioQuality != undefined) {
                            console.log("Link: "+vFormat["url"])

                            /*vFormat["url"] = vFormat["url"] != undefined 
                            ? vFormat["url"] : vFormat["signatureCipherUrl"] != undefined
                            ? decodeURIComponent(vFormat["signatureCipher"].split("&url=")[1]) : "";*/

                            formats.audio.push({
                                mimetype: vFormat["mimeType"],
                                bitrate: vFormat["bitrate"],
                                averageBitrate: vFormat["averageBitrate"],
                                quality: vFormat["quality"],
                                audioQuality: vFormat["audioQuality"],
                                audioChannels: vFormat["audioChannels"],
                                audioSampleRate: vFormat["audioSampleRate"],
                                loudnessDb: vFormat["loudnessDb"],
                                size: vFormat["contentLength"],
                                estimatedDurationMs: vFormat["approxDurationMs"],
                                url: vFormat["url"] || ""
                            });
                        } else {
                            console.log("Link: "+vFormat["url"])

                            /*vFormat["url"] = vFormat["url"] != undefined 
                            ? vFormat["url"] : vFormat["signatureCipherUrl"] != undefined
                            ? decodeURIComponent(vFormat["signatureCipher"].split("&url=")[1]) : "";*/

                            formats.video.push({
                                mimetype: vFormat["mimeType"],
                                bitrate: vFormat["bitrate"],
                                width: vFormat["width"],
                                height: vFormat["height"],
                                quality: vFormat["quality"],
                                fps: vFormat["fps"],
                                qualityLabel: vFormat["qualityLabel"],
                                averageBitrate: vFormat["averageBitrate"],
                                size: vFormat["contentLength"],
                                estimatedDurationMs: vFormat["approxDurationMs"],
                                url: vFormat["url"] || ""
                            });
                        }
                    })

                    json["videoDetails"]["thumbnail"]["thumbnails"].forEach(vThumb => {
                        thumbnails.push({
                            url: vThumb["url"],
                            width: vThumb["width"],
                            height: vThumb["height"]
                        })
                    })

                    ytData = {
                        data: {
                            duration: json["streamingData"]["expiresInSeconds"],
                            formats: formats,
                            details: {
                                videoId: json["videoDetails"]["videoId"],
                                private: json["videoDetails"]["isPrivate"],
                                livestream: json["videoDetails"]["isLiveContent"],
                                author: json["videoDetails"]["author"],
                                title: json["videoDetails"]["title"],
                                description: json["videoDetails"]["shortDescription"],
                                seconds: json["videoDetails"]["lengthSeconds"],
                                views: json["videoDetails"]["viewCount"],
                                channelId: json["videoDetails"]["channelId"],
                                channelUrl: "http://www.youtube.com/channel/" + json["videoDetails"]["channelId"],
                                keywords: json["videoDetails"]["keywords"],
                                thumbnails: thumbnails
                            }
                        }
                    }
                }
            })
            return ytData;
        })
        return ytInfo;
    }
}