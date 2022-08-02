import MySQL from "../databases";

export class GroupUtils {
    public static getGroupInfo(id: string): void {
        MySQL.getGroupInfo(id).then((row) => {
            return row;
        })
    }
}