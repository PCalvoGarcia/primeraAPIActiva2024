import Express from 'express';
import path from 'path';
import { publicPath } from '../config/configData.js';

const staticRouter = Express.Router();

staticRouter.get('/newUser', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/newUser.html");
    res.sendFile(targetFilePath);
});

staticRouter.get('/usersManagement', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/usersManagement.html");
    res.sendFile(targetFilePath);
});

staticRouter.get('/newBook', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/newBook.html");
    res.sendFile(targetFilePath);
});
staticRouter.get('/BooksManagement', (req: Express.Request, res: Express.Response) => {
    const targetFilePath = path.join(publicPath, "/BooksManagement.html");
    res.sendFile(targetFilePath);
});

export {staticRouter} ;

