import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseExceptionsFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (
      exception.message.includes(
        'duplicate key value violates unique constraint',
      )
    ) {
      response.status(409).json({
        statusCode: 409,
        message: 'Duplicate key value violates unique constraint',
      });
    } else {
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
