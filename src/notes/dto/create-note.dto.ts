import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateNoteDto {

  @ApiProperty({
    description: 'Title of the note',
    example: 'My First Note'
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string


  @ApiProperty({
    description: 'Description of the note',
    example: 'This is a description of my first note',
    required: false
  })
  @IsOptional()
  @IsString()
  readonly description?: string


  @ApiProperty({
    description: 'Tags associated with the note',
    example: ['personal', 'work'],
    required: false,
    isArray: true
  })
  @IsArray()
  @IsString({each: true})
  @IsOptional()
  readonly tags?: string[]


  @ApiProperty({
    description: 'Location associated with the note',
    example: 'Minsk',
    required: false
  })
  @IsOptional()
  @IsString()
  readonly location?: string


  @ApiProperty({
    description: 'ID of the user who created the note',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

}