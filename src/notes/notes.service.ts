import { Injectable } from '@nestjs/common';
import { DatabaseService} from "../database/database.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Injectable()
export class NotesService {

  constructor(private readonly prisma: DatabaseService) {}

  async create(createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        description: createNoteDto.description,
        tags: createNoteDto.tags,
        location: createNoteDto.location,
        user: {
          connect: {
            id: createNoteDto.userId,
          },
        },
      },
    })
  }

  async findAll(query: any) {
    const {page = 1, limit = 10, search = '', tags = '', sortBy = 'createdAt', order = 'desc'} = query
    const skip = (page-1)*limit

    return this.prisma.note.findMany({
      where: {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { tags: { hasSome: tags.split(',') } },
        ],
      },
      orderBy: {
        [sortBy]: order,
      },
      skip: Number(skip),
      take: Number(limit),
    })
  }

  async findOne(id: number) {
      return this.prisma.note.findUnique({where: {id}})
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
      return this.prisma.note.update({where: {id}, data: updateNoteDto})
  }

  async delete(id: number) {
      return this.prisma.note.delete({where: {id}})
  }

}
