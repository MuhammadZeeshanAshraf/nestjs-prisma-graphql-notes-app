import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class IsMineGuard implements CanActivate {
    constructor(private readonly prismaService: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const route = request.route.path.split('/')[1];
        const paramId = isNaN(parseInt(request.params.id)) ? 0 : parseInt(request.params.id);

        switch (route) {
            case 'note':
                const note = await this.prismaService.note.findFirst({
                    where: {
                        id: paramId,
                        userId: request.user.sub,
                    },
                });
                console.log(note);
                return paramId === note?.id;
            default:
                return paramId === request.user.sub;
        }
    }
}
