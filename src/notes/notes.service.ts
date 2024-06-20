import { Injectable } from '@nestjs/common';
import { DatabaseService} from "../database/database.service";

@Injectable()
export class NotesService {

  constructor(private readonly prisma: DatabaseService) {

  }

}
