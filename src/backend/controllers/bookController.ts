import { saveNewBook, getBooks, findBookById,deleteBook,updateBookById} from "../models/bookModel.js";
import { Book } from "../types/Book.js";
import { DeleteResult } from "../types/DeleteResult.js";



export async function newBook (book: Book):Promise<string>{
    try {
        const result = await saveNewBook(book);
        return result;
    } catch (error:any){
        if (error.code === "23505") {
            const columnMatch = error.detail.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            return `El ${columnName} ya existe en la base de datos`;
        }
        return error;
    }
      
}

export async function getAllBooks():Promise<string>{
    
    const result = await getBooks();
    try {
        return result;
    } catch (error:any){
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

export async function getBookById(id:string):Promise<string>{
    const result = await findBookById(id);
    try {
        return result;
    } catch (error:any){
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

export async function deleteBookById(id:string):Promise<DeleteResult>{

    const result = await deleteBook(id);
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
    } catch (error:any){
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

export async function updateBook(title: string, book: Partial<Book>): Promise<any> {
    try {
        const result = await updateBookById(title, book);
        if (!result) {
            return `No se pudo actualizar. El animal ${title} no existe.`;
        }
        return result;
    } catch (error: any) {
        if (error.code === "23505") {
            return `Ya existe un animal con ese valor único en la base de datos.`;
        }
        return `Error al actualizar el animal: ${error.message}`;
    }
}