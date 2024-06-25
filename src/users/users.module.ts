import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseService } from "../database/database.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UsersService, DatabaseService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
