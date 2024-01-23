import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class NoteScalarWhereInput {

    @Field(() => [NoteScalarWhereInput], {nullable:true})
    AND?: Array<NoteScalarWhereInput>;

    @Field(() => [NoteScalarWhereInput], {nullable:true})
    OR?: Array<NoteScalarWhereInput>;

    @Field(() => [NoteScalarWhereInput], {nullable:true})
    NOT?: Array<NoteScalarWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    content?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;
}
