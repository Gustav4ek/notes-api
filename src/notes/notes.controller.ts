import { Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDTO } from "./dto/update-note.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('notes')
export class NotesController {

  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: any) {
    return this.notesService.findAll(query)
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDTO) {
    return this.notesService.update(+id, updateNoteDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(+id)
  }


}
