import { registerEnumType } from '@nestjs/graphql';

export enum NoteScalarFieldEnum {
    id = "id",
    content = "content",
    userId = "userId"
}


registerEnumType(NoteScalarFieldEnum, { name: 'NoteScalarFieldEnum', description: undefined })
