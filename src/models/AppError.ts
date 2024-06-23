export type HttpCode = 200 | 300 | 400 | 403 | 404 | 408 | 500;

export const commonErrorsDict: {
  validationError: string;
  resourceNotFound: string;
  badRequest: HttpCode;
  notFound: HttpCode;
} = {
  validationError: "Validation Error",
  resourceNotFound: "Resource not Found",
  badRequest: 400,
  notFound: 404,
};

export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean;

  constructor(name: string, httpCode: HttpCode, description: string) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = true;

    Error.captureStackTrace(this);
  }
}
