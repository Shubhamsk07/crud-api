import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    
    const user = await this.userRepository.find();

    if (!user) { throw new NotFoundException("No user found"); }
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) { throw new NotFoundException("No user found! try another id"); }

    return user;

  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });
    if (!userToUpdate) {
        return null; // or handle the case when user is not found
    }

    // Update the user entity properties individually
    userToUpdate.username = updateUserDto.username;
    // Update other properties as needed

    return await this.userRepository.save(userToUpdate);
}



  async remove(id: number): Promise<User | null> {
    const userToRemove = await this.userRepository.findOne({ where: { id } });
    if (userToRemove) {
      await this.userRepository.remove(userToRemove);
      return userToRemove;
    }
    return null; // Return null if user with given id is not found
  }
}
