import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  readonly username: string

  @IsNotEmpty()
  @IsEmail()
  readonly email: string


  @IsString()
  @Length(5, 10)
  readonly password: string
}