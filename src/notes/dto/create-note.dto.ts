import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateNoteDto {

  @IsString()
  @IsNotEmpty()
  readonly title: string


  @IsOptional()
  @IsString()
  readonly description?: string


  @IsArray()
  @IsString({each: true})
  @IsOptional()
  readonly tags?: string[]


  @IsOptional()
  @IsString()
  readonly location?: string

  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;

}