import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from "@shared/errors/AppErrors";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({user_id, name, email, password, old_password}:IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.findById(user_id);

    if(!users){
      throw new AppError('User not found.')
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if( userUpdateEmail && userUpdateEmail.id !== user_id){
      throw new AppError('There is already one user with this email.');
    }

    if( password && !old_password){
      throw new AppError('Old password required.');
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password,users.password)

      if(!checkOldPassword){
        throw new AppError('Old password does not match.')
      }

      users.password = await hash(password, 8)
    }

    users.name = name;
    users.email = email;

    await usersRepository.save(users)

    return users;
  }
}

export default UpdateProfileService;
