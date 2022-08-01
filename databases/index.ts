import sqlite3, { Database, Statement } from 'sqlite3'
import { open, ISqlite, IMigrate } from 'sqlite'
import * as fs from 'fs'

async function openDb() {
    console.log("abrindo")
    return await open<sqlite3.Database, sqlite3.Statement>({
        filename: './databases/bot.db',
        driver: sqlite3.Database
    })
}

const db = openDb().then(db => {
    return db
});

export default class MySQL {
    
    public static async createDatabase() {
        console.log("Criando banco de dados");
        (await db).exec(
            "CREATE TABLE IF NOT EXISTS chats " +
            "("+
            "id TEXT PRIMARY KEY, "+
            "name TEXT, "+
            "description TEXT, "+
            "participants TEXT, "+
            "admins TEXT"+
            ")"
        );
    }

    public static async updateAll(table: string, columns: Array<string>, values: Array<Array<string>>) {
        values.forEach((value) => {
            MySQL.insertRow(table, columns, value)
        });
    }

    public static async getGroupInfo(id: string): Promise<{
        id: string;
        name: string;
        description: string;
        participants: string;
        admins: string;
    }> | undefined {
        let row = await (await db).get("SELECT * FROM chats WHERE id = ?",id);
        if (row) {
            return row;
        } else {
            return undefined
        }
    }

    static getObjectValues(columns: Array<string>, values: Array<string>) {
        console.log("A")
        let valuesObject = {};
        columns.forEach((column,i) => {
            valuesObject[":"+column] = values[i];
        });
        return valuesObject;
    }

    static getColumnsValues(columns: Array<string>) {
        console.log("B")
        return "(" + columns.join(",") + ")";
    }

    static getColumnsVariables(columns: Array<string>) {
        console.log("C")
        return "(" + columns.map(column => ":"+column).join(",") + ")";
    }

    static getColumnsUpdateVariables(columns: Array<string>) {
        console.log("D")
        return columns.map(column => column + "=?").join(",");
    }

    public static async insertRow(table: string, columns: Array<string>, valuesN: Array<string>) {
        console.log("E")
        if (valuesN.length != columns.length) throw "Erro: Número de colunas e valores não são iguais";
        if (columns.length == 0 || valuesN.length == 0) throw "Erro: É necessario informar no minimo 1 valor/coluna";
        if (columns[0] != "id") throw "Erro: A primeira coluna deve ser id";        
        
        let row = await (await db).get("SELECT id FROM "+table+" WHERE id = ?",valuesN[0]);
        let valuesSql = this.getObjectValues(columns,valuesN);
        let columnsSql = this.getColumnsValues(columns);
        let columnsVariableSql = this.getColumnsVariables(columns);
        let columnsUpdateVariablesSql = this.getColumnsUpdateVariables(columns);

        if (row) {
            console.log("true")

            let sql =
            "UPDATE "       + table+
            " SET "         + columnsUpdateVariablesSql+
            " WHERE id ='"  + valuesN[0] + "'";

            (await db).run(sql,valuesN);
        } else {

            console.log("false")

            let sql = 
            "INSERT INTO " + table +
            columnsSql +
            " VALUES " + columnsVariableSql;
            
            (await db).run(sql,valuesSql)
        }
    }
}