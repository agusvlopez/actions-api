import { Request, Response, NextFunction } from 'express'

const mongooseErrorMap: Record<string, { status: number, message: string }> = {
  ValidationError: { status: 400, message: 'Validation error' },
  CastError: { status: 400, message: 'Invalid ID format' },
}

const mysqlErrorMap: Record<string, { status: number, message: string }> = {
  ER_WRONG_VALUE_FOR_TYPE: { status: 400, message: 'Incorrect value' },
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err)

  let statusCode = 500
  let message = 'Unknown error occurred'

  // Mongoose/MongoDB errors
  if (err.name && mongooseErrorMap[err.name]) {
    const mapped = mongooseErrorMap[err.name]
    statusCode = mapped.status
    message = mapped.message

  } else if (err.code && mysqlErrorMap[err.code]) {
    const mapped = mysqlErrorMap[err.code]
    statusCode = mapped.status
    message = mapped.message
  } else if (err.message) {
    statusCode = err.status || err.statusCode || 500
    message = err.message
  }

  res.status(statusCode).json({ error: message })
}

