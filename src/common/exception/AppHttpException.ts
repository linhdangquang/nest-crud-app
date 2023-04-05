import { HttpException, HttpStatus } from '@nestjs/common';

export default class AppHttpException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }

  static badRequest(message: string) {
    return new AppHttpException(message, HttpStatus.BAD_REQUEST);
  }

  static unauthorized(message: string) {
    return new AppHttpException(message, HttpStatus.UNAUTHORIZED);
  }

  static forbidden(message: string) {
    return new AppHttpException(message, HttpStatus.FORBIDDEN);
  }

  static notFound(message: string) {
    return new AppHttpException(message, HttpStatus.NOT_FOUND);
  }

  static conflict(message: string) {
    return new AppHttpException(message, HttpStatus.CONFLICT);
  }
}
