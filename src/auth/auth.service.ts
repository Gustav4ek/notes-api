import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "@prisma/client";
import {LoginDto} from "./dto/login.dto";
@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
    ) {}


  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto)
    return this.generateToken(user)
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await bcrypt.hash(createUserDto.password, 7)
      const user = await this.userService.create({...createUserDto, password: hashPassword})
      return this.generateToken(user)
    } catch (e) {
      throw new HttpException('email/username already exists', HttpStatus.BAD_REQUEST)
    }
  }

  private async generateToken(user: User) {
    const payload = {id: user.id}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email)
    if (!user) {
      throw new UnauthorizedException({ message: 'User not found' });
    }
    const passwordEquals = await bcrypt.compare(loginDto.password, user.password)
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({message: 'Incorrect email/password'})
  }
}
