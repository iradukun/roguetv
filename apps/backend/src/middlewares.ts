import { NextFunction, Request, Response } from 'express';

import ErrorResponse from './interfaces/ErrorResponse';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

export function logResponseData(req: Request, res: any, next: NextFunction) {
  // Store reference to original end method
  const originalEnd = res.end;

  // Create a variable to store response data
  let responseData = '';

  // Override the end method
  res.end = function(data: any) {
    // Concatenate response data
    responseData += data || '';

    // Log response data
    try {
      console.log(JSON.parse(responseData));
    } catch (error) {
      console.log(`Response Data: ${responseData}`);
    }
    // Call the original end method
    originalEnd.apply(res, arguments);
  };

  // Move to the next middleware
  next();
}
