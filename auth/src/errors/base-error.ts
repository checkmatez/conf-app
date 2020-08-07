interface SimpleError {
  message: string
  field?: string
}

export abstract class BaseError extends Error {
  abstract statusCode: number
  abstract serializeErrors(): { errors: SimpleError[] }
}
