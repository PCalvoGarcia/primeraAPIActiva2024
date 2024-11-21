import Express from 'express';
import userRouter from './userRouter.js';
import BookRouter from './bookRouter.js';

const apiRouter = Express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/books', BookRouter);


export default apiRouter;