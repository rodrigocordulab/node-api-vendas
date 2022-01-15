import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordsRouter = Router();
const sessionsController = new ForgotPasswordController();

passwordsRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  sessionsController.create,
);

export default passwordsRouter;
