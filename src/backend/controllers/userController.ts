import { deleteUserById, findUserById, getUsers, saveNewUser } from "../models/userModel.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { User } from "../types/User.js";


export async function newUser(user: User):Promise<string>{
    try {
        const result = await saveNewUser(user);
        return result;
    } catch (error:any){//TODO: quitar el any
        if (error.code === "23505") {
            const columnMatch = error.detail.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            return `El ${columnName} ya existe en la base de datos`;
        }
        return error;
    }
      
}

export async function getAllUsers():Promise<string>{
    
    const result = await getUsers();
    try {
        return result;
    } catch (error:any){//TODO: quitar el any
        if (error.code === "42601") {
            return "Sintaxixis incorrecta.";
        }
        if (error.code === "42P01" || error.code === "42703" || error.code === "42501") {
            return "Error: No se pudo acceder a la tabla o columna. Verifique que exista y que tenga los permisos necesarios.";
        }
        if (result.length === 0) {
            return `La lista de usuarios esta vacia.`;
        }
        return error;
    }

    
}

export async function getUser(id:string):Promise<string>{
    const result = await findUserById(id);
    try {
        return result;
    } catch (error:any){//TODO: quitar el any
        if (error.code === "42601") {
            return "Sintaxixis incorrecta.";
        }
        if (error.code === "42P01" || error.code === "42703") {
            return "Error: No se pudo acceder a la tabla o columna. Verifique que exista y que tenga los permisos necesarios.";
        }
        if (result.length === 0) {
            return `No se encontró el usuario con ID ${id}.`;
        }
        return error;
    }

    
}

export async function deleteUser(id:string):Promise<DeleteResult>{

    const result = await deleteUserById(id);
    try {
        if (result.rowsAffected === 0) {
            return {
                success: false,
                message: `No se encontró el usuario con ID ${id}.`,
                rowsAffected: 0
            };
        }
        return {
            success: true,
            message: `Usuario con ID ${id} eliminado exitosamente.`,
            rowsAffected: result.rowsAffected ?? 1
        };
    } catch (error:any){//TODO: quitar el any
        if (error.code === "23503") {
            return {
                success: false,
                message: "Error: No se pudo acceder a la tabla o columna. Verifique que exista y que tenga los permisos necesarios.",
                rowsAffected: 0
            };
        }
        if (error.code === "42P01" || error.code === "42703") {
            return {
                success: false,
                message: "Error: No se pudo acceder a la tabla o columna. Verifique que exista y que tenga los permisos necesarios.",
                rowsAffected: 0
            };
        }
        return error;
    }

}