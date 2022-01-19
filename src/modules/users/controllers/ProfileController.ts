import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ShowProfileService from "@modules/users/services/ShowProfileService";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";

export default class ProfileController {
  public async show(request: Request, response: Response) {
    const user_id = request.user.id;

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
        old_password
    });

    return response.json(user);
  }
}
