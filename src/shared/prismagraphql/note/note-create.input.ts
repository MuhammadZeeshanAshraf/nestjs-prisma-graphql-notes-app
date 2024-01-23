import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutNotesInput } from '../user/user-create-nested-one-without-notes.input';

@InputType()
export class NoteCreateInput {

    @Field(() => String, {nullable:false})
    content!: string;

    @Field(() => UserCreateNestedOneWithoutNotesInput, {nullable:false})
    user!: UserCreateNestedOneWithoutNotesInput;
}
