import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NoteWhereUniqueInput } from './note-where-unique.input';
import { Type } from 'class-transformer';
import { NoteUpdateWithoutUserInput } from './note-update-without-user.input';

@InputType()
export class NoteUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => NoteWhereUniqueInput, {nullable:false})
    @Type(() => NoteWhereUniqueInput)
    where!: Prisma.AtLeast<NoteWhereUniqueInput, 'id'>;

    @Field(() => NoteUpdateWithoutUserInput, {nullable:false})
    @Type(() => NoteUpdateWithoutUserInput)
    data!: NoteUpdateWithoutUserInput;
}
