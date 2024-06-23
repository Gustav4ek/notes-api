import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'The user has been successfully registered.', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post('registration')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto)
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

}
