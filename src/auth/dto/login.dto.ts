import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {

    @ApiProperty({
        description: 'Email address of the user',
        example: 'gustav4ek@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @ApiProperty({
        description: 'Password for the user account, must be between 5 and 10 characters',
        example: 'pass123',
    })
    @IsString()
    @Length(5, 10)
    readonly password: string
}