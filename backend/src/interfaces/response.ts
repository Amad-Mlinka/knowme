export enum ResponseStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  PARTIAL_SUCCESS = 'PARTIAL_SUCCESS',
}

export interface BaseResponse<T = unknown> {
  success: ResponseStatus;
  message: string;
  data?: T;
  code?: number;
} 