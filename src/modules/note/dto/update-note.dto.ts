import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { CreateNoteDto } from './create-note.dto';


export class UpdateNoteDto extends PartialType(CreateNoteDto) {
    @ApiProperty({
        description: 'It must be the content of the note',
        example: 'This is the content of the note',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    content: string;
}
