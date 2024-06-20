import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateNoteDto {

  @IsString()
  @IsNotEmpty()
  title: string


  @IsOptional()
  @IsString()
  description?: string


  @IsArray()
  @IsString({each: true})
  @IsOptional()
  tags?: string[]


  @IsOptional()
  @IsString()
  location?: string


  @IsNotEmpty()
  readonly userId: number;
}