import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class CreateNoteDto {
    @ApiProperty({
        description: 'It must be the content of the note',
        example: 'This is the content of the note',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    content: string;

    /**
    @ApiProperty({
        description: 'It must be the id of the user',
    })
    @Transform(({ value }) => Number(value))
    @IsNumber({ maxDecimalPlaces: 0 })
    @IsInt()
    @IsPositive()
    @Min(1)
    */
    userId: number;
}
