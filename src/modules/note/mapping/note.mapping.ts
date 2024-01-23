import { Prisma } from '@prisma/client';
import { CrudMapType } from 'src/common/interfaces/crud-map-type.interface';

export class NoteMapType implements CrudMapType {
  aggregate: Prisma.NoteAggregateArgs;
  count: Prisma.NoteCountArgs;
  create: Prisma.NoteCreateArgs;
  delete: Prisma.NoteDeleteArgs;
  deleteMany: Prisma.NoteDeleteManyArgs;
  findFirst: Prisma.NoteFindFirstArgs;
  findMany: Prisma.NoteFindManyArgs;
  findUnique: Prisma.NoteFindUniqueArgs;
  update: Prisma.NoteUpdateArgs;
  updateMany: Prisma.NoteUpdateManyArgs;
  upsert: Prisma.NoteUpsertArgs;
}
