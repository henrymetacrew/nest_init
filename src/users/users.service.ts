import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private users = [
    {
      id: 1,
      name: 'Loi Nguyen',
      email: 'fopdark@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Loi Nguyen 2',
      email: 'fopdark@gmail.com 2',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Loi Nguyen 3',
      email: 'fopdark@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Loi Nguyen 4',
      email: 'fopdark@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: 'Loi Nguyen 5',
      email: 'fopdark@gmail.com 2',
      role: 'INTERN',
    },
  ];

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  findUsers() {
    return this.userRepository.find();
  }

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userTmp = structuredClone(this.users);
    const usersByHighestId = userTmp.sort((a, b) => {
      if (b.id > a.id) {
        return 0;
      }
      return -1;
    });
    // console.log('usersByHighestId', usersByHighestId);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removeUser;
  }
}
