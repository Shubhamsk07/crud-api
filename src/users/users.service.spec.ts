import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';


const createUserDto = {
    author: 'JohnDoe',
    secret: 'MySecret123',
    email: 'john.doe@example.com',
    username: 'john_doe',
    password: 'StrongPassword123',
};


describe('UsersService', () => {
    let service: UsersService;
    let repository: Repository<User>;
    const userData = {
        id: 123,
        username: '62433245345efd',
        author: 'shubham',
        secret: 'you dont have to know',
        password: 'sfds2sdf2@',
        email: 'sadf2@gmail.com',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    

    describe('findOne', () => {
        it('should find and return a user by ID', async () => {
            // Mock the findOne method of the repository
            jest.spyOn(repository, 'findOne').mockResolvedValue(userData);
    
            // Call the actual service method using the instance 'service'
            const result = await service.findOne(userData.id);
    
            // Expectations
            expect(repository.findOne).toHaveBeenCalledWith(
              expect.objectContaining({ where: { id: 123 } })
            );
            expect(result).toEqual(userData);
        });

        
    });
     describe('update', () => {
        it('should update a user and return the updated user', async () => {
            
            jest.spyOn(repository, 'findOne').mockResolvedValue(userData);
            jest.spyOn(repository, 'save').mockResolvedValue({ ...userData, username: 'updatedUsername' });

            
            const result = await service.update(userData.id, { username: 'updatedUsername' });

            // expectations
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: userData.id } });
            expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({ username: 'updatedUsername' }));
            expect(result).toEqual({ ...userData, username: 'updatedUsername' });
        });
    });
    describe('remove', () => {
        it('should remove a user and return the removed user', async () => {
            
            jest.spyOn(repository, 'findOne').mockResolvedValue(userData);
            jest.spyOn(repository, 'remove').mockResolvedValue(userData);

            
            const result = await service.remove(userData.id);

            // expectations
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: userData.id } });
            expect(repository.remove).toHaveBeenCalledWith(expect.objectContaining({ id: userData.id }));
            expect(result).toEqual(userData);
        });

        it('should return null if user with given id is not found', async () => {
            
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            
            const result = await service.remove(userData.id);

            
            expect(repository.findOne).toHaveBeenCalledWith({ where: { id: userData.id } });
            expect(result).toBeNull();
        });
    });
});
    
    


