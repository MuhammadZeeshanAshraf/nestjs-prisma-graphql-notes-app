import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ConflictException,
    ExceptionFilter,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { RESPONSE_MESSAGE } from 'src/common/constants';
import { ForbiddenErrorModel, InternalServerErrorModel, UnAuthorizedErrorModel, ValidationFailedErrorModel } from 'src/common/types/error';
import { ResponseFactory } from '../ResponseFactory';

@Catch()
export class InternalServerExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res: Response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let errorMessage = RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR;
        let response = ResponseFactory.createResponse(new InternalServerErrorModel(errorMessage));

        console.log(request.url);
        console.log(exception.constructor);
        console.log(exception);

        switch (exception.constructor) {
            case BadRequestException:
                errorMessage =
                    exception.response.message.length === 1
                        ? exception.response.message[0]
                        : exception.response.message
                              .join(', ')
                              .toLowerCase()
                              .split(' ')
                              .map(function (word) {
                                  return word.charAt(0).toUpperCase() + word.slice(1);
                              })
                              .join(' ');
                response = ResponseFactory.createResponse(new ValidationFailedErrorModel(errorMessage));
                break;
            case UnauthorizedException:
                errorMessage = RESPONSE_MESSAGE.UNAUTHORIZED;
                response = ResponseFactory.createResponse(
                    new UnAuthorizedErrorModel(errorMessage, new UnauthorizedException(errorMessage))
                );
                break;
            case ForbiddenException:
                errorMessage = RESPONSE_MESSAGE.FORBIDDEN;
                response = ResponseFactory.createResponse(
                    new ForbiddenErrorModel(errorMessage, new ForbiddenException(errorMessage))
                );
                break;
            case PrismaClientKnownRequestError:
                if (exception.code === 'P2002') {
                    errorMessage = RESPONSE_MESSAGE.EMAIL_ERROR;
                    response = ResponseFactory.createResponse(new ConflictException(errorMessage));
                    break;
                }
                if (exception.code === 'P2003') {
                    errorMessage = RESPONSE_MESSAGE.USER_ERROR;
                    response = ResponseFactory.createResponse(new NotFoundException(errorMessage));
                    break;
                }
            case InternalServerErrorException:
            default:
                errorMessage = RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR;
                response = ResponseFactory.createResponse(new InternalServerErrorModel(errorMessage));
        }

        return res.status(response.code).send(response);
    }
}
