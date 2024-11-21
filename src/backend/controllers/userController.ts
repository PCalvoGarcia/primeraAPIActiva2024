import { saveNewUser, getUsers, findUserById, deleteUserById, updateUserById } from "../models/userModel.js";
import { User } from '../types/User.js';


export async function newUser(user: User): Promise<any> {
    try {
        return await saveNewUser(user);
    } catch (error: any) {
        if (error.code === "23505") {
            const columnMatch = error.detail.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            return `El ${columnName} ya existe en la base de datos.`;
        }
        return `Error al crear usuario: ${error.message}`;
    }
}


export async function getAllUsers(): Promise<any> {
    try {
        return await getUsers();
    } catch (error: any) {
        return `Error al obtener los usuarios: ${error.message}`;
    }
}


export async function getUser(id: string): Promise<any> {
    try {
        const result = await findUserById(id);
        if (!result) {
            return `El usuario con ID ${id} no fue encontrado.`;
        }
        return result;
    } catch (error: any) {
        return `Error al obtener el usuario: ${error.message}`;
    }
}

  
  export async function deleteUser(id: string): Promise<any> {
    console.log(`${id}`);
    try {
        const result = await deleteUserById(id);
        return result;
    } catch (error) {
      return new Error("Failed to delete user");
    }
  }
  

export async function updateUser(id: string, user: Partial<User>): Promise<any> {
    try {
        const result = await updateUserById(id, user);
        if (!result) {
            return `No se pudo actualizar. El usuario con ID ${id} no existe.`;
        }
        return result;
    } catch (error: any) {
        if (error.code === "23505") {
            return `Ya existe un usuario con ese valor único en la base de datos.`;
        }
        return `Error al actualizar el usuario: ${error.message}`;
    }
}