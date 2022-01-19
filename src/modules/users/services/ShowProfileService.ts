import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from "@shared/errors/AppErrors";

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({user_id}:IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.findById(user_id);

    if(!users){
      throw new AppError('User not found.')
    }

    return users;
  }
}

export default ShowProfileService;
