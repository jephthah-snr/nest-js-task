import { HttpException } from "@nestjs/common";

export default class AppError extends HttpException {
    public isOperational: boolean;
    public cause: Error | undefined;
  
    constructor(
    statusCode: number,
      message: string,
      cause?: any,
      isOperational = true,
    ) {
      super(message, statusCode);
      
      this.isOperational = isOperational;
      this.cause = cause as Error;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }