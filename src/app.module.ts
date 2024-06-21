import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from "./users/users.module";

@Module({
  imports: [ConfigModule.forRoot(), NotesModule, DatabaseModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
