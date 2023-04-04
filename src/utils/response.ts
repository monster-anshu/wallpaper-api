export class HttpResponse {
  public status: number;
  public message: string;
  public isSuccess: boolean;
  public data: unknown;

  constructor(data: unknown, message = 'Success', status = 200, isSuccess = true) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.isSuccess = isSuccess;
  }
}

export class HttpException extends HttpResponse {
  constructor(status: number, message: string, data: unknown = null, isSuccess = false) {
    super(data, message, status, isSuccess);
  }
}
