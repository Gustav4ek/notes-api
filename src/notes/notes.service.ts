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

  async findAll(query: FindNotesQuery) {
    const {page = 1, limit = 10, search = '', tags = '', sortBy = 'id', order = 'asc'} = query
    const skip = (page-1)*limit

    let tagsArray: string[] = [];
    if (tags) {
      tagsArray = tags.split(',');
    }

    return this.prisma.note.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
        tags: {
          hasSome: tagsArray
        }
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
