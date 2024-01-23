import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class NoteScalarWhereWithAggregatesInput {

    @Field(() => [NoteScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<NoteScalarWhereWithAggregatesInput>;

    @Field(() => [NoteScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<NoteScalarWhereWithAggregatesInput>;

    @Field(() => [NoteScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<NoteScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    content?: StringWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;
}
