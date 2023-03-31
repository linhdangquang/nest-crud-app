export enum ResStatus {
  SUCCESS = 'true',
  ERROR = 'false',
}

export interface BaseResponse {
  status: ResStatus;
  message: string;
  data?: any;
}
