import {Body, Controller, Get, Param, Patch, Delete, UseGuards, Req} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'Get information about you' })
  @ApiResponse({ status: 200, description: 'Return the user.', type: CreateUserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  findOne(@Req() req: any) {
    return this.userService.findOne(+req.user.id)
  }


  @ApiOperation({ summary: 'Update personal information' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: UpdateUserDto })
  @ApiResponse({ status: 409, description: 'Email/username already exists' })
  @ApiResponse({ status: 400, description: 'Cannot update field' })
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Req() req: any , @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+req.user.id, updateUserDto)
  }

 @ApiOperation({ summary: 'Delete your account' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  delete(@Req() req: any) {
    return this.userService.delete(+req.user.id)
  }

}
