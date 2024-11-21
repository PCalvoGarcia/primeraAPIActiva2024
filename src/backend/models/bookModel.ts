import pool from '../config/configDb.js';
import { DeleteResult } from "../types/DeleteResult";
import { Book } from "../types/Book";

export async function saveNewBook(book:Book):Promise<any>{
    const queryString = `INSERT INTO "Book" ("title", "author", "description", "editorial", ) VALUES ('${book.title}', '${book.author}', '${book.description}', '${book.editorial}')`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function getBooks():Promise<any>{  
    const queryString = `SELECT * FROM "Book"`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function findBookById(id:string):Promise<any>{
    const queryString = `SELECT * FROM "Book" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function deleteBook(id: string): Promise<DeleteResult> {
    try {
        const queryString = `DELETE FROM "Book" WHERE "id" = ${id}`;
        const result = await pool.query(queryString);
        
        if (result.rowCount && result.rowCount > 0) {
            return {
                success: true,
                message: 'Libro eliminado correctamente',
                rowsAffected: result.rowCount
            };
        } else {
            return {
                success: false,
                message: 'No se encontró el libro',
                rowsAffected: 0
            };
        }
    } catch (error) {
        return {
            success: false,
            message: `Error al eliminar libro: ${(error as Error).message}`
        };
    }
}   

export async function updateBookById(id: string, book: Partial<Book>): Promise<any> {
    try {
        const result = await updateBookById(id, book);
        if (!result) {
            return `No se pudo actualizar. El libro con ID ${id} no existe.`;
        }
        return result;
    } catch (error: any) {
        if (error.code === "23505") {
            return `Ya existe un lirbo con ese valor único en la base de datos.`;
        }
        return `Error al actualizar el libro: ${error.message}`;
    }
}