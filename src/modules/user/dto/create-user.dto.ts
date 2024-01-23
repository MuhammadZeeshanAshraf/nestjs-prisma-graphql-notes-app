import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
        description: 'It must be the email of the user',
        example: 'zeeshan.ashraf@gmail.com',
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'It must be the password of the user',
        example: '******',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({
        description: 'It must be the name of the user',
        example: 'Zeeshan Ashraf',
    })
    @IsNotEmpty()
    @IsString()
    name: string;
}
