export class ResponseBase<T> {
    statusCode: ResponseStatusCode = ResponseStatusCode.Ok;
    message: string = 'Succeed';
    data: T;
}

export enum ResponseStatusCode {
    Ok = 0,
    Error = 1,
}
