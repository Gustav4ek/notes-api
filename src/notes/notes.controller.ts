import {Controller, Post, Get, Patch, Delete, Body, Query, Param, UseGuards, Req} from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";


@ApiTags('notes')
@ApiBearerAuth()
@Controller('notes')
export class NotesController {

  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({ summary: 'Create a new note' })
  @ApiResponse({ status: 201, description: 'The note has been successfully created.', type: CreateNoteDto })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: any,@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(+req.user.id, createNoteDto)
  }

  @ApiOperation({ summary: 'Retrieve all notes' })
  @ApiQuery({ name: 'filter', required: false, description: 'Filter notes based on criterion' })
  @ApiResponse({ status: 200, description: 'List of notes', type: [CreateNoteDto] })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req: any ,@Query() query: FindNotesQuery) {
    return this.notesService.findAll(+req.user.id, query)
  }

  @ApiOperation({ summary: 'Retrieve a single note by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the note', required: true })
  @ApiResponse({ status: 200, description: 'The found note', type: CreateNoteDto })
  @ApiResponse({ status: 404, description: 'Note not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Req() req: any,@Param('id') noteId: string) {
    return this.notesService.findOne(+req.user.id, +noteId)
  }

  @ApiOperation({ summary: 'Update a note by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the note to update', required: true })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200, description: 'The updated note', type: UpdateNoteDto })
  @ApiResponse({ status: 404, description: 'Note not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Req() req: any,@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+req.user.id,+id, updateNoteDto)
  }

  @ApiOperation({ summary: 'Delete a note by ID' })
  @ApiParam({ name: 'id', description: 'Unique identifier of the note to delete', required: true })
  @ApiResponse({ status: 200, description: 'The note has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Note not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Req() req: any,@Param('id') id: string) {
    return this.notesService.delete(+req.user.id,+id)
  }


}
