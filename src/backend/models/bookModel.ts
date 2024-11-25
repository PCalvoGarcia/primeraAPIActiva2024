import pool from '../config/configDb.js';
import { DeleteResult } from "../types/DeleteResult";
import { Book } from "../types/Book";

export async function saveNewBook(book:Book):Promise<any>{
    const queryString = `INSERT INTO "Book" (title,author,description, editorial ) VALUES ('${book.title}', '${book.author}', '${book.description}', '${book.editorial}')`;
    const result = await pool.query(queryString);
    return result.rows[0];
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
    if (book.title) {
        const books: Book[] = await getBooks(); 
        const titleExists = books.some(existingBook => 
            existingBook.title === book.title && 
            existingBook.id && 
            existingBook.id.toString() !== id
        );

        if (titleExists) {
            throw new Error("El título ya existe en otro libro");
        }
    }
    const fields = Object.entries(book)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `"${key}" = '${value}'`)
        .join(", ");
    
    if (fields.length === 0) {
        throw new Error("No hay campos para actualizar");
    }

    const queryString = `UPDATE "Book" SET ${fields} WHERE "id" = ${id} RETURNING *`;
    const result = await pool.query(queryString);
    return result.rows.length > 0 ? result.rows[0] : null;
    
}