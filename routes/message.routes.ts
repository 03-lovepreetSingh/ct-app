import express, { Request, Response } from "express";
// import isAuthenticated from "../middlewares/isAuthenticated";

import { getMessage, sendMessage } from "../controllers/message.controller";

const router = express.Router();

router
  .route("/send/:id")
  .post((req: Request, res: Response) => sendMessage(req, res));
router
  .route("/all/:id")
  .get((req: Request, res: Response) => getMessage(req, res));

export default router;
