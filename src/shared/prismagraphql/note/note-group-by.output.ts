import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { NoteCountAggregate } from './note-count-aggregate.output';
import { NoteAvgAggregate } from './note-avg-aggregate.output';
import { NoteSumAggregate } from './note-sum-aggregate.output';
import { NoteMinAggregate } from './note-min-aggregate.output';
import { NoteMaxAggregate } from './note-max-aggregate.output';

@ObjectType()
export class NoteGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => NoteCountAggregate, {nullable:true})
    _count?: NoteCountAggregate;

    @Field(() => NoteAvgAggregate, {nullable:true})
    _avg?: NoteAvgAggregate;

    @Field(() => NoteSumAggregate, {nullable:true})
    _sum?: NoteSumAggregate;

    @Field(() => NoteMinAggregate, {nullable:true})
    _min?: NoteMinAggregate;

    @Field(() => NoteMaxAggregate, {nullable:true})
    _max?: NoteMaxAggregate;
}
