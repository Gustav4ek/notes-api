import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { DatabaseService } from "../database/database.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {

  constructor(private readonly prisma: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({data: createUserDto})
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({where: {id}, select: {
        username: true,
        email: true,
      }})

  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({where: { email }})
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    const validUpdateKeys = ['username', 'email'];
    const updates = Object.keys(updateUserDto);

    for (const key of updates) {
      if (!validUpdateKeys.includes(key)) {
        throw new HttpException(`Cannot update field: ${key}`, HttpStatus.BAD_REQUEST);
      }
    }

    if (updateUserDto.username) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          username: updateUserDto.username,
          NOT: {
            id: id,
          },
        },
      });

      if (existingUser) {
        throw new HttpException(`User with this username already exists`, HttpStatus.CONFLICT);
      }
    }

    if (updateUserDto.email) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email: updateUserDto.email,
          NOT: {
            id: id,
          },
        },
      });

      if (existingUser) {
        throw new HttpException(`User with this email already exists`, HttpStatus.CONFLICT);
      }
    }

    return this.prisma.user.update({
      where: {id},
      select: {
        email: true,
        username: true
      },
      data: updateUserDto as UpdateUserDto,
    });
  }

  async delete(id: number) {
    const userNotes = await this.prisma.note.findMany({
      where: {
        userId: id,
      },
    });

    if (userNotes.length > 0) {
      await this.prisma.note.deleteMany({ where: { userId: id } });
    }

    return this.prisma.user.delete({
      where: { id },
      select: {
        email: true,
        username: true
      }
    });
  }

}
