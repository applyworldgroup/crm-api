import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof PrismaClientKnownRequestError) {
      const errorResponse = {
        statusCode: status,
        message: exception.message,
        error: 'Prisma Error',
      };
      return response.status(status).json(errorResponse);
    }

    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Internal server error',
      error: 'Internal Server Error',
    };
    return response.status(status).json(errorResponse);
  }
}
