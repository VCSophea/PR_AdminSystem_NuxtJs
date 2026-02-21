// types/api.types.ts

export interface ApiResponse<T> {
  result: boolean;
  statusCode: number;
  body: T;
}
