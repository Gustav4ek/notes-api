import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { DatabaseService} from "../database/database.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesService {

  constructor(private readonly prisma: DatabaseService) {}

  async create(userId: number, createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        description: createNoteDto.description,
        tags: createNoteDto.tags,
        location: createNoteDto.location,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        title: true,
        description: true,
        tags: true,
        location: true
      }
    })
  }

  async findAll(userId: number, query: FindNotesQuery) {
    const { page = 1, limit = 10, search = '', tags = '', sortBy = 'createdAt', order = 'asc' } = query;
    const skip = (page - 1) * limit;

    let tagsArray: string[] = [];
    if (tags) {
      tagsArray = tags.split(',');
    }

    return this.prisma.note.findMany({
      where: {
        userId: userId,
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
        AND: tagsArray.length > 0 ? { tags: { hasSome: tagsArray } } : {},
      },
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
        createdAt: true,
        location: true
      },
      orderBy: {
        [sortBy]: order,
      },
      skip: Number(skip),
      take: Number(limit),
    });

  }

  async findOne(userId: number, noteId: number) {

      const note = await this.prisma.note.findUnique({
        where: {
          userId: userId,
          id: noteId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          tags: true,
          createdAt: true,
          location: true
        }
      })

    if (!note) throw new HttpException('Note is not found', HttpStatus.NOT_FOUND)

    return note
  }

  async update(userId: number,noteId: number, updateNoteDto: UpdateNoteDto) {


      const note = await this.prisma.note.findFirst({
        where: {
          userId: userId,
          id: noteId,
        },

      });

      if (!note) {
        throw new HttpException('Note is not found', HttpStatus.NOT_FOUND);
      }

      return this.prisma.note.update({
        where: {
          id: noteId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          tags: true,
          createdAt: true,
          location: true
        },
        data: updateNoteDto,
      });
    }

  async delete(userId: number,noteId: number) {
    const note = await this.prisma.note.findFirst({
      where: {
        id: noteId,
        userId: userId,
      },
    });

    if (!note) {
      throw new HttpException('Note is not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.note.delete({
      where: {
        id: noteId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        tags: true,
        createdAt: true,
        location: true
      }
    });
  }

}
