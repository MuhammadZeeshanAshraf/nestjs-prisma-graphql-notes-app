import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserUpdateOneRequiredWithoutNotesNestedInput } from '../user/user-update-one-required-without-notes-nested.input';

@InputType()
export class NoteUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    content?: StringFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutNotesNestedInput, {nullable:true})
    user?: UserUpdateOneRequiredWithoutNotesNestedInput;
}
