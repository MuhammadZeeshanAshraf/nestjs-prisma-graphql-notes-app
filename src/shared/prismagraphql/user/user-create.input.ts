import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NoteCreateNestedManyWithoutUserInput } from '../note/note-create-nested-many-without-user.input';

@InputType()
export class UserCreateInput {

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => NoteCreateNestedManyWithoutUserInput, {nullable:true})
    notes?: NoteCreateNestedManyWithoutUserInput;
}
