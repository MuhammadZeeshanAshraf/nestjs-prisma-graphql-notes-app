import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JWT } from 'src/common/constants';
import { Public } from 'src/common/decorators/public.decorator';
import { IdDto } from 'src/common/dtos/request/id.dto';
import { PaginationDto } from 'src/common/dtos/request/pagination.dto';
import { IsMineGuard } from 'src/common/guards/is-mine.guard';
import { ExpressRequestWithUser } from '../user/interface/express-request-with-user.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteService } from './note.service';

@ApiTags('Note')
@ApiBearerAuth(JWT)
@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Post()
    create(@Body() createNoteDto: CreateNoteDto, @Request() req: ExpressRequestWithUser) {
      createNoteDto.userId = req.user.sub;
        return this.noteService.add(createNoteDto);
    }

    @Public()
    @Get()
    findAll(@Query() paginationDto: PaginationDto) {
        return this.noteService.findAll(paginationDto);
    }

    @Public()
    @Get(':id')
    findOne(@Param() idDto: IdDto) {
        const { id } = idDto;
        return this.noteService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(IsMineGuard)
    update(@Param() idDto: IdDto, @Body() updateNoteDto: UpdateNoteDto) {
        const { id } = idDto;
        return this.noteService.updateNote(id, updateNoteDto);
    }

    @Delete(':id')
    @UseGuards(IsMineGuard)
    remove(@Param() idDto: IdDto) {
        const { id } = idDto;
        return this.noteService.remove(id);
    }
}
