import pool from "../config/configDb.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { User } from "../types/User.js";


export async function saveNewUser(user:User):Promise<any>{
    const queryString = `INSERT INTO "User" ("username", "name", "first_surname", "password", "email") VALUES ('${user.userName}', '${user.name}', '${user.first_surname}', '${user.password}','${user.email}')`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function getUsers():Promise<any>{  
    const queryString = `SELECT * FROM "User"`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function findUserById(id:string):Promise<any>{
    const queryString = `SELECT * FROM "User" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function deleteUserById(id: string): Promise<DeleteResult> {
    try {
        const queryString = `DELETE FROM "User" WHERE "id" = ${id}`;
        const result = await pool.query(queryString);
        
        if (result.rowCount && result.rowCount > 0) {
            return {
                success: true,
                message: 'Usuario eliminado correctamente',
                rowsAffected: result.rowCount
            };
        } else {
            return {
                success: false,
                message: 'No se encontró el usuario',
                rowsAffected: 0
            };
        }
    } catch (error) {
        return {
            success: false,
            message: `Error al eliminar usuario: ${(error as Error).message}`
        };
    }
}   