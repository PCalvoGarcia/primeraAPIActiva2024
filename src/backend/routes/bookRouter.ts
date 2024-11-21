import Express from 'express';
import { Book } from '../types/Book.js';
import { newBook,getAllBooks,getBookById,deleteBookById,updateBook } from '../controllers/bookController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
const BookRouter = Express.Router();
BookRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const result = await getAllBooks();
    res.json(result);
  });
  
BookRouter.get("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result = await getBookById(req.params.id);
    res.send(result);
  });
 
BookRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    const Book: Book = {title: req.body.title, author: req.body.author, description: req.body.description, editorial: req.body.editorial};
    const result = await newBook(Book);
    res.send(result);
});
BookRouter.put("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const Book: Partial<Book> = {title: req.body.title, author: req.body.author, description: req.body.description, editorial: req.body.editorial};
    const result = await updateBook(req.params.id, Book);
    res.send(result);
});
BookRouter.delete("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
   const result = await deleteBookById(req.params.id);
  let statusCode = 200;
 res.send(result);
});
export default BookRouter;