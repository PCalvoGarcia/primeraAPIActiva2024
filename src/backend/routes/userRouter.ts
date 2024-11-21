import Express from 'express';
import { User } from '../types/User.js';
import { deleteUser, getAllUsers, getUser, newUser, updateUser } from '../controllers/userController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';

const userRouter = Express.Router();

userRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const result = await getAllUsers();
    res.json(result);
  });
  
userRouter.get("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result = await getUser(req.params.id);
    res.send(result);
  });
 
userRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    const user: User = {userName: req.body.username, name: req.body.name, first_surname: req.body.surname, email: req.body.email, password: req.body.password};
    const result = await newUser(user);
    res.send(result);
});

userRouter.put("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const user: Partial<User> = {userName: req.body.username, name: req.body.name, first_surname: req.body.surname, email: req.body.email, password: req.body.password};
    const result = await updateUser(req.params.id, user);
    res.send(result);
});

userRouter.delete("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
   const result = await deleteUser(req.params.id);
  let statusCode = 200;
res.send(result);
});

export default userRouter;