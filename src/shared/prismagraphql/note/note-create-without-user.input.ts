import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class NoteCreateWithoutUserInput {

    @Field(() => String, {nullable:false})
    content!: string;
}
