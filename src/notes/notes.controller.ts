import { Controller, Post, Get, Patch, Delete, Body, Query, Param } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDTO } from "./dto/update-note.dto";

@Controller('notes')
export class NotesController {

  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto)
  }

  @Get()
  findAll(@Query() query: any) {
    return this.notesService.findAll(query)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDTO) {
    return this.notesService.update(+id, updateNoteDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(+id)
  }


}
