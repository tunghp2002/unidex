export interface IResponse<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface IResult<T> {
  result : T[]
}

export interface ITransaction {
  transactionHash: string,
  block: string,
  method: string,
  age: string,
  from: string,
  to: string,
  value: string,
  status: string,
  fee: string
}