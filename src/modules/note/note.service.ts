import { Injectable } from '@nestjs/common';
import { Note, Prisma } from '@prisma/client';
import { CrudService } from 'src/common/abstract/crud.service';
import { RESPONSE_STATUS } from 'src/common/constants';
import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { HandledErrorModel } from 'src/common/types/error';
import { PagedList } from 'src/common/types/paged-list';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteMapType } from './mapping/note.mapping';

@Injectable()
export class NoteService extends CrudService<Prisma.NoteDelegate, NoteMapType> {
    constructor(private prisma: PrismaService) {
        super(prisma.note);
    }
    async add(createNoteDto: CreateNoteDto): Promise<Note> {
        const { content, userId } = createNoteDto;
        const dto: Prisma.NoteCreateArgs = {
            data: {
                content: content,
                userId: userId,
            },
        };
        const note = (await this.create(dto)) as Note;
        return note;
    }

    async findAll(paginationDto: PaginationDto): Promise<PagedList<Note>> {
        const { page, take } = paginationDto;
        const skip = (page - 1) * take;
        const condition: Prisma.NoteFindManyArgs = {
            where: {},
            take: take,
            skip: skip,
        };
        const countCondition: Prisma.NoteCountArgs = {};
        const [notes, total] = await Promise.all([this.findMany<Note>(condition), this.count(countCondition)]);
        return new PagedList<Note>(notes, total, take, page);
    }

    async findOne(id: number): Promise<Note> {
        const condition: Prisma.NoteFindUniqueArgs = {
            where: { id: id },
        };
        const note = (await this.findUnique(condition)) as Note;
        return note;
    }

    async updateNote(id: number, updateNoteDto: UpdateNoteDto) {
        const findCondition: Prisma.NoteFindUniqueArgs = {
            where: { id: id },
        };
        const note = (await this.findUnique(findCondition)) as Note;
        if (!note) {
            const message = 'Note not found';
            return new HandledErrorModel(RESPONSE_STATUS.FAIL, message, new Error(message));
        }
        const updateDto: Prisma.NoteUpdateArgs = {
            where: { id: id },
            data: {
                ...updateNoteDto,
            },
        };
        await this.update(updateDto);
        return this.findOne(id);
    }

    async remove(id: number) {
        const findCondition: Prisma.NoteFindUniqueArgs = {
            where: { id: id },
        };
        const note = (await this.findUnique(findCondition)) as Note;
        if (!note) {
            const message = 'Note not found';
            return new HandledErrorModel(RESPONSE_STATUS.FAIL, message, new Error(message));
        }
        await this.delete(findCondition);
        return `Note with id ${id} deleted`;
    }
}
