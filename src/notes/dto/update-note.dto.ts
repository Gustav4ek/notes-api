import { CreateNoteDto } from "./create-note.dto";
import { PartialType } from '@nestjs/mapped-types';


export class UpdateNoteDTO extends PartialType(CreateNoteDto) {}